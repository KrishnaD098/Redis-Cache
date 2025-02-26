import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create an index on `timestamp` field for TTL expiration (180 second)
messageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 180 }); 

export default mongoose.model("Message", messageSchema);
