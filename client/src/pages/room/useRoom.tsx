import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Video {
  id: string;
  title: string;
  url: string;
}

const useRoom = () => {
  const [queue, setQueue] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Handle receiving the initial queue and updates to the queue
    socket.on('queueUpdated', (updatedQueue: Video[]) => {
      setQueue(updatedQueue);
    });

    return () => {
      socket.off('queueUpdated');
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('searchYouTube', searchTerm);
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