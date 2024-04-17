export interface Point {
  x: number;
  y: number;
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