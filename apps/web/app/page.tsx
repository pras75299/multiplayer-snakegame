'use client';

import React from 'react';
import GameBoard from './components/GameBoard';

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-orange-500 text-center p-4">
        Multiplayer Snake Game
      </h1>
      <section className="flex justify-center flex-col items-center">
        <GameBoard boardSize={18} />
      </section>
    </>
  );
}
