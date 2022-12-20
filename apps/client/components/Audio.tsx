import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Audio: React.FC = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [room, setRoom] = useState('');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (localStream) {
      const newSocket = io('http://localhost:9000');
      setSocket(newSocket);

      newSocket.on('created', (room: string) => {
        console.log(`Created room ${room}`);
        setRoom(room);
      });

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [localStream]);

  const handleCreateRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket) {
      socket.emit('create', room);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateRoom}>
        <label htmlFor="room">Room:</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button type="submit">Create</button>
      </form>

    </div>
  );
};

export default Audio;
