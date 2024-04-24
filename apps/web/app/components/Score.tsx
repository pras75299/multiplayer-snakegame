import React from 'react';

interface ScoreDisplayProps {
  score: number;
  speed: number;
}

const Score: React.FC<ScoreDisplayProps> = ({ score, speed }) => (
  <>
    <h2 className="flex">Score: {score}</h2>
    <h4>Speed: {speed}ms per move</h4>
  </>
);

export default Score;
