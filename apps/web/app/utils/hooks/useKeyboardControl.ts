import { useEffect } from 'react';
import { Direction } from '../../types';

export const useKeyboardControls = (setDirection: (dir: Direction) => void, gameActive: boolean) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameActive) return;
      event.preventDefault();
      switch (event.key) {
        case 'ArrowUp': setDirection(Direction.Up); break;
        case 'ArrowDown': setDirection(Direction.Down); break;
        case 'ArrowLeft': setDirection(Direction.Left); break;
        case 'ArrowRight': setDirection(Direction.Right); break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, setDirection]);
};
