import { Server, Socket } from 'socket.io';
import { searchYouTube, getVideoDetails } from './controllers/youtubeController';
import { Video } from './models/video';

interface Room {
  queue: Video[];
  currentTimeout: NodeJS.Timeout | null;
  startTime: number | null;
  websocketUserIDs: Set<string>;
  userMap: Map<string, string>; // Map to store socket ID to user ID
}

const rooms: { [roomId: string]: Room } = {
  Rave_in_the_grave: { queue: [], currentTimeout: null, startTime: null, websocketUserIDs: new Set(), userMap: new Map() },
  music: { queue: [], currentTimeout: null, startTime: null, websocketUserIDs: new Set(), userMap: new Map() },
};

const getUniqueUserCount = (room: Room): number => {
  const uniqueUserIds = new Set(room.userMap.values());
  return uniqueUserIds.size;
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
    const videoDuration = videoDetails ? videoDetails.duration : 300000;

    console.log(`Now playing in room ${roomId}: ${currentVideo.title}`);
    console.log(`Ends in: ${videoDuration / 1000} seconds`);

    io.to(roomId).emit('playNextSong', { video: currentVideo, elapsedTime: 0 });

    if (room.currentTimeout) {
      clearTimeout(room.currentTimeout);
    }

    room.startTime = Date.now();

    room.currentTimeout = setTimeout(() => {
      room.queue.shift();
      io.to(roomId).emit('queueUpdated', room.queue);
      playNextSong(io, roomId);
    }, videoDuration);
  } else {
    console.log(`Queue is empty in room ${roomId}, no song to play`);
  }
};

// --- Event Handlers ---

const handleJoinRoom = (io: Server, socket: Socket, roomId: string, userId: string) => {
  socket.join(roomId);
  console.log(`Client ${socket.id} joined room ${roomId}`);

  if (!rooms[roomId]) {
    rooms[roomId] = { queue: [], currentTimeout: null, startTime: null, websocketUserIDs: new Set(), userMap: new Map() };
  }

  const room = rooms[roomId];
  room.websocketUserIDs.add(socket.id);
  room.userMap.set(socket.id, userId);

  io.to(roomId).emit('userCountUpdated', roomId, getUniqueUserCount(room));
  socket.emit('queueUpdated', room.queue);

  if (room.queue.length > 0 && room.startTime !== null) {
    const currentVideo = room.queue[0];
    const elapsedTime = Date.now() - room.startTime;
    socket.emit('playNextSong', { video: currentVideo, elapsedTime });
  }
};

const handleCreateRoom = (io: Server, roomName: string) => {
  if (!rooms[roomName]) {
    rooms[roomName] = { queue: [], currentTimeout: null, startTime: null, websocketUserIDs: new Set(), userMap: new Map() };
    console.log(`Room ${roomName} created`);
  }

  io.emit('roomListUpdated', Object.keys(rooms).map(roomId => ({
    name: roomId,
    userCount: getUniqueUserCount(rooms[roomId]),
  })));
};

const handleGetRoomList = (socket: Socket) => {
  socket.emit('roomListUpdated', Object.keys(rooms).map(roomId => ({
    name: roomId,
    userCount: getUniqueUserCount(rooms[roomId]),
  })));
};

const handleCheckRoomExists = (socket: Socket, roomId: string) => {
  const roomExists = !!rooms[roomId];
  socket.emit('roomExists', roomExists);
};

const handleSearchYouTube = async (io: Server, query: string, roomId: string) => {
  const newVideo = await searchYouTube(query);
  if (newVideo) {
    const room = rooms[roomId];
    room.queue.push(newVideo);
    io.to(roomId).emit('queueUpdated', room.queue);

    if (room.queue.length === 1) {
      playNextSong(io, roomId);
    }
  }
};

const handleRemoveSong = (io: Server, index: number, roomId: string) => {
  const room = rooms[roomId];
  if (index >= 0 && index < room.queue.length) {
    room.queue.splice(index, 1);
    io.to(roomId).emit('queueUpdated', room.queue);

    if (index === 0 && room.queue.length > 0) {
      playNextSong(io, roomId);
    }
  }
};

const handleDisconnect = (io: Server, socket: Socket) => {
  console.log('Client disconnected', socket.id);

  for (const roomId in rooms) {
    const room = rooms[roomId];
    if (room.websocketUserIDs.has(socket.id)) {
      room.websocketUserIDs.delete(socket.id);
      room.userMap.delete(socket.id);
      io.to(roomId).emit('userCountUpdated', roomId, getUniqueUserCount(room));

      if (room.websocketUserIDs.size === 0 && roomId !== 'Rave_in_the_grave' && roomId !== 'music') {
        delete rooms[roomId];
        console.log(`Room ${roomId} deleted`);
      }
      break;
    }
  }
};

// --- Main Setup Function ---

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    const userId = socket.handshake.query.userId as string;

    socket.on('joinRoom', (roomId: string) => handleJoinRoom(io, socket, roomId, userId));
    socket.on('createRoom', (roomName: string) => handleCreateRoom(io, roomName));
    socket.on('getRoomList', () => handleGetRoomList(socket));
    socket.on('checkRoomExists', (roomId: string) => handleCheckRoomExists(socket, roomId));
    socket.on('searchYouTube', (query: string, roomId: string) => handleSearchYouTube(io, query, roomId));
    socket.on('removeSong', (index: number, roomId: string) => handleRemoveSong(io, index, roomId));
    socket.on('disconnect', () => handleDisconnect(io, socket));
  });
};