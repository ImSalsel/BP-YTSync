import { Socket } from "socket.io-client";

export interface CodeDisplayProps {
  roomId: string | undefined;
  socket: Socket | null; 
}