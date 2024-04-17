'use client';
import React, { useEffect, useState } from 'react';
import { GameBoardProps, Point, Direction } from '../types';

const GameBoard: React.FC<GameBoardProps> = ({ boardSize }) => {
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(Direction.Right);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== Direction.Down) setDirection(Direction.Up);
          break;
        case 'ArrowDown':
          if (direction !== Direction.Up) setDirection(Direction.Down);
          break;
        case 'ArrowLeft':
          if (direction !== Direction.Right) setDirection(Direction.Left);
          break;
        case 'ArrowRight':
          if (direction !== Direction.Left) setDirection(Direction.Right);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const moveSnake = () => {
      // Clone the head to create a new head
      const newHead: Point = {
        x: snake[0]!.x,
        y: snake[0]!.y,
      };

      switch (direction) {
        case Direction.Up:
          newHead.y -= 1;
          break;
        case Direction.Down:
          newHead.y += 1;
          break;
        case Direction.Left:
          newHead.x -= 1;
          break;
        case Direction.Right:
          newHead.x += 1;
          break;
      }

      // Check for collisions with walls or self
      if (
        newHead.x < 0 ||
        newHead.x >= boardSize ||
        newHead.y < 0 ||
        newHead.y >= boardSize ||
        snake.some((part) => part.x === newHead.x && part.y === newHead.y)
      ) {
        // Reset the game
        setSnake([
          { x: 2, y: 2 },
          { x: 2, y: 3 },
        ]);
        setDirection(Direction.Right);
        placeFood();
      } else {
        const newSnake = [newHead, ...snake];
        if (newHead.x === food.x && newHead.y === food.y) {
          placeFood();
        } else {
          newSnake.pop();
        }
        setSnake(newSnake);
      }
    };

    const intervalId = setInterval(moveSnake, 200);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, boardSize]);

  const placeFood = () => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (
      snake.some((part) => part.x === newFood.x && part.y === newFood.y)
    );
    setFood(newFood);
  };

  const getCellStyle = (x: number, y: number): React.CSSProperties => {
    const isSnake = snake.some((part) => part.x === x && part.y === y);
    const isFood = food.x === x && food.y === y;

    return {
      width: '30px',
      height: '30px',
      backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white',
      border: '1px solid black',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
      }}
    >
      {Array.from({ length: boardSize }, (_, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {Array.from({ length: boardSize }, (_, x) => (
            <div key={x} style={getCellStyle(x, y)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
