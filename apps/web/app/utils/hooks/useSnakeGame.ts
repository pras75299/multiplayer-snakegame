import { useState, useEffect } from 'react';
import { Point, Direction,Food } from '../../types';

export const useSnakeGame = (boardSize: number, initialSpeed: number) => {
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ]);
  const foodIcons: string[] = ['🍌', '🍓', '🥭', '🍍', '🍎', '🍊', '🍇'];
  const [foodIcon, setFoodIcon] = useState<string>(foodIcons[0] as string);
  const [food, setFood] = useState<Food>({ position: { x: 5, y: 5 },
  icon: foodIcons[0] || '🍌' });
  const [direction, setDirection] = useState<Direction>(Direction.Right);


  useEffect(() => {
    const moveSnake = () => {
    if (!gameActive || snake.length === 0) return;
    const head = snake[0];
    const newHead: Point = { x: head!.x, y: head!.y };
    switch (direction) {
      case Direction.Up: newHead.y -= 1; break;
      case Direction.Down: newHead.y += 1; break;
      case Direction.Left: newHead.x -= 1; break;
      case Direction.Right: newHead.x += 1; break;
    }

    // Check food collision
    let newSnake = [...snake];
    if (newHead.x === food.position.x && newHead.y === food.position.y) {
      newSnake = [newHead, ...snake];
      incrementScore();
      placeFood();
    } else {
      newSnake = [newHead, ...snake.slice(0, -1)];
      if (newSnake.some(part => part.x === newHead.x && part.y === newHead.y) ||
          newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize) {
        gameOver();
      }
    }
    setSnake(newSnake);
    
  };


    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, gameActive,speed]);

  const incrementScore = () => {
    setScore(prev => {
      const newScore = prev + 10;
      if (newScore % 50 === 0 && speed > 200) {
        setSpeed(prevSpeed => Math.max(prevSpeed - 100, 200));
      }
      return newScore;
    });
  };

  const placeFood = () => {
  let newFoodPosition: Point;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (
    snake.some(
      part => part.x === newFoodPosition.x && part.y === newFoodPosition.y
    )
  );

  // Ensuring foodIcon is never undefined by providing a default value
  const randomIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)] || '🍌';
  setFoodIcon(randomIcon);
};


  const startGame = () => {
    setGameActive(true);
    setSnake([{ x: 2, y: 2 }, { x: 2, y: 3 }]);
    setDirection(Direction.Right);
    setScore(0);
    setSpeed(initialSpeed);
    placeFood();
  };

  const gameOver = () => {
    console.log('GameOver triggered', { snake, direction, food });
  setGameActive(false);
  alert('Game Over! Your score was ' + score)
  };

  return { snake, food, foodIcon, score, speed, gameActive, direction, setDirection, startGame, gameOver };
};
