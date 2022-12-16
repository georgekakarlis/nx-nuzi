import React from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CreateRoomForm: React.FC = () => {
  const router = useRouter();

  const generateUuid = () => uuidv4();

  //Uses the async keyword to mark the function as asynchronous, and the await keyword to wait for the result of the axios.post call.
  // It also uses a try-catch block to catch any errors that might occur during the request.
//The axios.post function returns a promise that
// resolves with the response from the server if the request is successful, 
//or rejects with an error if the request fails. By using the await keyword, you can wait for the promise to resolve or reject before executing the next line of code.

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomName = formData.get('roomName') as string;
    const roomId = generateUuid();
  
    try {
      const response = await axios.post('http://localhost:3333/api/rooms', { roomName, roomId });
      router.push(`/rooms/${roomId}`);
    } catch (error) {
      // handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Room Name:</label>
      <input type="text" name="roomName" />
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoomForm;
