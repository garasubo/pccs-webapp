import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { JIS_COLORS, JisColor, buildOptions, rgbToCss } from '../data/jisColors';

type FeedbackType = 'correct' | 'incorrect' | null;

interface ScoreState {
  correct: number;
  total: number;
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const JisColorQuiz: React.FC = () => {
  const GROUP_LABELS: Record<JisColor['group'], string> = {
    red: '赤系',
    orange: 'オレンジ系',
    yellow: '黄色系',
    yellowgreen: '黄緑系',
    green: '緑系',
    bluegreen: '青緑系',
    blue: '青系',
    bluepurple: '青紫系',
    purple: '紫系',
    pink: 'ピンク系',
    brown: '茶系',
    gray: '無彩色系',
    black: '無彩色系',
    white: '無彩色系',
  };
  const [target, setTarget] = useState<JisColor | null>(null);
  const [options, setOptions] = useState<JisColor[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [score, setScore] = useState<ScoreState>({ correct: 0, total: 0 });

  const generate = useCallback(() => {
    const t = pickRandom(JIS_COLORS);
    const opts = buildOptions(t, JIS_COLORS, 4);
    setTarget(t);
    setOptions(opts);
    setSelected(null);
    setFeedback(null);
  }, []);

  useEffect(() => {
    generate();
  }, [generate]);

  const canSubmit = useMemo(() => selected !== null && feedback === null, [selected, feedback]);

  const handleSubmit = useCallback(() => {
    if (!target || selected == null) return;
    const isCorrect = selected === target.name;
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  }, [selected, target]);

  const handleNext = useCallback(() => {
    generate();
  }, [generate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canSubmit) {
        handleSubmit();
      } else if (e.key === ' ' && feedback) {
        e.preventDefault();
        handleNext();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [canSubmit, feedback, handleSubmit, handleNext]);

  if (!target) return <div>Loading...</div>;

  return (
    <div className="color-relationship-game">
      <div className="header">
        <h2>JIS慣用色名クイズ</h2>
        <div className="score">
          正解: {score.correct} / {score.total}
          {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
        </div>
      </div>

      <div className="question-section">
        <p>表示されている色のJIS慣用色名を選んでください</p>
        <div className="color-sample">
          <div className="color-box" style={{ backgroundColor: rgbToCss(target.rgb) }} />
          {feedback && (
            <div className="color-info">
              <p>正解: {target.name}</p>
              <p>RGB: {target.rgb.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="relationship-selection">
        <h3>色名を選択</h3>
        <div className="relationship-buttons">
          {options.map(opt => (
            <button
              key={opt.name}
              className={`relationship-button ${selected === opt.name ? 'selected' : ''}`}
              onClick={() => setSelected(opt.name)}
              disabled={!!feedback}
            >
              <div className="relationship-name">{opt.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        {!feedback ? (
          <button onClick={handleSubmit} disabled={!canSubmit} className="submit-button">
            回答する (Enter)
          </button>
        ) : (
          <button onClick={handleNext} className="next-button">
            次の問題 (Space)
          </button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedback}`}>
          <div className="feedback-content">
            <h3>{feedback === 'correct' ? '正解！' : '不正解'}</h3>
            {feedback === 'incorrect' && selected && (
              <p>あなたの回答: {selected}</p>
            )}
            <p>正解: {target.name}</p>
            <p>カテゴリ: {GROUP_LABELS[target.group]}</p>

            {/* 他の選択肢の色も表示 */}
            <div style={{ marginTop: 16 }}>
              <h4 style={{ marginBottom: 10 }}>今回の選択肢</h4>
              <div className="relationship-buttons">
                {options.map(opt => {
                  const isAnswer = opt.name === target.name;
                  const isChosen = selected === opt.name;
                  return (
                    <div key={opt.name} className={`relationship-button ${isAnswer ? 'selected' : ''}`} style={{ cursor: 'default' }}>
                      <div className="color-box" style={{ backgroundColor: rgbToCss(opt.rgb), width: 60, height: 60, margin: '0 auto 8px' }} />
                      <div className="relationship-name">{opt.name}</div>
                      <div className="relationship-desc">
                        {isAnswer ? '正解' : isChosen ? 'あなたの選択' : '選択肢'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JisColorQuiz;
