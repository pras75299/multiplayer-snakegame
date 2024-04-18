'use client';
import React, { useEffect, useState } from 'react';
import { GameBoardProps, Point, Direction } from '../types';

const GameBoard: React.FC<GameBoardProps> = ({ boardSize }) => {
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(600);
  const [gameActive, setGameActive] = useState<boolean>(false);

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

  const startGame = () => {
    setGameActive(true);
    setSnake([
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ]); // Reset snake to initial position
    setDirection(Direction.Right); // Reset initial direction
    setScore(0); // Reset score
    setSpeed(600); // Reset speed
    placeFood();
  };

  const gameOver = () => {
    setGameActive(false);
  };

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

      let newSnake = [newHead, ...snake.slice(0, -1)];

      if (newHead.x === food.x && newHead.y === food.y) {
        newSnake = [newHead, ...snake];
        placeFood();
        setScore((currentScore) => {
          const newScore = currentScore + 10;
          if (newScore % 50 === 0 && speed > 200) {
            setSpeed((currentSpeed) => Math.max(currentSpeed - 100, 200));
          }
          return newScore;
        });
      } else {
        newSnake.pop();
      }

      if (
        newHead.x < 0 ||
        newHead.x >= boardSize ||
        newHead.y < 0 ||
        newHead.y >= boardSize ||
        snake.some((part) => part.x === newHead.x && part.y === newHead.y)
      ) {
        gameOver();
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

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, boardSize, speed]);

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
    <>
      {!gameActive && (
        <button
          onClick={startGame}
          style={{ marginBottom: '20px', backgroundColor: 'red' }}
        >
          Start Game
        </button>
      )}
      <h2 className="flex">Score: {score}</h2>
      <h4>Speed: {speed}ms per move</h4>
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
    </>
  );
};

export default GameBoard;
