import { createContext, useContext } from 'react';
import { RoomContextProps } from './types';

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};

export default RoomContext;