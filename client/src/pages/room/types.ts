import { YouTubePlayer } from "react-youtube";
import { Socket } from 'socket.io-client';

export interface Video {
  id: string;
  youtubeVideoId: string;
  title: string;
  url: string;
  thumbnail: string; 
  duration: number;  
  votes: { likes: Set<string>; dislikes: Set<string> };
  likes: number;
  dislikes: number;
}

export interface Opts {
  height: string;
  width: string;
  playerVars: {
    autoplay: number;
    controls: number;
    showinfo: number;
    modestbranding: number;
  };
}

export interface RoomContextProps {
  queue: Video[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  removeSong: (index: number) => void;
  socket: Socket | null;
  opts: Opts;
  onReady: (event: { target: YouTubePlayer }) => void;
  handlePlayNextSong: ({ video, elapsedTime }: { video: Video, elapsedTime: number }) => void;
  youTubeVideoId: string | null;
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer | null;
  userCount: number;
  elapsedTime: number | null;
  errorMessage: string | null;
  isPrivate: boolean;
  roomId: string | undefined;
}
