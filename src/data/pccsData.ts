// PCCS色彩データベース
// 各トーンと色相の組み合わせに対応するRGB値を定義

export type ToneKey = 'v' | 'b' | 's' | 'dp' | 'lt' | 'sf' | 'd' | 'dk' | 'p' | 'ltg' | 'g' | 'dkg';

export interface ToneInfo {
  name: string;
  description: string;
  hues: number;
}

export type RGB = [number, number, number];

export interface ColorResult {
  tone: ToneKey;
  hue: number;
  rgb: RGB;
  toneName: string;
  toneDescription: string;
  hueName: string;
}

export interface PCCSData {
  tones: Record<ToneKey, ToneInfo>;
  hueNames: Record<number, string>;
  twelveHues: number[];
  colors: Record<ToneKey, Record<number, RGB>>;
  getColor: (tone: ToneKey, hue: number) => RGB | null;
  rgbToCSS: (rgb: RGB) => string;
  getAvailableHues: (tone: ToneKey) => number[];
  getRandomColor: () => ColorResult;
}

export const PCCS_DATA: PCCSData = {
    // トーン定義
    tones: {
        'v': { name: 'Vivid', description: '鮮やかな色', hues: 24 },
        'b': { name: 'Bright', description: '明るい色', hues: 12 },
        's': { name: 'Strong', description: '強い色', hues: 12 },
        'dp': { name: 'Deep', description: '深い色', hues: 12 },
        'lt': { name: 'Light', description: '薄い色', hues: 12 },
        'sf': { name: 'Soft', description: 'やわらかい色', hues: 12 },
        'd': { name: 'Dull', description: 'くすんだ色', hues: 12 },
        'dk': { name: 'Dark', description: '暗い色', hues: 12 },
        'p': { name: 'Pale', description: 'うすい色', hues: 12 },
        'ltg': { name: 'Light grayish', description: '明るい灰みの色', hues: 12 },
        'g': { name: 'Grayish', description: '灰みの色', hues: 12 },
        'dkg': { name: 'Dark grayish', description: '暗い灰みの色', hues: 12 }
    },

    // 色相名（参考用）
    hueNames: {
        1: '紫みの赤', 2: '赤', 3: '黄みの赤', 4: '赤みのだいだい', 5: 'だいだい', 6: '黄みのだいだい',
        7: '赤みの黄', 8: '黄', 9: '緑みの黄', 10: '黄緑', 11: '黄みの緑', 12: '緑',
        13: '青みの緑', 14: '青緑', 15: '青緑', 16: '緑みの青', 17: '青', 18: '青',
        19: '紫みの青', 20: '青紫', 21: '青みの紫', 22: '紫', 23: '赤みの紫', 24: '赤紫'
    },

    // 12色相システム用の色相番号
    twelveHues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],

    // 色データ（RGB値）
    colors: {
        // Vivid (24色相)
        'v': {
            1: [185, 31, 87],    // 紫みの赤
            2: [208, 47, 72],    // 赤
            3: [221, 68, 59],    // 黄みの赤
            4: [233, 91, 35],    // 赤みのだいだい
            5: [230, 120, 0],    // だいだい
            6: [244, 157, 0],    // 黄みのだいだい
            7: [241, 181, 0],    // 赤みの黄
            8: [238, 201, 0],    // 黄
            9: [210, 193, 0],    // 緑みの黄
            10: [168, 187, 0],   // 黄緑
            11: [88, 169, 29],   // 黄みの緑
            12: [0, 161, 90],    // 緑
            13: [0, 146, 110],   // 青みの緑
            14: [0, 133, 127],   // 青緑
            15: [0, 116, 136],   // 青緑
            16: [0, 112, 155],   // 緑みの青
            17: [0, 96, 156],    // 青
            18: [0, 91, 165],    // 青
            19: [26, 84, 165],   // 紫みの青
            20: [83, 74, 160],   // 青紫
            21: [112, 63, 150],  // 青みの紫
            22: [129, 55, 138],  // 紫
            23: [143, 46, 124],  // 赤みの紫
            24: [173, 46, 108]   // 赤紫
        },

        // Bright (12色相)
        'b': {
            2: [239, 108, 112],   // 赤
            4: [250, 129, 85],    // 赤みのだいだい
            6: [255, 173, 54],    // 黄みのだいだい
            8: [250, 216, 49],    // 黄
            10: [183, 200, 43],   // 黄緑
            12: [65, 184, 121],   // 緑
            14: [0, 170, 159],    // 青緑
            16: [0, 152, 185],    // 緑みの青
            18: [41, 129, 192],   // 青
            20: [117, 116, 188],  // 青紫
            22: [161, 101, 168],  // 紫
            24: [208, 103, 142]   // 赤紫
        },

        // Strong (12色相)
        's': {
            2: [197, 63, 77],     // 赤
            4: [204, 87, 46],     // 赤みのだいだい
            6: [225, 146, 21],    // 黄みのだいだい
            8: [222, 188, 3],     // 黄
            10: [156, 173, 0],    // 黄緑
            12: [0, 143, 86],     // 緑
            14: [0, 130, 124],    // 青緑
            16: [0, 111, 146],    // 緑みの青
            18: [0, 91, 155],     // 青
            20: [83, 76, 152],    // 青紫
            22: [124, 61, 132],   // 紫
            24: [163, 60, 106]    // 赤紫
        },

        // Deep (12色相)
        'dp': {
            2: [166, 29, 57],     // 赤
            4: [171, 61, 29],     // 赤みのだいだい
            6: [177, 108, 0],     // 黄みのだいだい
            8: [179, 147, 0],     // 黄
            10: [116, 132, 0],    // 黄緑
            12: [0, 114, 67],     // 緑
            14: [0, 102, 100],    // 青緑
            16: [0, 84, 118],     // 緑みの青
            18: [0, 66, 128],     // 青
            20: [62, 51, 123],    // 青紫
            22: [97, 36, 105],    // 紫
            24: [134, 29, 85]     // 赤紫
        },

        // Light (12色相)
        'lt': {
            2: [246, 171, 165],   // 赤
            4: [255, 185, 158],   // 赤みのだいだい
            6: [255, 206, 144],   // 黄みのだいだい
            8: [251, 230, 143],   // 黄
            10: [216, 223, 146],  // 黄緑
            12: [156, 217, 172],  // 緑
            14: [126, 204, 193],  // 青緑
            16: [121, 186, 202],  // 緑みの青
            18: [131, 167, 200],  // 青
            20: [162, 159, 199],  // 青紫
            22: [184, 154, 184],  // 紫
            24: [218, 160, 179]   // 赤紫
        },

        // Soft (12色相)
        'sf': {
            2: [202, 130, 129],   // 赤
            4: [218, 146, 122],   // 赤みのだいだい
            6: [219, 166, 107],   // 黄みのだいだい
            8: [211, 189, 108],   // 黄
            10: [173, 182, 107],  // 黄緑
            12: [118, 177, 138],  // 緑
            14: [84, 163, 155],   // 青緑
            16: [81, 146, 164],   // 緑みの青
            18: [93, 126, 160],   // 青
            20: [120, 120, 160],  // 青紫
            22: [144, 113, 148],  // 紫
            24: [180, 120, 139]   // 赤紫
        },

        // Dull (12色相)
        'd': {
            2: [163, 90, 92],     // 赤
            4: [175, 105, 84],    // 赤みのだいだい
            6: [179, 127, 70],    // 黄みのだいだい
            8: [171, 148, 70],    // 黄
            10: [133, 143, 70],   // 黄緑
            12: [79, 135, 102],   // 緑
            14: [42, 123, 118],   // 青緑
            16: [36, 106, 125],   // 緑みの青
            18: [52, 89, 125],    // 青
            20: [84, 82, 124],    // 青紫
            22: [108, 74, 113],   // 紫
            24: [139, 79, 101]    // 赤紫
        },

        // Dark (12色相)
        'dk': {
            2: [105, 41, 52],     // 赤
            4: [117, 54, 42],     // 赤みのだいだい
            6: [121, 77, 28],     // 黄みのだいだい
            8: [116, 96, 31],     // 黄
            10: [82, 91, 32],     // 黄緑
            12: [35, 82, 58],     // 緑
            14: [0, 71, 70],      // 青緑
            16: [0, 69, 88],      // 緑みの青
            18: [18, 52, 82],     // 青
            20: [50, 45, 81],     // 青紫
            22: [67, 40, 72],     // 紫
            24: [97, 45, 70]      // 赤紫
        },

        // Pale (12色相)
        'p': {
            2: [231, 213, 212],   // 赤
            4: [233, 213, 207],   // 赤みのだいだい
            6: [246, 227, 206],   // 黄みのだいだい
            8: [239, 230, 198],   // 黄
            10: [230, 233, 198],  // 黄緑
            12: [196, 224, 203],  // 緑
            14: [191, 224, 217],  // 青緑
            16: [198, 221, 226],  // 緑みの青
            18: [194, 204, 213],  // 青
            20: [201, 202, 213],  // 青紫
            22: [208, 200, 209],  // 紫
            24: [228, 213, 217]   // 赤紫
        },

        // Light grayish (12色相)
        'ltg': {
            2: [192, 171, 170],   // 赤
            4: [193, 171, 165],   // 赤みのだいだい
            6: [206, 187, 168],   // 黄みのだいだい
            8: [198, 190, 161],   // 黄
            10: [189, 193, 162],  // 黄緑
            12: [157, 182, 165],  // 緑
            14: [152, 182, 177],  // 青緑
            16: [158, 180, 185],  // 緑みの青
            18: [155, 165, 175],  // 青
            20: [162, 162, 175],  // 青紫
            22: [171, 160, 171],  // 紫
            24: [189, 172, 176]   // 赤紫
        },

        // Grayish (12色相)
        'g': {
            2: [116, 92, 92],     // 赤
            4: [117, 92, 87],     // 赤みのだいだい
            6: [128, 108, 92],    // 黄みのだいだい
            8: [120, 111, 87],    // 黄
            10: [110, 114, 90],   // 黄緑
            12: [83, 102, 90],    // 緑
            14: [78, 103, 100],   // 青緑
            16: [79, 101, 108],   // 緑みの青
            18: [76, 87, 101],    // 青
            20: [86, 85, 102],    // 青紫
            22: [96, 82, 98],     // 紫
            24: [114, 92, 99]     // 赤紫
        },

        // Dark grayish (12色相)
        'dkg': {
            2: [62, 45, 48],      // 赤
            4: [63, 46, 44],      // 赤みのだいだい
            6: [74, 60, 50],      // 黄みのだいだい
            8: [68, 62, 48],      // 黄
            10: [61, 64, 51],     // 黄緑
            12: [42, 52, 46],     // 緑
            14: [39, 52, 52],     // 青緑
            16: [39, 52, 57],     // 緑みの青
            18: [34, 41, 51],     // 青
            20: [41, 39, 52],     // 青紫
            22: [48, 37, 49],     // 紫
            24: [61, 46, 52]      // 赤紫
        }
    },

    // 指定されたトーンと色相の色を取得
    getColor: function(tone: ToneKey, hue: number): RGB | null {
        if (this.colors[tone] && this.colors[tone][hue]) {
            return this.colors[tone][hue];
        }
        return null;
    },

    // RGB値をCSS形式に変換
    rgbToCSS: function(rgb: RGB): string {
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    },

    // 指定されたトーンで利用可能な色相番号を取得
    getAvailableHues: function(tone: ToneKey): number[] {
        if (tone === 'v') {
            return Array.from({length: 24}, (_, i) => i + 1);
        } else {
            return this.twelveHues;
        }
    },

    // ランダムな色を生成
    getRandomColor: function(): ColorResult {
        const tones = Object.keys(this.tones) as ToneKey[];
        const randomTone = tones[Math.floor(Math.random() * tones.length)];
        const availableHues = this.getAvailableHues(randomTone);
        const randomHue = availableHues[Math.floor(Math.random() * availableHues.length)];
        
        return {
            tone: randomTone,
            hue: randomHue,
            rgb: this.getColor(randomTone, randomHue)!,
            toneName: this.tones[randomTone].name,
            toneDescription: this.tones[randomTone].description,
            hueName: this.hueNames[randomHue] || `色相${randomHue}`
        };
    }
};