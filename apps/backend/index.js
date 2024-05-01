import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.CONNECTION;

app.use(
  cors({
    origin: 'http://localhost:3000', // Enable CORS for Express routes too
  })
);
app.use(express.json());

connectDb(CONNECTION);

app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_game', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('move', (data) => {
    socket.to(data.roomId).emit('opponent_move', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
