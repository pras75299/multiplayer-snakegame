import React from 'react';

interface ScoreDisplayProps {
  score: number;
  speed: number;
}

const Score: React.FC<ScoreDisplayProps> = ({ score, speed }) => (
  <>
    <div className="flex">
      <h2 className="flex mr-4">
        Score: <span className="text-orange-600 ml-2">{score}</span>
      </h2>
      <h4>
        Speed: <span className="text-orange-600">{speed}ms</span> per move
      </h4>
    </div>
  </>
);

export default Score;
