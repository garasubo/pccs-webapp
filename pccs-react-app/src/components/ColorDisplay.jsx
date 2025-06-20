import React from 'react';
import { PCCS_DATA } from '../data/pccsData';

const ColorDisplay = ({ currentQuestion }) => {
  if (!currentQuestion) {
    return (
      <div className="color-display">
        <div className="color-swatch" style={{ backgroundColor: '#f0f0f0' }}></div>
        <div className="color-info">
          <p>色を表示中...</p>
        </div>
      </div>
    );
  }

  const colorCSS = PCCS_DATA.rgbToCSS(currentQuestion.rgb);

  return (
    <div className="color-display">
      <div 
        className="color-swatch" 
        style={{ backgroundColor: colorCSS }}
      ></div>
      <div className="color-info">
        <p>この色のトーンと色相番号を答えてください</p>
      </div>
    </div>
  );
};

export default ColorDisplay;
