import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


type RoomProps = React.PropsWithChildren<{
  roomId: string | null;
}>;


function Room(props: RoomProps) {
  const router = useRouter();
  const { id } = router.query;

  const [room, setRoom] = React.useState<{ name: string; } | null>(null);

  React.useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        // handle the error
      }
    };

    fetchRoom();
  }, [id]);

  return room ? (
    <div>
      <h1>Room: {room.name}</h1>
      {/* display the other details of the room here */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Room;
