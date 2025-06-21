import React from 'react';
import { ToneKey } from '../data/pccsData';

interface ActionButtonsProps {
  selectedTone: ToneKey | null;
  selectedHue: number | null;
  showFeedback: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onShowAnswer: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  selectedTone, 
  selectedHue, 
  showFeedback, 
  onSubmit, 
  onNext, 
  onShowAnswer 
}) => {
  const canSubmit = selectedTone && selectedHue && !showFeedback;

  return (
    <div className="action-buttons">
      {!showFeedback ? (
        <>
          <button 
            className="submit-btn" 
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            回答する
          </button>
          <button 
            className="hint-btn"
            onClick={onShowAnswer}
          >
            答えを見る
          </button>
        </>
      ) : (
        <button 
          className="next-btn"
          onClick={onNext}
        >
          次の問題
        </button>
      )}
    </div>
  );
};

export default ActionButtons;