import React, { useState } from 'react';
import { PCCS_DATA } from '../data/pccsData';

function ColorCircle() {
  const [selectedTone, setSelectedTone] = useState('v');

  const getToneColors = (tone) => {
    const colors = PCCS_DATA.colors[tone];
    if (!colors) return [];

    const isVivid = tone === 'v';
    const hues = isVivid ? 
      Array.from({length: 24}, (_, i) => i + 1) : 
      PCCS_DATA.twelveHues;

    return hues.map(hue => ({
      hue,
      rgb: colors[hue] || [128, 128, 128],
      name: PCCS_DATA.hueNames[hue] || `${hue}`
    }));
  };

  const renderColorCircle = () => {
    const colors = getToneColors(selectedTone);
    const radius = 150;
    const textRadius = 180;
    const centerX = 200;
    const centerY = 200;

    return (
      <svg width="400" height="400" className="color-circle-svg">
        {colors.map((color, index) => {
          const angle = (index * 360 / colors.length) - 90;
          const radian = (angle * Math.PI) / 180;
          const x = centerX + radius * Math.cos(radian);
          const y = centerY + radius * Math.sin(radian);
          const textX = centerX + textRadius * Math.cos(radian);
          const textY = centerY + textRadius * Math.sin(radian);
          
          return (
            <g key={color.hue}>
              <circle
                cx={x}
                cy={y}
                r="20"
                fill={`rgb(${color.rgb.join(',')})`}
                stroke="#333"
                strokeWidth="2"
                title={`${color.hue}: ${color.name}`}
              />
              <text
                x={textX}
                y={textY + 5}
                textAnchor="middle"
                fontSize="14"
                fill="#333"
                fontWeight="bold"
              >
                {color.hue}
              </text>
            </g>
          );
        })}
        
        <circle
          cx={centerX}
          cy={centerY}
          r="50"
          fill="white"
          stroke="#333"
          strokeWidth="3"
        />
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#333"
        >
          {selectedTone.toUpperCase()}
        </text>
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          fontSize="12"
          fill="#666"
        >
          {PCCS_DATA.tones[selectedTone]?.name}
        </text>
      </svg>
    );
  };

  return (
    <div className="color-circle-container">
      <h1>PCCS Color Circle</h1>
      
      <div className="tone-selector">
        <label htmlFor="tone-select">Select Tone: </label>
        <select 
          id="tone-select"
          value={selectedTone} 
          onChange={(e) => setSelectedTone(e.target.value)}
        >
          {Object.entries(PCCS_DATA.tones).map(([key, tone]) => (
            <option key={key} value={key}>
              {key.toUpperCase()} - {tone.name}
            </option>
          ))}
        </select>
      </div>

      <div className="circle-display">
        {renderColorCircle()}
      </div>

      <div className="color-info">
        <h3>Tone Information</h3>
        <p><strong>{PCCS_DATA.tones[selectedTone]?.name}</strong>: {PCCS_DATA.tones[selectedTone]?.description}</p>
        <p>Hue Count: {PCCS_DATA.tones[selectedTone]?.hues} hues</p>
        
        <h3>Hue Reference</h3>
        <div className="hue-table">
          {getToneColors(selectedTone).map((color) => (
            <div key={color.hue} className="hue-row">
              <span className="hue-number">{color.hue}:</span>
              <span className="hue-name">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorCircle;