'use client';

import React from 'react';

interface GameGridProps {
  boardSize: number;
  getCellStyle: (x: number, y: number) => string;
}

const GameGrid: React.FC<GameGridProps> = ({ boardSize, getCellStyle }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid black',
      backgroundColor: '#4CAF50',
      width: '100%',
      height: 'calc(100vh - 136px)',
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
);

export default GameGrid;
