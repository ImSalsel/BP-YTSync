import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { YouTubePlayer } from 'react-youtube';
import { useParams } from 'react-router-dom';
import { RoomContextProps, Video, Opts } from './types';
import config from '../../config';
const RoomContext = createContext<RoomContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const [queue, setQueue] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [volume, setVolume] = useState(50);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(0);


  const handlePlayNextSong = ({ video, elapsedTime }: { video: Video, elapsedTime: number }) => {
    setVideoId(video.id);
    setElapsedTime(elapsedTime);
  };

  const handleQueueUpdated = (updatedQueue: Video[]) => {
    setQueue(updatedQueue);
    if (updatedQueue.length === 0) {
      setVideoId(null);
    }
  };

  useEffect(() => {
    const newSocket = io(config.SOCKET_ADDRESS, {
      transports: ["websocket", "polling"],
      withCredentials: true
  });
    setSocket(newSocket);

    newSocket.emit('joinRoom', roomId);

    // Handle receiving the initial queue and updates to the queue
    newSocket.on('queueUpdated', handleQueueUpdated);

    newSocket.on('playNextSong', handlePlayNextSong);

    newSocket.on('userCountUpdated', (roomId: string, count: number) => {
      console.log('userCountUpdated event received:', roomId, count); // Debug log
      setUserCount(count);
    });

    return () => {
      newSocket.off('queueUpdated', handleQueueUpdated);
      newSocket.off('playNextSong', handlePlayNextSong);
      newSocket.off('userCountUpdated');
      newSocket.close();
    };
  }, [roomId]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit('searchYouTube', searchTerm, roomId);
    }
    setSearchTerm('');
  };

  const removeSong = (index: number) => {
    if (socket) {
      socket.emit('removeSong', index, roomId);
    }
  };

  const opts: Opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
    if (elapsedTime !== null) {
      event.target.seekTo(elapsedTime / 1000, true);
    }
  };

  return (
    <RoomContext.Provider value={{ queue, searchTerm, setSearchTerm, handleSearch, removeSong, socket, opts, onReady, handlePlayNextSong, videoId, volume, setVolume, player, elapsedTime, userCount }}>
      {children}
    </RoomContext.Provider>
  );
};