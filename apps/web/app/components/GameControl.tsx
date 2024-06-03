'use client';

import React from 'react';

interface GameControlsProps {
  gameActive: boolean;
  startGame: () => void;
  gameOver: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameActive,
  startGame,
  gameOver,
}) => (
  <div className="flex justify-between">
    <button
      onClick={startGame}
      disabled={gameActive}
      className="bg-blue-600 p-2 text-white rounded-sm mb-2 mr-2 disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed"
    >
      Start Game
    </button>
    <button
      onClick={gameOver}
      disabled={!gameActive}
      className="bg-blue-600 p-2 text-white rounded-sm mb-2 disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed"
    >
      End Game
    </button>
  </div>
);

export default GameControls;
