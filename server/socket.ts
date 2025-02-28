// This file contains the logic for handling WebSocket connections using Socket.io.
// It sets up event listeners for new connections, disconnections, and YouTube search requests.
// It maintains a shared queue of videos and emits updates to all connected clients.

import { Server } from 'socket.io';
import { searchYouTube } from './controllers/youtubeController';
import { Video } from './models/video';

let queue: Video[] = [];

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Send the current queue to the newly connected client
    socket.emit('queueUpdated', queue);

    socket.on('searchYouTube', async (query: string) => {
      const newVideo = await searchYouTube(query);
      if (newVideo) {
        queue.push(newVideo);
        io.emit('queueUpdated', queue);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};