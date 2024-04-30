export interface Point {
  x: number;
  y: number;
}
export interface Food {
  position: Point;
  icon: string;  // Define the type of icon as string
}
export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
export interface GameBoardProps {
  boardSize: number;
  snake: Point[];
  food: Point;
}