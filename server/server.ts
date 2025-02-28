import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
  },
});

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(cors());
app.use(express.json());

interface Video {
  id: string;
  title: string;
  url: string;
}

let queue: Video[] = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send the current queue to the newly connected client
  socket.emit('queueUpdated', queue);

  socket.on('searchYouTube', async (query: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 1,
          q: query,
          key: YOUTUBE_API_KEY,
        },
      });

      const video = response.data.items[0];
      const newVideo: Video = {
        id: video.id.videoId,
        title: video.snippet.title,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      };

      queue.push(newVideo);
      io.emit('queueUpdated', queue);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));