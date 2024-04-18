import GameBoard from './components/GameBoard';
import { Point } from './types';
export default function Page() {
  const snake: Point[] = [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ];
  const food: Point = { x: 5, y: 5 };
  return (
    <>
      <h1 className="text-2xl font-bold text-orange-500 text-center p-4">
        Multiplayer Snake Game
      </h1>
      <section className="flex justify-center flex-col items-center">
        <GameBoard boardSize={20} snake={snake} food={food} />
      </section>
    </>
  );
}
