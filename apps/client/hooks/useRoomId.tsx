import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useRoomId = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const { id } = router.query;
    setRoomId(id as string);
  }, [router.query]);

  return roomId;
};

export default useRoomId;
