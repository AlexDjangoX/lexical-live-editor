'use client';

import { ReactNode, useMemo, Suspense } from 'react';
import { RoomProvider } from './liveblocks.config';
import { useSearchParams } from 'next/navigation';
import { ClientSideSuspense } from '@liveblocks/react';
import { Loading } from './components/loading/Loading';

export function Room({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <RoomContent>{children}</RoomContent>
    </Suspense>
  );
}

function RoomContent({ children }: { children: ReactNode }) {
  const roomId = useOverrideRoomId('live-lexical');

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const params = useSearchParams();
  const roomIdParam = params.get('roomId');

  const overrideRoomId = useMemo(() => {
    return roomIdParam ? `${roomId}-${roomIdParam}` : roomId;
  }, [roomId, roomIdParam]);

  return overrideRoomId;
}
