import { useState, useEffect } from 'react';

export interface Score {
  correct: number;
  incorrect: number;
  total: number;
}

export interface UseScoreReturn {
  score: Score;
  updateScore: (isCorrect: boolean) => void;
  resetScore: () => void;
  getAccuracy: () => number;
}

export const useScore = (): UseScoreReturn => {
  const [score, setScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  // Load score from localStorage on mount
  useEffect(() => {
    const savedScore = localStorage.getItem('pccs-study-score');
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
  }, []);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pccs-study-score', JSON.stringify(score));
  }, [score]);

  const updateScore = (isCorrect: boolean): void => {
    setScore(prevScore => ({
      correct: prevScore.correct + (isCorrect ? 1 : 0),
      incorrect: prevScore.incorrect + (isCorrect ? 0 : 1),
      total: prevScore.total + 1
    }));
  };

  const resetScore = (): void => {
    setScore({
      correct: 0,
      incorrect: 0,
      total: 0
    });
  };

  const getAccuracy = (): number => {
    return score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  };

  return {
    score,
    updateScore,
    resetScore,
    getAccuracy
  };
};