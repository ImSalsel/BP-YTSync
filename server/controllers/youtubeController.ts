import axios from 'axios';
import { Video } from '../models/video';
import dotenv from 'dotenv';
dotenv.config(); 

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  throw new Error('YOUTUBE_API_KEY is not defined in the environment variables');
}

const extractVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const searchYouTube = async (query: string): Promise<Video | null> => {
  try {
    const videoId = extractVideoId(query);
    if (videoId) {
      const embeddable = await isVideoEmbeddable(videoId);
      if (!embeddable) {
        throw new Error('Video is not embeddable');
      }

      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: YOUTUBE_API_KEY,
        },
      });

      const video = response.data.items[0];
      return {
        id: video.id,
        title: video.snippet.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: video.snippet.thumbnails.default.url, // Add thumbnail
        duration: parseISO8601Duration(video.contentDetails.duration), // Add duration
      };
    } else {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 1,
          q: query,
          key: YOUTUBE_API_KEY,
        },
      });

      const video = response.data.items[0];
      const embeddable = await isVideoEmbeddable(video.id.videoId);
      if (!embeddable) {
        throw new Error('Video is not embeddable');
      }

      const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails',
          id: video.id.videoId,
          key: YOUTUBE_API_KEY,
        },
      });

      const videoDetails = videoDetailsResponse.data.items[0];
      return {
        id: videoDetails.id,
        title: videoDetails.snippet.title,
        url: `https://www.youtube.com/watch?v=${videoDetails.id}`,
        thumbnail: videoDetails.snippet.thumbnails.default.url, // Add thumbnail
        duration: parseISO8601Duration(videoDetails.contentDetails.duration), // Add duration
      };
    }
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

// New function to check if a video is embeddable
export const isVideoEmbeddable = async (videoId: string): Promise<boolean> => {
  try {
    const response = await axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking if video is embeddable:', error);
    return false;
  }
};