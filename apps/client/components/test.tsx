import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateRoomForm: React.FC = () => {
  const [roomId, setRoomId] = React.useState('');

  const generateUuid = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const roomName = event.currentTarget.elements.roomName.value;

    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName, roomId }),
    });

    if (response.ok) {
      // redirect the user to the newly created room
      window.location.href = `/rooms/${roomId}`;
    } else {
      // handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Room Name:</label>
      <input type="text" name="roomName" />
      <button type="button" onClick={generateUuid}>
        Generate UUID
      </button>
      <input type="hidden" name="roomId" value={roomId} />
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoomForm;
