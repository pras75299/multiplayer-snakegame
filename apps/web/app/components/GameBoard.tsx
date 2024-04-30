'use client';
import React from 'react';
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

    // Correctly returning the food's icon or a snake representation
    if (isFood) {
      return food.icon; // Return the icon for the food
    } else if (isSnake) {
      return '🐍'; // Return snake representation
    }
    return ''; // Empty string for empty cells
  };

  return (
    <>
      <GameControls
        gameActive={gameActive}
        startGame={startGame}
        gameOver={gameOver}
      />
      <Score score={score} speed={speed} />
      <GameGrid boardSize={boardSize} getCellStyle={getCellStyle} />
    </>
  );
};

export default GameBoard;
