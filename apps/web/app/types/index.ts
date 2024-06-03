export interface Point {
  x: number;
  y: number;
}

export interface Food {
  position: Point;
  icon: string;
}

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export interface GameBoardProps {
  boardSize: number;
}
