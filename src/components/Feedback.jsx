import React from 'react';
import { PCCS_DATA } from '../data/pccsData';

const Feedback = ({ feedback, currentQuestion }) => {
  if (!feedback || !currentQuestion) {
    return null;
  }

  const getFeedbackClass = () => {
    if (feedback.type === 'correct') return 'feedback correct';
    if (feedback.type === 'incorrect') return 'feedback incorrect';
    return 'feedback';
  };

  const getFeedbackTitle = () => {
    if (feedback.type === 'correct') return '正解！';
    if (feedback.type === 'incorrect') return '不正解';
    return '答え';
  };

  const getFeedbackMessage = () => {
    if (feedback.type === 'correct') return 'よくできました！';
    if (feedback.type === 'incorrect') return '正しい答えを確認してください。';
    return '正解は以下の通りです：';
  };

  // Get the correct color for display when answer is incorrect
  const getCorrectColorCSS = () => {
    if (currentQuestion && currentQuestion.rgb) {
      return PCCS_DATA.rgbToCSS(currentQuestion.rgb);
    }
    return null;
  };

  // Get the user's selected color for display when answer is incorrect
  const getUserSelectedColorCSS = () => {
    if (feedback.userSelection && feedback.userSelection.tone && feedback.userSelection.hue) {
      const userRgb = PCCS_DATA.getColor(feedback.userSelection.tone, feedback.userSelection.hue);
      if (userRgb) {
        return PCCS_DATA.rgbToCSS(userRgb);
      }
    }
    return null;
  };

  // Get user selection info for display
  const getUserSelectionInfo = () => {
    if (feedback.userSelection && feedback.userSelection.tone && feedback.userSelection.hue) {
      const tone = feedback.userSelection.tone;
      const hue = feedback.userSelection.hue;
      const toneName = PCCS_DATA.tones[tone]?.name || tone;
      const hueName = PCCS_DATA.hueNames[hue] || `色相${hue}`;
      
      return {
        tone,
        toneName,
        hue,
        hueName
      };
    }
    return null;
  };

  return (
    <div className={getFeedbackClass()}>
      <div className="feedback-content">
        <h3>{getFeedbackTitle()}</h3>
        <p>{getFeedbackMessage()}</p>
        
        {/* Show color comparison for incorrect answers */}
        {feedback.type === 'incorrect' && (
          <div className="color-comparison">
            <div className="color-comparison-item">
              <div className="color-comparison-label">あなたの選択:</div>
              <div 
                className="color-comparison-swatch"
                style={{ backgroundColor: getUserSelectedColorCSS() }}
              ></div>
              {getUserSelectionInfo() && (
                <div className="color-comparison-info">
                  {getUserSelectionInfo().toneName} ({getUserSelectionInfo().tone})<br />
                  色相{getUserSelectionInfo().hue}: {getUserSelectionInfo().hueName}
                </div>
              )}
            </div>
            
            <div className="color-comparison-item">
              <div className="color-comparison-label">正解の色:</div>
              <div 
                className="color-comparison-swatch"
                style={{ backgroundColor: getCorrectColorCSS() }}
              ></div>
              <div className="color-comparison-info">
                {currentQuestion.toneName} ({currentQuestion.tone})<br />
                色相{currentQuestion.hue}: {currentQuestion.hueName}
              </div>
            </div>
          </div>
        )}
        
        <div className="correct-answer">
          <strong>正解:</strong><br />
          トーン: {currentQuestion.toneName} ({currentQuestion.tone})<br />
          色相番号: {currentQuestion.hue}<br />
          色相名: {currentQuestion.hueName}
          {feedback.type === 'hint' && (
            <><br /><small>※この問題はスコアに含まれません</small></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
