'use client';

import React, { useEffect } from 'react';
import { GameBoardProps } from '../types';
import GameControls from './GameControl';
import Score from './Score';
import GameGrid from './GameGrid';
import { useSnakeGame } from '../utils/hooks/useSnakeGame';
import { useKeyboardControls } from '../utils/hooks/useKeyboardControl';

const GameBoard: React.FC<GameBoardProps> = ({ boardSize }) => {
  const {
    snake,
    food,
    score,
    speed,
    gameActive,
    direction,
    setDirection,
    startGame,
    gameOver,
  } = useSnakeGame(boardSize, 600);

  useKeyboardControls(setDirection, gameActive);

  const getCellStyle = (x: number, y: number): string => {
    const isSnake = snake.some((part) => part.x === x && part.y === y);
    const isFood = food.position.x === x && food.position.y === y;

    if (isFood) {
      return food.icon; // Return the icon for the food
    } else if (isSnake) {
      return '🐍'; // Return snake representation
    }
    return ''; // Empty string for empty cells
  };

  function sendMove(arg0: { x: number; y: number }): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <GameControls
        gameActive={gameActive}
        startGame={startGame}
        gameOver={gameOver}
      />
      <Score score={score} speed={speed} />
      <GameGrid boardSize={boardSize} getCellStyle={getCellStyle} />
      <button
        onClick={() => sendMove({ x: 3, y: 3 })}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Test Move
      </button>
    </>
  );
};

export default GameBoard;
