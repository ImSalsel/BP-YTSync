// This file defines the Video interface, which represents a YouTube video.
// It includes the video's ID, title, and URL.

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string; // Add thumbnail
  duration: number;  // Add duration (in milliseconds)
}