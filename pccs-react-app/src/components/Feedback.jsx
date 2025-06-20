import React from 'react';

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

  return (
    <div className={getFeedbackClass()}>
      <div className="feedback-content">
        <h3>{getFeedbackTitle()}</h3>
        <p>{getFeedbackMessage()}</p>
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
