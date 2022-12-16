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
  const roomId = generateUuid(); // Assume this function generates a unique ID using the uuidv4 library

  const headers = {
    'Content-Type': 'application/json',
    'Accept' : 'application/json, text/plain, */*'
  };

  try {
    let response;
    if (roomName) {
      // Use the roomName in the request body if it was provided
      response = await axios.post('http://localhost:3333/api/rooms', { roomName }, { headers });
    } else{
      // Use the roomId in the request body if roomName was not provided
      response = await axios.post('http://localhost:3333/api/rooms', { roomId }, { headers });
    }

    // Navigate to the new room page if the request was successful
    router.push(`/rooms/${response.data.roomId}`);
  } catch (error) {
    // Handle the error
    if (error.response) {
      // The request was made and the server responded with a status code that is not in the 2xx range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
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
