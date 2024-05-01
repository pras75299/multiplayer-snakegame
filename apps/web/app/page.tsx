import React from 'react';
import io from 'socket.io-client';
import GameBoard from './components/GameBoard';
import { Point } from './types';

// Establish WebSocket connection
const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server!');
  socket.emit('join_game', 'room123');
});

socket.on('opponent_move', (data) => {
  console.log('Opponent move:', data);
  // Consider using React state to update the game based on this data
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
export default function Page() {
  const snake: Point[] = [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ];
  const food: Point = { x: 5, y: 5 };
  const sendMove = (move: Point) => {
    socket.emit('move', { roomId: 'room123', move });
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-orange-500 text-center p-4">
        Multiplayer Snake Game
      </h1>

      <section className="flex justify-center flex-col items-center">
        <GameBoard boardSize={18} snake={snake} food={food} />
        <button
          onClick={() => sendMove({ x: 3, y: 3 })}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Test Move
        </button>
      </section>
    </>
  );
}
