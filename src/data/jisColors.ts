// JIS慣用色名（抜粋）データセット
// 色彩検定の初中級でよく扱われる代表的な色名を中心に、
// 学習用としておおまかなRGBを付与しています。

export type JisColor = {
  name: string; // 慣用色名（日本語）
  rgb: [number, number, number];
  group: 'red' | 'orange' | 'yellow' | 'yellowgreen' | 'green' | 'bluegreen' | 'blue' | 'bluepurple' | 'purple' | 'pink' | 'brown' | 'gray' | 'black' | 'white';
};

export const JIS_COLORS: JisColor[] = [
  // red (公式リストに合わせて更新)
  { name: '鴇色', rgb: [243, 166, 150], group: 'red' },
  { name: '韓紅花', rgb: [255, 51, 141], group: 'red' },
  { name: '蘇芳', rgb: [168, 69, 98], group: 'red' },
  { name: '鳶色', rgb: [122, 56, 15], group: 'red' },
  { name: '弁柄色', rgb: [143, 46, 20], group: 'red' },
  { name: '海老茶', rgb: [107, 31, 26], group: 'red' },
  { name: 'ローズピンク', rgb: [241, 156, 187], group: 'red' },
  { name: 'バーガンディー', rgb: [86,22, 32], group: 'red' },
  { name: 'オールドローズ', rgb: [192, 128, 129], group: 'red' },
  { name: 'ポピーレッド', rgb: [227, 60, 62], group: 'red' },
  { name: 'マルーン', rgb: [106, 24, 22], group: 'red' },
  { name: 'テラコッタ', rgb: [190, 109, 85], group: 'red' },

  // orange (公式リストに合わせて更新)
  { name: '黄丹', rgb: [252, 89, 0], group: 'orange' },
  { name: '桧皮色', rgb: [143, 90, 60], group: 'orange' },
  { name: '代赭', rgb: [160, 90, 44], group: 'orange' },
  { name: 'バーントシェンナ', rgb: [165, 87, 64], group: 'orange' },
  { name: '柑子色', rgb: [240, 130, 0], group: 'orange' },
  { name: 'ローシェンナ', rgb: [214, 138, 89], group: 'orange' },
  { name: 'タン', rgb: [192, 129, 63], group: 'orange' },

  // yellow (公式リストに合わせて更新)
  { name: '琥珀色', rgb: [191, 124, 48], group: 'yellow' },
  { name: '朽葉色', rgb: [137, 120, 88], group: 'yellow' },
  { name: '鬱金色', rgb: [230, 180, 34], group: 'yellow' },
  { name: '刈安色', rgb: [216, 203, 94], group: 'yellow' },
  { name: 'エクルベイジュ', rgb: [230, 216, 190], group: 'yellow' },
  { name: 'ゴールデンイエロー', rgb: [248, 184, 86], group: 'yellow' },
  { name: 'アンバー', rgb: [191, 144, 5], group: 'yellow' },
  { name: 'バーントアンバー', rgb: [122, 94, 61], group: 'yellow' },
  { name: 'ローアンバー', rgb: [145, 111, 36], group: 'yellow' },
  { name: 'ネープルスイエロー', rgb: [253, 215, 92], group: 'yellow' },
  { name: 'ジョンブリアン', rgb: [255, 202, 40], group: 'yellow' },

  // yellowgreen (追加)
  { name: '黄蘗色', rgb: [254, 242, 99], group: 'yellowgreen' },
  { name: '海松色', rgb: [88, 97, 46], group: 'yellowgreen' },
  { name: '鶸色', rgb: [208, 214, 98], group: 'yellowgreen' },
  { name: 'シャトルーズグリーン', rgb: [217, 227, 103], group: 'yellowgreen' },
  { name: 'リーフグリーン', rgb: [157, 192, 76], group: 'yellowgreen' },
  { name: 'グラスグリーン', rgb: [123, 141, 65], group: 'yellowgreen' },

  // green
  { name: '常磐色', rgb: [0, 100, 40], group: 'green' },
  { name: '緑青色', rgb: [91, 173, 146], group: 'green' },
  { name: 'アップルグリーン', rgb: [162, 204, 137], group: 'green' },
  { name: 'ミントグリーン', rgb: [152, 206, 151], group: 'green' },
  { name: 'マラカイトグリーン', rgb: [0, 152, 84], group: 'green' },
  { name: 'ボトルグリーン', rgb: [0, 86, 53], group: 'green' },

  // bluegreen (追加)
  { name: '鉄色', rgb: [16, 46, 36], group: 'bluegreen' },
  { name: 'ピーコックグリーン', rgb: [0, 164, 150], group: 'bluegreen' },
  { name: 'ナイルブルー', rgb: [37, 159, 148], group: 'bluegreen' },

  // blue (公式リストに合わせて更新)
  { name: '新橋色', rgb: [89, 185, 198], group: 'blue' },
  { name: '納戸色', rgb: [0, 136, 153], group: 'blue' },
  { name: '甕覗き', rgb: [197, 228, 237], group: 'blue' },
  { name: '縹色', rgb: [42, 131, 162], group: 'blue' },
  { name: 'サックスブルー', rgb: [79, 111, 168], group: 'blue' },
  { name: 'セルリアンブルー', rgb: [0, 123, 167], group: 'blue' },
  { name: 'ミッドナイトブルー', rgb: [0, 29, 66], group: 'blue' },

  // purple (公式リストに合わせて更新)
  { name: '江戸紫', rgb: [116, 83, 153], group: 'purple' },
  { name: '古代紫', rgb: [140, 101, 137], group: 'purple' },
  { name: 'ライラック', rgb: [209, 186, 218], group: 'purple' },

  // bluepurple (青紫)
  { name: '藤色', rgb: [186, 167, 204], group: 'bluepurple' },
  { name: 'ウイスタリア', rgb: [142, 139, 194], group: 'bluepurple' },

  // gray / achromatic
  { name: '銀鼠', rgb: [168, 168, 168], group: 'gray' },
  { name: '茶鼠', rgb: [158, 143, 128], group: 'gray' },
  { name: '利休鼠', rgb: [136, 142, 126], group: 'gray' },
  { name: '煤竹色', rgb: [111, 97, 84], group: 'gray' },
  { name: 'スレートグレイ', rgb: [99, 96, 98], group: 'gray' },
  { name: 'ランプブラック', rgb: [36, 19, 13], group: 'gray' },
];

export const rgbToCss = (rgb: [number, number, number]): string => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

export const colorDistance = (a: [number, number, number], b: [number, number, number]): number => {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

// 選択肢生成: 正解 + グループが異なり、かつ色距離が十分に離れた候補を選ぶ
export function buildOptions(correct: JisColor, all: JisColor[], optionCount = 4): JisColor[] {
  const candidates = all.filter(c => c.name !== correct.name && c.group !== correct.group);
  // 遠い順に並べる
  const sorted = candidates.sort((a, b) => colorDistance(b.rgb, correct.rgb) - colorDistance(a.rgb, correct.rgb));
  const distractors: JisColor[] = [];
  const minDistance = 90; // RGB距離のしきい値（近すぎる色名を避ける）

  for (const c of sorted) {
    if (distractors.length >= optionCount - 1) break;
    const farEnough = colorDistance(c.rgb, correct.rgb) >= minDistance;
    const nameTooSimilar = c.name.replace(/[色色]/g, '').slice(0, 1) === correct.name.replace(/[色色]/g, '').slice(0, 1);
    if (farEnough && !nameTooSimilar) {
      distractors.push(c);
    }
  }

  const options = [correct, ...distractors.slice(0, optionCount - 1)];
  // シャッフル
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
