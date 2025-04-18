import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BlurredCode, CodeContainer } from './styled';
import { Socket } from 'socket.io-client';

interface CodeDisplayProps {
  roomId: string | undefined;
  socket: Socket | null; 
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ roomId, socket }) => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fetch the room code when the component mounts
  useEffect(() => {
    if (!roomId || !socket) return;

    socket.emit('getRoomCode', roomId, (response: { success: boolean; code?: string; error?: string }) => {
      if (response.success) {
        setRoomCode(response.code || '');
      } else {
        alert(response.error || 'Failed to fetch room code');
      }
    });
  }, [roomId, socket]);

  const copyToClipboard = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    }
  };

  return (
    <CodeContainer>
      {roomCode && (
        <>
          <BlurredCode
            visible={visible}
            onClick={() => setVisible((prev) => !prev)} // Toggle visibility on click
          >
            {roomCode}
          </BlurredCode>
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton onClick={copyToClipboard} style={{ color: '#ffffff', marginLeft: '20px' }}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </CodeContainer>
  );
};

export default CodeDisplay;