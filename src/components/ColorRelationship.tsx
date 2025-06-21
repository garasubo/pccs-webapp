import React, { useState, useEffect, useCallback } from 'react';
import { PCCS_DATA, ToneKey, RGB } from '../data/pccsData';

interface Relationship {
  id: string;
  name: string;
  description: string;
}

interface ColorRelationshipQuestion {
  tone: ToneKey;
  hue1: number;
  hue2: number;
  rgb1: RGB;
  rgb2: RGB;
  hueDifference: number;
  correctRelationship: string;
  toneName: string;
  hueName1: string;
  hueName2: string;
}

interface ColorRelationshipFeedback {
  type: 'correct' | 'incorrect';
  userSelection: string;
  correctAnswer: string;
  hueDifference: number;
}

interface ColorRelationshipScore {
  correct: number;
  total: number;
}

const ColorRelationship: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<ColorRelationshipQuestion | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ColorRelationshipFeedback | null>(null);
  const [score, setScore] = useState<ColorRelationshipScore>({ correct: 0, total: 0 });

  const relationships: Relationship[] = [
    { id: 'adjacent', name: '隣接色相', description: '色相差1' },
    { id: 'similar', name: '類似色相', description: '色相差2-3' },
    { id: 'medium', name: '中差色相', description: '色相差4-7' },
    { id: 'contrast', name: '対照色相', description: '色相差8-10' },
    { id: 'complementary', name: '補色色相', description: '色相差11-12' }
  ];

  // 色相差を計算（円環上の最短距離）
  const calculateHueDifference = (hue1: number, hue2: number, maxHue: number): number => {
    const diff = Math.abs(hue1 - hue2);
    return Math.min(diff, maxHue - diff);
  };

  // 色相関係を判定
  const getHueRelationship = (hueDiff: number): string => {
    if (hueDiff === 1) return 'adjacent';
    if (hueDiff >= 2 && hueDiff <= 3) return 'similar';
    if (hueDiff >= 4 && hueDiff <= 7) return 'medium';
    if (hueDiff >= 8 && hueDiff <= 10) return 'contrast';
    if (hueDiff >= 11 && hueDiff <= 12) return 'complementary';
    return 'unknown';
  };

  // 新しい問題を生成
  const generateNewQuestion = useCallback((): void => {
    const tones = Object.keys(PCCS_DATA.tones) as ToneKey[];
    const randomTone = tones[Math.floor(Math.random() * tones.length)];
    const availableHues = PCCS_DATA.getAvailableHues(randomTone);
    const maxHue = 24;
    
    // 2つの色相をランダムに選択
    const hue1 = availableHues[Math.floor(Math.random() * availableHues.length)];
    let hue2: number;
    do {
      hue2 = availableHues[Math.floor(Math.random() * availableHues.length)];
    } while (hue1 === hue2);

    const hueDiff = calculateHueDifference(hue1, hue2, maxHue);
    const correctRelationship = getHueRelationship(hueDiff);

    const rgb1 = PCCS_DATA.getColor(randomTone, hue1);
    const rgb2 = PCCS_DATA.getColor(randomTone, hue2);

    if (!rgb1 || !rgb2) {
      console.error('Failed to get colors for question');
      return;
    }

    const question: ColorRelationshipQuestion = {
      tone: randomTone,
      hue1: hue1,
      hue2: hue2,
      rgb1: rgb1,
      rgb2: rgb2,
      hueDifference: hueDiff,
      correctRelationship: correctRelationship,
      toneName: PCCS_DATA.tones[randomTone].name,
      hueName1: PCCS_DATA.hueNames[hue1] || `色相${hue1}`,
      hueName2: PCCS_DATA.hueNames[hue2] || `色相${hue2}`
    };

    setCurrentQuestion(question);
    setSelectedRelationship(null);
    setFeedback(null);
  }, []);

  // 初期化
  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // 回答処理
  const handleSubmit = useCallback((): void => {
    if (!selectedRelationship || !currentQuestion) return;

    const isCorrect = selectedRelationship === currentQuestion.correctRelationship;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    setFeedback({
      type: isCorrect ? 'correct' : 'incorrect',
      userSelection: selectedRelationship,
      correctAnswer: currentQuestion.correctRelationship,
      hueDifference: currentQuestion.hueDifference
    });
  }, [selectedRelationship, currentQuestion]);

  // 次の問題
  const handleNext = useCallback((): void => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && selectedRelationship && !feedback) {
        handleSubmit();
      } else if (e.key === ' ' && feedback) {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRelationship, feedback, handleSubmit, handleNext]);

  const handleRelationshipSelect = (relationshipId: string): void => {
    setSelectedRelationship(relationshipId);
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="color-relationship-game">
      <div className="header">
        <h2>色相関係識別</h2>
        <div className="score">
          正解: {score.correct} / {score.total} 
          {score.total > 0 && ` (${Math.round(score.correct / score.total * 100)}%)`}
        </div>
      </div>

      <div className="question-section">
        <p>同一トーン「{currentQuestion.toneName}」の2色の色相関係を答えてください</p>
        
        <div className="color-pair">
          <div className="color-sample">
            <div 
              className="color-box"
              style={{ backgroundColor: PCCS_DATA.rgbToCSS(currentQuestion.rgb1) }}
            ></div>
            <div className="color-info">
              {feedback && (
                <>
                  <p>{currentQuestion.hueName1}</p>
                  <p>色相{currentQuestion.hue1}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className="color-sample">
            <div 
              className="color-box"
              style={{ backgroundColor: PCCS_DATA.rgbToCSS(currentQuestion.rgb2) }}
            ></div>
            <div className="color-info">
              {feedback && (
                <>
                  <p>{currentQuestion.hueName2}</p>
                  <p>色相{currentQuestion.hue2}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relationship-selection">
        <h3>色相関係を選択してください</h3>
        <div className="relationship-buttons">
          {relationships.map(rel => (
            <button
              key={rel.id}
              className={`relationship-button ${selectedRelationship === rel.id ? 'selected' : ''}`}
              onClick={() => handleRelationshipSelect(rel.id)}
              disabled={!!feedback}
            >
              <div className="relationship-name">{rel.name}</div>
              <div className="relationship-desc">{rel.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        {!feedback ? (
          <button 
            onClick={handleSubmit}
            disabled={!selectedRelationship}
            className="submit-button"
          >
            回答する (Enter)
          </button>
        ) : (
          <button onClick={handleNext} className="next-button">
            次の問題 (Space)
          </button>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          <div className="feedback-content">
            <h3>{feedback.type === 'correct' ? '正解！' : '不正解'}</h3>
            <p>
              実際の色相差: {feedback.hueDifference}
            </p>
            <p>
              正解: {relationships.find(r => r.id === feedback.correctAnswer)?.name}
            </p>
            {feedback.type === 'incorrect' && (
              <p>
                あなたの回答: {relationships.find(r => r.id === feedback.userSelection)?.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorRelationship;