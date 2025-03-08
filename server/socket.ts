import { Server } from 'socket.io';
import { searchYouTube, getVideoDetails } from './controllers/youtubeController';
import { Video } from './models/video';

interface Room {
  queue: Video[];
  currentTimeout: NodeJS.Timeout | null;
  startTime: number | null;
  users: Set<string>;
}

const rooms: { [roomId: string]: Room } = {
  test: { queue: [], currentTimeout: null, startTime: null, users: new Set() },
  music: { queue: [], currentTimeout: null, startTime: null, users: new Set() },
};

const playNextSong = async (io: Server, roomId: string) => {
  const room = rooms[roomId];
  if (!room) {
    console.error(`Room ${roomId} does not exist`);
    return;
  }

  if (room.queue.length > 0) {
    const currentVideo = room.queue[0];
    const videoDetails = await getVideoDetails(currentVideo.id);
    const videoDuration = videoDetails ? videoDetails.duration : 300000; // Default to 5 minutes if duration is not available

    // Log the name of the new song and when it will end
    console.log(`Now playing in room ${roomId}: ${currentVideo.title}`);
    console.log(`Ends in: ${videoDuration / 1000} seconds`);

    // Notify clients in the room to play the next song
    io.to(roomId).emit('playNextSong', { video: currentVideo, elapsedTime: 0 });

    // Clear the existing timeout if it exists
    if (room.currentTimeout) {
      clearTimeout(room.currentTimeout);
    }

    // Set the start time
    room.startTime = Date.now();

    // Set a timeout to remove the song after its duration
    room.currentTimeout = setTimeout(() => {
      room.queue.shift();
      io.to(roomId).emit('queueUpdated', room.queue);
      playNextSong(io, roomId); // Play the next song
    }, videoDuration);
  } else {
    console.log(`Queue is empty in room ${roomId}, no song to play`);
  }
};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('joinRoom', (roomId: string) => {
      socket.join(roomId);
      console.log(`Client ${socket.id} joined room ${roomId}`);

      if (!rooms[roomId]) {
        rooms[roomId] = { queue: [], currentTimeout: null, startTime: null, users: new Set() };
      }

      const room = rooms[roomId];
      room.users.add(socket.id);

      // Emit the updated user count to the room
      io.to(roomId).emit('userCountUpdated', roomId, room.users.size);

      // Send the current queue to the newly connected client
      socket.emit('queueUpdated', room.queue);

      // Send the current song and elapsed time to the newly connected client
      if (room.queue.length > 0 && room.startTime !== null) {
        const currentVideo = room.queue[0];
        const elapsedTime = Date.now() - room.startTime;
        socket.emit('playNextSong', { video: currentVideo, elapsedTime });
      }
    });

    socket.on('createRoom', (roomName: string) => {
      if (!rooms[roomName]) {
        rooms[roomName] = { queue: [], currentTimeout: null, startTime: null, users: new Set() };
        console.log(`Room ${roomName} created`);
      }

      // Send the updated room list to all clients
      io.emit('roomListUpdated', Object.keys(rooms).map(roomId => ({
        name: roomId,
        userCount: rooms[roomId].users.size
      })));
    });

    socket.on('getRoomList', () => {
      // Send the current room list to the client
      socket.emit('roomListUpdated', Object.keys(rooms).map(roomId => ({
        name: roomId,
        userCount: rooms[roomId].users.size
      })));
    });

    socket.on('searchYouTube', async (query: string, roomId: string) => {
      const newVideo = await searchYouTube(query);
      if (newVideo) {
        const room = rooms[roomId];
        room.queue.push(newVideo);
        io.to(roomId).emit('queueUpdated', room.queue);

        // If this is the first song in the queue, start playing it
        if (room.queue.length === 1) {
          playNextSong(io, roomId);
        }
      }
    });

    socket.on('removeSong', (index: number, roomId: string) => {
      const room = rooms[roomId];
      if (index >= 0 && index < room.queue.length) {
        room.queue.splice(index, 1);
        io.to(roomId).emit('queueUpdated', room.queue);

        // If the removed song was the currently playing song, play the next song
        if (index === 0 && room.queue.length > 0) {
          playNextSong(io, roomId);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);

      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id);
          io.to(roomId).emit('userCountUpdated', roomId, room.users.size);

          // Delete the room if it becomes empty and it's not a default room
          if (room.users.size === 0 && roomId !== 'test' && roomId !== 'music') {
            delete rooms[roomId];
            console.log(`Room ${roomId} deleted`);
          }
          break;
        }
      }
    });
  });
};