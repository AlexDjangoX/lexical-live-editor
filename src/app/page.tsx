'use client';

import App from '@/app/App';

import '@/app/styles.css';
import { Room } from '@/app/Room';

export default function Home() {
  return (
    <>
      <Room>
        <App />
      </Room>
    </>
  );
}
