import { Socket } from "socket.io-client";
import { Opts, Video } from "../pages/room/types";
import { YouTubePlayer } from "react-youtube";

export interface WebSocketContextProps {
    socket: Socket | null;
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

 export interface AuthContextType {
    loading: boolean;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }