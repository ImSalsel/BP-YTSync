// This file defines the Video interface, which represents a YouTube video.
// It includes the video's ID, title, and URL.

export interface Video {
  id: string;
  youtubeVideoId: string;
  title: string;
  url: string;
  thumbnail: string; 
  duration: number;  
  votes: { likes: Set<string>; dislikes: Set<string> };
}