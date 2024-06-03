import { useState, useEffect } from 'react';
import { Point, Direction, Food } from '../../types';
import { io, Socket } from 'socket.io-client';

export const useSnakeGame = (boardSize: number, initialSpeed: number) => {
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
  const foodIcons: string[] = ['🍌', '🍓', '🥭', '🍍', '🍎', '🍊', '🍇'];
  const [food, setFood] = useState<Food>({
    position: { x: 5, y: 5 },
    icon: foodIcons[0] || '🍌'
  });
  const [direction, setDirection] = useState<Direction>(Direction.Right);

  const socket: Socket = io('http://localhost:8000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on('opponent_move', (data: { snake: Point[]; food: Food; score: number; speed: number }) => {
      setSnake(data.snake);
      setFood(data.food);
      setScore(data.score);
      setSpeed(data.speed);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const placeFood = () => {
    let newFoodPosition: Point;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (snake.some(part => part.x === newFoodPosition.x && part.y === newFoodPosition.y));

    const randomIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)] || '🍌';
    setFood({ position: newFoodPosition, icon: randomIcon });
  };

  const gameOver = () => {
    if (!gameActive) return; // Prevents multiple triggers if game is already over
    console.log('Game Over triggered'); // Debug log
    setGameActive(false);
    alert('Game Over! Your score was ' + score);
  };

  const moveSnake = () => {
    if (!gameActive) return;

    const newHead: Point = { x: snake[0]!.x, y: snake[0]!.y };
    switch (direction) {
      case Direction.Up: newHead.y -= 1; break;
      case Direction.Down: newHead.y += 1; break;
      case Direction.Left: newHead.x -= 1; break;
      case Direction.Right: newHead.x += 1; break;
    }

    if (
      newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
      snake.slice(1).some(part => part.x === newHead.x && part.y === newHead.y) // Check for self collision excluding head
    ) {
      gameOver();
      return;
    }

    let newSnake = [newHead, ...snake.slice(0, snake.length - 1)];
    if (newHead.x === food.position.x && newHead.y === food.position.y) {
      newSnake = [newHead, ...snake];
      incrementScore();
      placeFood();
    }
    setSnake(newSnake);

    // Send move to the server
    socket.emit('move', { snake: newSnake, food, score, speed });
  };

  const incrementScore = () => {
    setScore(prev => {
      const newScore = prev + 10;
      if (newScore % 50 === 0 && speed > 200) {
        setSpeed(prevSpeed => Math.max(prevSpeed - 100, 200));
      }
      return newScore;
    });
  };

  const startGame = () => {
    console.log('Starting game');
    setGameActive(true);
    setSnake([{ x: 2, y: 2 }, { x: 2, y: 3 }]);
    setDirection(Direction.Right);
    setScore(0);
    setSpeed(initialSpeed);
    placeFood();
  };

  useEffect(() => {
    if (gameActive) {
      const intervalId = setInterval(moveSnake, speed);
      return () => clearInterval(intervalId);
    }
  }, [gameActive, snake, direction, food, speed]);

  return { snake, food, score, speed, gameActive, direction, setDirection, startGame, gameOver };
};
