import React, { useState, useEffect, useCallback } from 'react';
import { PCCS_DATA, ColorResult, ToneKey } from './data/pccsData';
import { useScore, Score } from './hooks/useScore';
import Header from './components/Header';
import ColorDisplay from './components/ColorDisplay';
import ToneSelection from './components/ToneSelection';
import HueSelection from './components/HueSelection';
import ActionButtons from './components/ActionButtons';
import Feedback from './components/Feedback';
import ReferencePanel from './components/ReferencePanel';
import ColorCircle from './components/ColorCircle';
import ColorRelationship from './components/ColorRelationship';
import './App.css';

export type ViewType = 'game' | 'circle' | 'relationship';

export interface FeedbackData {
  type: 'correct' | 'incorrect' | 'hint';
  userSelection?: {
    tone: ToneKey;
    hue: number;
  };
}

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('game');
  const [currentQuestion, setCurrentQuestion] = useState<ColorResult | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneKey | null>(null);
  const [selectedHue, setSelectedHue] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const { score, updateScore, getAccuracy } = useScore();

  // Generate new question
  const generateNewQuestion = useCallback((): void => {
    const newQuestion = PCCS_DATA.getRandomColor();
    setCurrentQuestion(newQuestion);
    setSelectedTone(null);
    setSelectedHue(null);
    setFeedback(null);
    console.log('新しい問題:', newQuestion);
  }, []);

  // Initialize with first question
  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // Handle tone selection
  const handleToneSelect = (tone: ToneKey): void => {
    setSelectedTone(tone);
    setSelectedHue(null); // Reset hue selection when tone changes
  };

  // Handle hue selection
  const handleHueSelect = (hue: number): void => {
    setSelectedHue(hue);
  };

  // Handle answer submission
  const handleSubmit = useCallback((): void => {
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
  const handleShowAnswer = (): void => {
    setFeedback({
      type: 'hint'
    });
  };

  // Handle next question
  const handleNext = useCallback((): void => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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

  const handleViewChange = (view: ViewType): void => {
    setCurrentView(view);
  };

  if (currentView === 'circle') {
    return (
      <div className="container">
        <div className="navigation">
          <button onClick={() => handleViewChange('game')} className="nav-button">
            ← Back to Game
          </button>
        </div>
        <ColorCircle />
      </div>
    );
  }

  if (currentView === 'relationship') {
    return (
      <div className="container">
        <div className="navigation">
          <button onClick={() => handleViewChange('game')} className="nav-button">
            ← Back to Game
          </button>
        </div>
        <ColorRelationship />
      </div>
    );
  }

  return (
    <div className="container">
      <Header score={score} accuracy={getAccuracy()} />
      
      <div className="navigation">
        <button onClick={() => handleViewChange('circle')} className="nav-button">
          View Color Circle
        </button>
        <button onClick={() => handleViewChange('relationship')} className="nav-button">
          Color Relationship Game
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