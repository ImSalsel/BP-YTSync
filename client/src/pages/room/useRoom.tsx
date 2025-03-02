import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { Video } from './types';



const useRoom = () => {
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

  return {
    queue,
    searchTerm,
    setSearchTerm,
    handleSearch,
  };
};

export default useRoom;