import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { YouTubePlayer } from 'react-youtube';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface Opts {
  height: string;
  width: string;
  playerVars: {
    autoplay: number;
    controls: number;
    showinfo: number;
    modestbranding: number;
  };
}

interface RoomContextProps {
  queue: Video[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  removeSong: (index: number) => void;
  socket: Socket | null;
  opts: Opts;
  onReady: (event: { target: YouTubePlayer }) => void;
  handlePlayNextSong: ({ video, elapsedTime }: { video: Video, elapsedTime: number }) => void;
  videoId: string | null;
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer | null;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [volume, setVolume] = useState(50);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

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
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    // Handle receiving the initial queue and updates to the queue
    newSocket.on('queueUpdated', handleQueueUpdated);

    newSocket.on('playNextSong', handlePlayNextSong);

    return () => {
      newSocket.off('queueUpdated', handleQueueUpdated);
      newSocket.off('playNextSong', handlePlayNextSong);
      newSocket.close();
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit('searchYouTube', searchTerm);
    }
    setSearchTerm('');
  };

  const removeSong = (index: number) => {
    if (socket) {
      socket.emit('removeSong', index);
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
    <RoomContext.Provider value={{ queue, searchTerm, setSearchTerm, handleSearch, removeSong, socket, opts, onReady, handlePlayNextSong, videoId, volume, setVolume, player }}>
      {children}
    </RoomContext.Provider>
  );
};