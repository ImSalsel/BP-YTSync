export interface SongProps {
    video: {
      id: string;
      title: string;
      thumbnail: string;
      duration: number;
      likes: number;
      dislikes: number;
    };
    isPrivate: boolean;
    onVote: (videoId: string, voteType: 'like' | 'dislike') => void;
    onRemove: () => void;
  }