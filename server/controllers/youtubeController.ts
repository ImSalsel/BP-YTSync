import axios from 'axios';
import { Video } from '../models/video';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is not defined in the environment variables');
}

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

export const getVideoDetails = async (videoId: string): Promise<{ duration: number } | null> => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const video = response.data.items[0];
    const duration = parseISO8601Duration(video.contentDetails.duration);
    return { duration };
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
};

const parseISO8601Duration = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) {
    return 0;
  }
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  return (hours * 3600 + minutes * 60 + seconds) * 1000; // Convert to milliseconds
};