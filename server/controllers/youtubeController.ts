import axios from 'axios';
import { Video } from '../models/video';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const searchYouTube = async (query: string): Promise<Video | null> => {
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
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    };
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
};