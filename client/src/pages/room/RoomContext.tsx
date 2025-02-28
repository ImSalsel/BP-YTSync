import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface RoomContextProps {
  queue: Video[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  removeSong: (index: number) => void;
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

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    // Handle receiving the initial queue and updates to the queue
    newSocket.on('queueUpdated', (updatedQueue: Video[]) => {
      setQueue(updatedQueue);
    });

    return () => {
      newSocket.off('queueUpdated');
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

  return (
    <RoomContext.Provider value={{ queue, searchTerm, setSearchTerm, handleSearch, removeSong }}>
      {children}
    </RoomContext.Provider>
  );
};