import { useState } from 'react';
import axios from 'axios';

const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube API key

interface Video {
  id: string;
  title: string;
  url: string;
}

const useRoom = () => {
  const [queue, setQueue] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchYouTube = async (query: string) => {
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

      setQueue((prevQueue) => [...prevQueue, newVideo]);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  const addVideoToQueue = (url: string) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      const newVideo: Video = {
        id: videoId,
        title: 'Custom Video',
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };

      setQueue((prevQueue) => [...prevQueue, newVideo]);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.includes('youtube.com')) {
      addVideoToQueue(searchTerm);
    } else {
      searchYouTube(searchTerm);
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