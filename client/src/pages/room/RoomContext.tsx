import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { YouTubePlayer } from 'react-youtube';
import { useParams, useNavigate } from 'react-router-dom';
import { RoomContextProps, Video, Opts } from './types';
import { useWebSocket } from '../../context/WebSocketContext';

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [queue, setQueue] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [volume, setVolume] = useState(50);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { socket } = useWebSocket();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);


  const videoIdRef = useRef<string | null>(null);

  useEffect(() => {
    videoIdRef.current = youtubeVideoId;
  }, [youtubeVideoId]);

  const handlePlayNextSong = useCallback(
    ({ video, elapsedTime }: { video: Video; elapsedTime: number }) => {
      if (videoIdRef.current === video.youtubeVideoId) {
        // Temporarily clear the videoId and youtubeVideoId to force re-render
        setYoutubeVideoId(null);
  
        setTimeout(() => {
          setYoutubeVideoId(video.youtubeVideoId);
          setElapsedTime(elapsedTime);
        }, 100); // Add a small delay to ensure state updates
      } else {
        setYoutubeVideoId(video.youtubeVideoId);
        setElapsedTime(elapsedTime);
      }
  
      videoIdRef.current = video.youtubeVideoId; // Update the ref to the current video ID
    },
    []
  );

  const handleQueueUpdated = (updatedQueue: Video[]) => {
    setQueue(updatedQueue);
    if (updatedQueue.length === 0) {
      setYoutubeVideoId(null);
      setElapsedTime(null);
    }
  };

  useEffect(() => {
    return () => {
      if (socket && roomId) {
        socket.emit('leaveRoom', roomId);
      }
    };
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket) return;
  
    const handleVotesUpdated = (videoId: string, likes: number, dislikes: number) => {
      console.log('Votes updated:', { videoId, likes, dislikes });
      setQueue((prevQueue) =>
        prevQueue.map((video) =>
          video.id === videoId
            ? {
                ...video,
                likes, 
                dislikes,
              }
            : video
        )
      );
    };
  
    socket.on('votesUpdated', handleVotesUpdated);
  
    return () => {
      socket.off('votesUpdated', handleVotesUpdated);
    };
  }, [socket]);

  
  useEffect(() => {
    if (!socket || !roomId) return;
  
    socket.emit('checkRoomExists', roomId);
  
    socket.on('roomExists', (exists: boolean, privateRoom: boolean) => {
      console.log('roomExists event received:', { exists, privateRoom });
      if (!exists) {
        console.log('Room does not exist, redirecting to home page');
        navigate('/');
      } else {
        setIsPrivate(privateRoom); // Set whether the room is private
        socket.emit('joinRoom', roomId);
      }
    });
  
    socket.on('queueUpdated', handleQueueUpdated);
    socket.on('playNextSong', handlePlayNextSong);
    socket.on('userCountUpdated', (roomId: string, count: number) => {
      console.log('userCountUpdated event received:', roomId, count); // Debug log
      setUserCount(count);
    });
  
    return () => {
      socket.off('roomExists');
      socket.off('queueUpdated', handleQueueUpdated);
      socket.off('playNextSong', handlePlayNextSong);
      socket.off('userCountUpdated');
    };
  }, [roomId, navigate, handlePlayNextSong, socket]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit('searchYouTube', searchTerm, roomId, (error: string | null) => {
        if (error) {
          setErrorMessage(error);
        } else {
          setErrorMessage(null);
        }
      });
    }
    setSearchTerm('');
  };

  const removeSong = (index: number) => {
    if (socket) {
      socket.emit('removeSong', index, roomId);
    }
  };

  const opts: Opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
    if (elapsedTime !== null) {
      event.target.seekTo(elapsedTime / 1000, true);
      event.target.playVideo();
      
    }
  };

  return (
    <RoomContext.Provider value={{ queue, searchTerm, setSearchTerm, handleSearch, removeSong, socket, opts, onReady, handlePlayNextSong, youTubeVideoId: youtubeVideoId, volume, setVolume, player, elapsedTime, userCount, errorMessage, isPrivate, roomId }}>
      {children}
    </RoomContext.Provider>
  );
};