// This file contains the logic for handling WebSocket connections using Socket.io.
// It sets up event listeners for new connections, disconnections, and YouTube search requests.
// It maintains a shared queue of videos and emits updates to all connected clients.

import { Server } from 'socket.io';
import { searchYouTube, getVideoDetails } from './controllers/youtubeController';
import { Video } from './models/video';

let queue: Video[] = [];
let currentTimeout: NodeJS.Timeout | null = null;

const playNextSong = async (io: Server) => {
  if (queue.length > 0) {
    const currentVideo = queue[0];
    const videoDetails = await getVideoDetails(currentVideo.id);
    const videoDuration = videoDetails ? videoDetails.duration : 300000; // Default to 5 minutes if duration is not available

    // Notify clients to play the next song
    io.emit('playNextSong', currentVideo);

    // Set a timeout to remove the song after its duration
    currentTimeout = setTimeout(() => {
      queue.shift();
      io.emit('queueUpdated', queue);
      playNextSong(io); // Play the next song
    }, videoDuration);
  }
};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Send the current queue to the newly connected client
    socket.emit('queueUpdated', queue);

    // Send the current song to the newly connected client
    if (queue.length > 0) {
      socket.emit('playNextSong', queue[0]);
    }

    socket.on('searchYouTube', async (query: string) => {
      const newVideo = await searchYouTube(query);
      if (newVideo) {
        queue.push(newVideo);
        io.emit('queueUpdated', queue);

        // If this is the first song in the queue, start playing it
        if (queue.length === 1) {
          playNextSong(io);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};