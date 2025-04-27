

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


