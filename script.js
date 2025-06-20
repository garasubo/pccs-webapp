// PCCS学習アプリのメインスクリプト

class PCCSStudyApp {
    constructor() {
        this.currentQuestion = null;
        this.selectedTone = null;
        this.selectedHue = null;
        this.score = {
            correct: 0,
            incorrect: 0,
            total: 0
        };
        
        this.initializeElements();
        this.bindEvents();
        this.loadScore();
        this.generateNewQuestion();
    }

    initializeElements() {
        // DOM要素の取得
        this.colorSwatch = document.getElementById('color-swatch');
        this.colorDescription = document.getElementById('color-description');
        this.toneButtons = document.querySelectorAll('.tone-btn');
        this.hueButtonsContainer = document.getElementById('hue-buttons');
        this.submitButton = document.getElementById('submit-answer');
        this.nextButton = document.getElementById('next-question');
        this.showAnswerButton = document.getElementById('show-answer');
        this.feedback = document.getElementById('feedback');
        this.feedbackTitle = document.getElementById('feedback-title');
        this.feedbackMessage = document.getElementById('feedback-message');
        this.correctAnswer = document.getElementById('correct-answer');
        
        // スコア表示要素
        this.correctCountElement = document.getElementById('correct-count');
        this.incorrectCountElement = document.getElementById('incorrect-count');
        this.accuracyElement = document.getElementById('accuracy');
    }

