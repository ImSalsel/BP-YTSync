import { Video } from './video';


export interface Room {
    queue: Video[];
    currentTimeout: NodeJS.Timeout | null;
    startTime: number | null;
    websocketUserIDs: Set<string>;
    userMap: Map<string, string>; // Map to store socket ID to user ID
    ownerId: string; // ID of the room owner
    password: string | null; // Optional password for the room
  }