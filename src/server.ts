import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Message from "./models/Message";
import { createClient } from "redis"; // Updated Redis import

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Correct Redis client initialization
const redisClient = createClient({
  url: 'redis://localhost:6379' 
});

redisClient.connect();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/whatsapp");

app.get("/", (req, res) => {
  res.send("API Running...");
});

// WebSocket setup
io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", async (data) => {
    try {
      console.log("Message received:", data);

      const cacheKey = `chat:${data.chatId}:recentMessages`;

      // Get cached messages or fallback to empty array
      const result = await redisClient.get(cacheKey);
      let recentMessages = result ? JSON.parse(result) : []; // Handle possible null

      // Ensure recentMessages is an array
      if (!Array.isArray(recentMessages)) {
        recentMessages = [];
      }

      // Add new message to cache
      recentMessages.push(data);
      await redisClient.set(cacheKey, JSON.stringify(recentMessages), {
        EX: 180, // Set TTL for 180 seconds (3 minutes)
      });

      // Save message to MongoDB
      const newMessage = new Message(data);
      await newMessage.save();

      // Emit message to clients
      io.emit("message", data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while handling message:", error.message);
      } else {
        console.error("An unknown error occurred while handling message.");
      }
    }
  });

  socket.on("clear-cache", async (chatId) => {
    try {
      const cacheKey = `chat:${chatId}:recentMessages`;
      await redisClient.del(cacheKey); // Clear cache for chat
      console.log(`Cache cleared for chat: ${chatId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while clearing cache:", error.message);
      } else {
        console.error("An unknown error occurred while clearing cache.");
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
