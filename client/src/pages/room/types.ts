import { YouTubePlayer } from "react-youtube";
import { Socket } from 'socket.io-client';

export interface Video {
  id: string;
  title: string;
  url: string;
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
  videoId: string | null;
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer | null;
  userCount: number;
  elapsedTime: number | null;
  errorMessage: string | null;
}

export interface Video {
  id: string;
  title: string;
  url: string;
}