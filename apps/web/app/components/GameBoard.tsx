'use client';
import React, { useEffect, useState } from 'react';
import { GameBoardProps, Point, Direction } from '../types';
const foodIcons = ['🍌', '🍓', '🥭', '🍍', '🍎', '🍊', '🍇'];
import GameControls from './GameControl';
import Score from './Score';
import GameGrid from './GameGrid';
import { useSnakeGame } from '../utils/hooks/useSnakeGame';
import { useKeyboardControls } from '../utils/hooks/useKeyboardControl';
const GameBoard: React.FC<GameBoardProps> = ({ boardSize }) => {
  const {
    snake,
    food,
    foodIcon,
    score,
    speed,
    gameActive,
    setDirection,
    startGame,
    gameOver,
  } = useSnakeGame(boardSize, 600);
  useKeyboardControls(setDirection, gameActive);

  const getCellStyle = (x: number, y: number): string => {
    const isSnake = snake.some((part) => part.x === x && part.y === y);
    const isFood = food.position.x === x && food.position.y === y;

    if (isFood) {
      return foodIcon;
    } else if (isSnake) {
      return '🐍';
    }
    return '';
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
