import axios from 'axios';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

interface Room {
  name: string;
  id: string;
}

interface RoomsProps {
  rooms: Room[];
}

const Rooms: NextPage<RoomsProps> = ({ rooms }) => {
  return (
    <div>
      <h1>Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <a href={`/rooms/${room.id}`}>{room.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get<Room[]>('http://localhost:3333/api/rooms');
    const rooms = response.json();

    return {
      props: {
        rooms,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        rooms: [],
      },
    };
  }
};

export default Rooms;
