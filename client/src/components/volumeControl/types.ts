import { YouTubePlayer } from "react-youtube";

export interface VolumeControlProps {
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer;
}