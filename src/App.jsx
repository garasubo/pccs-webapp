import React, { useState, useEffect, useCallback } from 'react';
import { PCCS_DATA } from './data/pccsData';
import { useScore } from './hooks/useScore';
import Header from './components/Header';
import ColorDisplay from './components/ColorDisplay';
import ToneSelection from './components/ToneSelection';
import HueSelection from './components/HueSelection';
import ActionButtons from './components/ActionButtons';
import Feedback from './components/Feedback';
import ReferencePanel from './components/ReferencePanel';
import ColorCircle from './components/ColorCircle';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('game');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedTone, setSelectedTone] = useState(null);
  const [selectedHue, setSelectedHue] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const { score, updateScore, getAccuracy } = useScore();

  // Generate new question
  const generateNewQuestion = useCallback(() => {
    const newQuestion = PCCS_DATA.getRandomColor();
    setCurrentQuestion(newQuestion);
    setSelectedTone(null);
    setSelectedHue(null);
    setFeedback(null);
    console.log('新しい問題:', newQuestion); // デバッグ用
  }, []);

  // Initialize with first question
  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // Handle tone selection
  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setSelectedHue(null); // Reset hue selection when tone changes
  };

  // Handle hue selection
  const handleHueSelect = (hue) => {
    setSelectedHue(hue);
  };

  // Handle answer submission
  const handleSubmit = useCallback(() => {
    if (!selectedTone || !selectedHue || !currentQuestion) return;

    const isCorrect = (
      selectedTone === currentQuestion.tone &&
      selectedHue === currentQuestion.hue
    );

    updateScore(isCorrect);
    setFeedback({
      type: isCorrect ? 'correct' : 'incorrect',
      userSelection: {
        tone: selectedTone,
        hue: selectedHue
      }
    });
  }, [selectedTone, selectedHue, currentQuestion, updateScore]);

  // Handle show answer (hint)
  const handleShowAnswer = () => {
    setFeedback({
      type: 'hint'
    });
  };

  // Handle next question
  const handleNext = useCallback(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && selectedTone && selectedHue && !feedback) {
        handleSubmit();
      } else if (e.key === ' ' && feedback) {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedTone, selectedHue, feedback, handleSubmit, handleNext]);

  if (currentView === 'circle') {
    return (
      <div className="container">
        <div className="navigation">
          <button onClick={() => setCurrentView('game')} className="nav-button">
            ← Back to Game
          </button>
        </div>
        <ColorCircle />
      </div>
    );
  }

  return (
    <div className="container">
      <Header score={score} accuracy={getAccuracy()} />
      
      <div className="navigation">
        <button onClick={() => setCurrentView('circle')} className="nav-button">
          View Color Circle
        </button>
      </div>
      
      <main className="main-content">
        <ColorDisplay currentQuestion={currentQuestion} />
        
        <div className="answer-section">
          <ToneSelection 
            selectedTone={selectedTone}
            onToneSelect={handleToneSelect}
          />
          
          <HueSelection 
            selectedTone={selectedTone}
            selectedHue={selectedHue}
            onHueSelect={handleHueSelect}
          />
          
          <ActionButtons 
            selectedTone={selectedTone}
            selectedHue={selectedHue}
            showFeedback={!!feedback}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onShowAnswer={handleShowAnswer}
          />
        </div>

        <Feedback 
          feedback={feedback}
          currentQuestion={currentQuestion}
        />
      </main>

      <ReferencePanel />
    </div>
  );
}

export default App;
