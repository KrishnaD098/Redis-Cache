# Redis-Cache

****


**Redis Chat Caching System**

This project implements a chat message caching system using Redis and MongoDB. It optimizes message retrieval by temporarily storing recent messages in Redis before persisting them in MongoDB. The cache improves real-time messaging performance, reducing the need for frequent database queries.

### Features

- Uses Redis for caching recent chat messages with a TTL.

- Stores messages in MongoDB for permanent storage.

- Implements WebSockets (Socket.IO) for real-time communication.

- Efficient cache management with functions to set, get, and clear cache.

- Express.js server setup for handling API requests and WebSocket events.

### Technologies Used

- Node.js - Backend runtime environment

- Express.js - Server framework for handling API requests

- Socket.IO - Enables real-time bidirectional communication

- Redis - Used as a caching layer to store recent messages temporarily

- MongoDB - Stores chat messages for long-term persistence

- memoose-js - Provides an efficient in-memory caching alternative to Redis

## Role of memoose-js

The memoose-js library plays a key role in improving performance by caching frequently accessed data in memory. Instead of querying MongoDB for recent messages on every request, memoose-js allows storing and retrieving data quickly, reducing database load and improving response times.

Features of memoose-js in this project:

- Stores recent chat messages in memory with a TTL (Time-To-Live) mechanism.

- Reduces redundant database queries by retrieving cached messages.

- Improves scalability and responsiveness by handling in-memory operations efficiently.

For detailed instructions on memoose-js library, refer to this [package page for memoose-js](https://www.npmjs.com/package/memoose-js)

### How to Run the Project

1. **Clone the repository:**

    ```
    git clone https://github.com/KrishnaD098/Redis-Cache.git
    cd Redis-Cache
    ```

2. **Install dependencies:**

    ```
    npm install
    npm i memoose-js
    ```

3. **Start the Redis server:**   

    ```
    redis-server
    ```

4. **Run the backend server:**

    ```
    npm start
    ```

5. **Open the Redis CLI to monitor cache:**

    ```
    redis-cli
    ```

### Get Involved
I'm looking for contributors to help develop features, write documentation, design user interfaces, and more. If you're passionate about making content creation accessible and straightforward for developers, I'd love to hear from you.

***Contributions***

Pull requests are welcome! If you find any issues or have improvements, feel free to contribute.


---