import React from 'react';
import { PCCS_DATA, ToneKey } from '../data/pccsData';

interface HueSelectionProps {
  selectedTone: ToneKey | null;
  selectedHue: number | null;
  onHueSelect: (hue: number) => void;
}

const HueSelection: React.FC<HueSelectionProps> = ({ selectedTone, selectedHue, onHueSelect }) => {
  if (!selectedTone) {
    return (
      <div className="hue-selection">
        <h3>色相番号を選択してください：</h3>
        <p>まずトーンを選択してください</p>
      </div>
    );
  }

  const availableHues = PCCS_DATA.getAvailableHues(selectedTone);

  return (
    <div className="hue-selection">
      <h3>色相番号を選択してください：</h3>
      <div className="hue-buttons">
        {availableHues.map(hue => (
          <button
            key={hue}
            className={`hue-btn ${selectedHue === hue ? 'selected' : ''}`}
            onClick={() => onHueSelect(hue)}
          >
            {hue}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HueSelection;