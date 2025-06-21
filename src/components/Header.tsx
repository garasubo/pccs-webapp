import React from 'react';
import { Score } from '../hooks/useScore';

interface HeaderProps {
  score: Score;
  accuracy: number;
}

const Header: React.FC<HeaderProps> = ({ score, accuracy }) => {
  return (
    <header className="header">
      <h1>PCCS学習アプリ</h1>
      <div className="score-board">
        <span>正解: <span className="score-value">{score.correct}</span></span>
        <span>不正解: <span className="score-value">{score.incorrect}</span></span>
        <span>正答率: <span className="score-value">{accuracy}%</span></span>
      </div>
    </header>
  );
};

export default Header;