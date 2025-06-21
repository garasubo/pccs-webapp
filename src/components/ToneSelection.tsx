import React from 'react';
import { PCCS_DATA, ToneKey } from '../data/pccsData';

interface ToneSelectionProps {
  selectedTone: ToneKey | null;
  onToneSelect: (tone: ToneKey) => void;
}

const ToneSelection: React.FC<ToneSelectionProps> = ({ selectedTone, onToneSelect }) => {
  const tones = Object.entries(PCCS_DATA.tones) as [ToneKey, typeof PCCS_DATA.tones[ToneKey]][];

  return (
    <div className="tone-selection">
      <h3>トーンを選択してください：</h3>
      <div className="tone-buttons">
        {tones.map(([toneKey, toneData]) => (
          <button
            key={toneKey}
            className={`tone-btn ${selectedTone === toneKey ? 'selected' : ''}`}
            onClick={() => onToneSelect(toneKey)}
          >
            {toneData.name} ({toneKey})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelection;