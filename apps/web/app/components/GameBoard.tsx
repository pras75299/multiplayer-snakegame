'use client';
import React, { useEffect, useState } from 'react';
import { GameBoardProps, Point, Direction } from '../types';
import { url } from 'inspector';
const foodIcons = ['🍌', '🍓', '🥭', '🍍', '🍎', '🍊', '🍇'];
const GameBoard: React.FC<GameBoardProps> = ({ boardSize }) => {
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(600);
  const [gameActive, setGameActive] = useState<boolean>(false);

  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
  const [food, setFood] = useState<{ position: Point; icon: any }>({
    position: { x: 5, y: 5 },
    icon: foodIcons[0], // Start with the first image initially or randomize it
  });
  const [direction, setDirection] = useState<Direction>(Direction.Right);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameActive) {
        return;
      }
      event.preventDefault();
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
  }, [gameActive, direction]);

  const startGame = () => {
    if (!gameActive) {
      setGameActive(true);
      // Reset or initialize all necessary game states
      setSnake([
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ]);
      setDirection(Direction.Right);
      setScore(0);
      setSpeed(600);
      placeFood();
    }
  };

  const gameOver = () => {
    // alert('Game is over');
    setGameActive(false);
  };

  useEffect(() => {
    if (!gameActive) {
      return;
    }
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

      if (newHead.x === food.position.x && newHead.y === food.position.y) {
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
        if (newHead.x === food.position.x && newHead.y === food.position.y) {
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
    let newFoodPosition: Point;
    let newFoodIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)]; // Randomly select an emoji
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (
      snake.some(
        (part) => part.x === newFoodPosition.x && part.y === newFoodPosition.y
      )
    );

    setFood({ position: newFoodPosition, icon: newFoodIcon });
  };

  const getCellStyle = (x: number, y: number): string => {
    const isSnake = snake.some((part) => part.x === x && part.y === y);
    const isFood = food.position.x === x && food.position.y === y;

    if (isFood) {
      return food.icon;
    } else if (isSnake) {
      return '🐍'; // Optionally, use an emoji or some mark for the snake as well
    }
    return '';
  };

  return (
    <>
      <button
        onClick={startGame}
        disabled={gameActive}
        className="bg-blue-600 p-2 text-white rounded-sm mb-2 disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed"
      >
        Start Game
      </button>
      <h2 className="flex">Score: {score}</h2>
      <h4>Speed: {speed}ms per move</h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid black',
          backgroundColor: '#4CAF50',
          width: '28%',
          height: '100%',
        }}
      >
        {Array.from({ length: boardSize }, (_, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {Array.from({ length: boardSize }, (_, x) => (
              <div
                key={x}
                className="bg-transparent w-6 h-6 flex justify-center items-center"
              >
                {getCellStyle(x, y)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
