import { Server } from 'socket.io';
import { searchYouTube, getVideoDetails } from './controllers/youtubeController';
import { Video } from './models/video';

let queue: Video[] = [];
let currentTimeout: NodeJS.Timeout | null = null;
let startTime: number | null = null;

const playNextSong = async (io: Server) => {
  if (queue.length > 0) {
    const currentVideo = queue[0];
    const videoDetails = await getVideoDetails(currentVideo.id);
    const videoDuration = videoDetails ? videoDetails.duration : 300000; // Default to 5 minutes if duration is not available

    // Log the name of the new song and when it will end
    console.log(`Now playing: ${currentVideo.title}`);
    console.log(`Ends in: ${videoDuration / 1000} seconds`);

    // Notify clients to play the next song
    io.emit('playNextSong', { video: currentVideo, elapsedTime: 0 });

    // Clear the existing timeout if it exists
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // Set the start time
    startTime = Date.now();

    // Set a timeout to remove the song after its duration
    currentTimeout = setTimeout(() => {
      queue.shift();
      io.emit('queueUpdated', queue);
      playNextSong(io); // Play the next song
    }, videoDuration);
  } else {
    console.log('Queue is empty, no song to play');
  }
};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Send the current queue to the newly connected client
    socket.emit('queueUpdated', queue);

    // Send the current song and elapsed time to the newly connected client
    if (queue.length > 0 && startTime !== null) {
      const currentVideo = queue[0];
      const elapsedTime = Date.now() - startTime;
      socket.emit('playNextSong', { video: currentVideo, elapsedTime });
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

    socket.on('removeSong', (index: number) => {
      if (index >= 0 && index < queue.length) {
        queue.splice(index, 1);
        io.emit('queueUpdated', queue);

        // If the removed song was the currently playing song, play the next song
        if (index === 0 && queue.length > 0) {
          playNextSong(io);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};