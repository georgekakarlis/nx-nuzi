import { NextPage } from 'next';
import React from 'react';
import Room from '../../components/Room';
import useRoomId from '../../hooks/useRoomId';

interface RoomPageProps {
  id: string;
}

const RoomPage: NextPage<RoomPageProps> = ({ id }) => {
  const roomId = useRoomId();

  return <Room roomId={roomId} />;
};

export default RoomPage;