    bindEvents() {
        // トーンボタンのイベント
        this.toneButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectTone(e.target.dataset.tone);
            });
        });

        // アクションボタンのイベント
        this.submitButton.addEventListener('click', () => {
            this.submitAnswer();
        });

        this.nextButton.addEventListener('click', () => {
            this.generateNewQuestion();
        });

        this.showAnswerButton.addEventListener('click', () => {
            this.showAnswer();
        });
    }

    selectTone(tone) {
        // 前の選択をクリア
        this.toneButtons.forEach(btn => btn.classList.remove('selected'));
        
        // 新しい選択を設定
        this.selectedTone = tone;
        document.querySelector(`[data-tone="${tone}"]`).classList.add('selected');
        
        // 色相ボタンを生成
        this.generateHueButtons(tone);
        
        // 回答ボタンの状態を更新
        this.updateSubmitButton();
    }

    generateHueButtons(tone) {
        // 色相ボタンコンテナをクリア
        this.hueButtonsContainer.innerHTML = '';
        
        // 選択された色相をリセット
        this.selectedHue = null;
        
        // 利用可能な色相番号を取得
        const availableHues = PCCS_DATA.getAvailableHues(tone);
        
        // 色相ボタンを生成
        availableHues.forEach(hue => {
            const button = document.createElement('button');
            button.className = 'hue-btn';
            button.textContent = hue;
            button.dataset.hue = hue;
            
            button.addEventListener('click', (e) => {
                this.selectHue(parseInt(e.target.dataset.hue));
            });
            
            this.hueButtonsContainer.appendChild(button);
        });
    }

    selectHue(hue) {
        // 前の選択をクリア
        document.querySelectorAll('.hue-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 新しい選択を設定
        this.selectedHue = hue;
        document.querySelector(`[data-hue="${hue}"]`).classList.add('selected');
        
        // 回答ボタンの状態を更新
        this.updateSubmitButton();
    }

    updateSubmitButton() {
        // トーンと色相の両方が選択されている場合のみ有効化
        this.submitButton.disabled = !(this.selectedTone && this.selectedHue);
    }

    generateNewQuestion() {
        // 新しい問題を生成
        this.currentQuestion = PCCS_DATA.getRandomColor();
        
        // 色見本を表示
        const colorCSS = PCCS_DATA.rgbToCSS(this.currentQuestion.rgb);
        this.colorSwatch.style.backgroundColor = colorCSS;
        
        // 色の説明を更新
        this.colorDescription.textContent = 'この色のトーンと色相番号を答えてください';
        
        // 選択状態をリセット
        this.resetSelections();
        
        // フィードバックを非表示
        this.feedback.style.display = 'none';
        
        // ボタンの状態をリセット
        this.submitButton.style.display = 'inline-block';
        this.nextButton.style.display = 'none';
        this.showAnswerButton.style.display = 'inline-block';
        
        console.log('新しい問題:', this.currentQuestion); // デバッグ用
    }

    resetSelections() {
        // トーン選択をリセット
        this.selectedTone = null;
        this.toneButtons.forEach(btn => btn.classList.remove('selected'));
        
        // 色相選択をリセット
        this.selectedHue = null;
        this.hueButtonsContainer.innerHTML = '';
        
        // 回答ボタンを無効化
        this.updateSubmitButton();
    }

    submitAnswer() {
        if (!this.selectedTone || !this.selectedHue) {
            return;
        }

        const isCorrect = (
            this.selectedTone === this.currentQuestion.tone &&
            this.selectedHue === this.currentQuestion.hue
        );

        // スコアを更新
        this.score.total++;
        if (isCorrect) {
            this.score.correct++;
        } else {
            this.score.incorrect++;
        }

        // フィードバックを表示
        this.showFeedback(isCorrect);
        
        // スコア表示を更新
        this.updateScoreDisplay();
        
        // スコアを保存
        this.saveScore();
        
        // ボタンの状態を更新
        this.submitButton.style.display = 'none';
        this.nextButton.style.display = 'inline-block';
        this.showAnswerButton.style.display = 'none';
    }

    showFeedback(isCorrect) {
        this.feedback.style.display = 'block';
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        if (isCorrect) {
            this.feedbackTitle.textContent = '正解！';
            this.feedbackMessage.textContent = 'よくできました！';
        } else {
            this.feedbackTitle.textContent = '不正解';
            this.feedbackMessage.textContent = '正しい答えを確認してください。';
        }
        
        // 正解を表示
        this.correctAnswer.innerHTML = `
            <strong>正解:</strong><br>
            トーン: ${this.currentQuestion.toneName} (${this.currentQuestion.tone})<br>
            色相番号: ${this.currentQuestion.hue}<br>
            色相名: ${this.currentQuestion.hueName}
        `;
    }

    showAnswer() {
        // 正解を表示（ヒント機能）
        this.feedback.style.display = 'block';
        this.feedback.className = 'feedback';
        this.feedbackTitle.textContent = '答え';
        this.feedbackMessage.textContent = '正解は以下の通りです：';
        
        this.correctAnswer.innerHTML = `
            <strong>正解:</strong><br>
            トーン: ${this.currentQuestion.toneName} (${this.currentQuestion.tone})<br>
            色相番号: ${this.currentQuestion.hue}<br>
            色相名: ${this.currentQuestion.hueName}<br>
            <small>※この問題はスコアに含まれません</small>
        `;
        
        // ボタンの状態を更新
        this.submitButton.style.display = 'none';
        this.nextButton.style.display = 'inline-block';
        this.showAnswerButton.style.display = 'none';
    }

    updateScoreDisplay() {
        this.correctCountElement.textContent = this.score.correct;
        this.incorrectCountElement.textContent = this.score.incorrect;
        
        const accuracy = this.score.total > 0 
            ? Math.round((this.score.correct / this.score.total) * 100)
            : 0;
        this.accuracyElement.textContent = `${accuracy}%`;
    }

    saveScore() {
        // ローカルストレージにスコアを保存
        localStorage.setItem('pccs-study-score', JSON.stringify(this.score));
    }

    loadScore() {
        // ローカルストレージからスコアを読み込み
        const savedScore = localStorage.getItem('pccs-study-score');
        if (savedScore) {
            this.score = JSON.parse(savedScore);
        }
        this.updateScoreDisplay();
    }

    // スコアをリセットする機能（将来の拡張用）
    resetScore() {
        this.score = {
            correct: 0,
            incorrect: 0,
            total: 0
        };
        this.updateScoreDisplay();
        this.saveScore();
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    const app = new PCCSStudyApp();
    
    // グローバルスコープに追加（デバッグ用）
    window.pccsApp = app;
});

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !document.getElementById('submit-answer').disabled) {
        document.getElementById('submit-answer').click();
    } else if (e.key === ' ' && document.getElementById('next-question').style.display !== 'none') {
        e.preventDefault();
        document.getElementById('next-question').click();
    }
});
