// This is the main server file. It sets up the Express application, HTTP server, and Socket.io server.
// It also configures middleware, routes, and initializes the socket logic.

import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import youtubeRoutes from './routes/youtubeRoutes';
import { setupSocket } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ADDRESS, 
    methods: ['GET', 'POST'],
  },
  transports: ["websocket", "polling"] // Ensure both transports are enabled
});

app.use(cors());
app.use(express.json());
app.use('/api/youtube', youtubeRoutes);

setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));