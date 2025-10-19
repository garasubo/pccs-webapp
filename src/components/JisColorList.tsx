import React, { useMemo } from 'react';
import { JIS_COLORS, JisColor, rgbToCss } from '../data/jisColors';

const GROUP_ORDER: JisColor['group'][] = [
  'red',
  'orange',
  'yellow',
  'yellowgreen',
  'green',
  'bluegreen',
  'blue',
  'bluepurple',
  'purple',
  'pink',
  'brown',
  'gray',
  'black',
  'white'
];

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
  white: '無彩色系'
};

const JisColorList: React.FC = () => {
  const groupedColors = useMemo(() => {
    const groups = new Map<JisColor['group'], JisColor[]>();
    for (const color of JIS_COLORS) {
      if (!groups.has(color.group)) {
        groups.set(color.group, []);
      }
      groups.get(color.group)?.push(color);
    }

    for (const colorGroup of groups.values()) {
      colorGroup.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    }

    return groups;
  }, []);

  return (
    <div className="jis-color-page">
      <header className="jis-color-header">
        <div>
          <h2>JIS慣用色名一覧</h2>
          <p className="jis-color-subtitle">色名とおおまかなRGB値を参照できます</p>
        </div>
      </header>

      <div className="jis-color-description">
        <p>
          日本工業規格（JIS）で定められた慣用色名の一部をカテゴリごとに整理しています。
          各色のスウォッチとRGB値を学習や資料作成の参考にしてください。
        </p>
      </div>

      {GROUP_ORDER.filter(group => groupedColors.has(group)).map(group => {
        const colors = groupedColors.get(group);
        if (!colors || colors.length === 0) return null;
        return (
          <section key={group} className="jis-color-section">
            <h3 className="jis-color-heading">{GROUP_LABELS[group]}</h3>
            <div className="jis-color-grid">
              {colors.map(color => (
                <div key={color.name} className="jis-color-card">
                  <div
                    className="jis-color-swatch"
                    style={{ backgroundColor: rgbToCss(color.rgb) }}
                    aria-label={`${color.name}の色見本`}
                  />
                  <div className="jis-color-meta">
                    <span className="jis-color-name">{color.name}</span>
                    <span className="jis-color-rgb">RGB: {color.rgb.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default JisColorList;
