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
  const response = await fetch('http://localhost:3333/api/rooms');
  const rooms = await response.json();

  return {
    props: {
      rooms,
    },
  };
};

export default Rooms;
