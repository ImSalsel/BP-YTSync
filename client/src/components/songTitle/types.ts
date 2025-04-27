import { YouTubePlayer } from 'react-youtube';

export interface SongTitleProps {
  volume: number;
  setVolume: (volume: number) => void;
  player: YouTubePlayer;
}