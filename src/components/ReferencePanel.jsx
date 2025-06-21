import React from 'react';
import { PCCS_DATA } from '../data/pccsData';

const ReferencePanel = () => {
  const tones = Object.entries(PCCS_DATA.tones);

  return (
    <aside className="reference-panel">
      <h3>PCCS参考資料</h3>
      <div className="reference-content">
        <h4>12のトーン</h4>
        <ul className="tone-list">
          {tones.map(([toneKey, toneData]) => (
            <li key={toneKey}>
              <strong>{toneData.name} ({toneKey})</strong>: {toneData.description}
            </li>
          ))}
        </ul>
        <h4>色相番号</h4>
        <p><strong>Vivid:</strong> 1-24 (24色相)</p>
        <p><strong>その他:</strong> 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 (12色相)</p>
      </div>
    </aside>
  );
};

export default ReferencePanel;
