const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

const redisClient = redis.createClient();

redisClient.on('error', err => console.log('Redis error:', err));
redisClient.connect().then(() => console.log('Connected to Redis'));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('like', async (postId) => {
    await redisClient.incr(`likes:${postId}`);
    const likes = await redisClient.get(`likes:${postId}`);
    io.emit('likeUpdate', { postId, likes: Number(likes) });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(4000, () => {
  console.log('Analytics service running on port 4000');
});
