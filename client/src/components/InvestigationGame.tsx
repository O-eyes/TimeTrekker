
import { useState, useEffect } from 'react';
import { PlayerClass, Location } from '@/types/game';

interface InvestigationGameProps {
  playerClass: PlayerClass;
  location: Location;
  onComplete: (success: boolean) => void;
}

const InvestigationGame = ({ playerClass, location, onComplete }: InvestigationGameProps) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [cluesFound, setCluesFound] = useState(0);
  
  const getClassSpecificChallenge = () => {
    switch (playerClass) {
      case 'Time Mage':
        return (
          <div className="space-y-4">
            <h3 className="text-lg text-nexus-cyan">Temporal Energy Pattern Match</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array(9).fill(0).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePatternClick(i)}
                  className="w-full aspect-square bg-nexus-dark/50 hover:bg-nexus-accent/50 rounded border border-nexus-accent/50"
                />
              ))}
            </div>
          </div>
        );
      
      case 'Historian':
        return (
          <div className="space-y-4">
            <h3 className="text-lg text-nexus-cyan">Historical Document Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div 
                  key={i}
                  onClick={() => handleDocumentClick(i)}
                  className="p-4 bg-nexus-dark/50 hover:bg-nexus-accent/50 rounded border border-nexus-accent/50 cursor-pointer"
                >
                  <p className="text-sm text-nexus-light">Document Fragment {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Paradox Warrior':
        return (
          <div className="space-y-4">
            <h3 className="text-lg text-nexus-cyan">Timeline Defense Simulation</h3>
            <div className="relative h-48 bg-nexus-dark/50 rounded border border-nexus-accent/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2">
                  {Array(6).fill(0).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleThreatClick(i)}
                      className="px-4 py-2 bg-nexus-accent/30 hover:bg-nexus-accent/50 rounded text-nexus-cyan"
                    >
                      Clear Threat
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const handlePatternClick = (index: number) => {
    setCluesFound(prev => Math.min(prev + 1, 5));
  };

  const handleDocumentClick = (index: number) => {
    setCluesFound(prev => Math.min(prev + 1, 5));
  };

  const handleThreatClick = (index: number) => {
    setCluesFound(prev => Math.min(prev + 1, 5));
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            onComplete(cluesFound >= 3);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState, onComplete, cluesFound]);

  if (gameState === 'ready') {
    return (
      <div className="p-6 bg-nexus-primary/90 rounded-lg">
        <h2 className="text-xl text-white mb-4">Investigate {location.name}</h2>
        <p className="text-nexus-light mb-6">{location.description}</p>
        <button
          onClick={() => setGameState('playing')}
          className="px-4 py-2 bg-nexus-accent text-white rounded hover:bg-nexus-accent/80"
        >
          Begin Investigation
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-nexus-primary/90 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-nexus-cyan">Time Remaining: {timeRemaining}s</div>
        <div className="text-nexus-yellow">Clues: {cluesFound}/5</div>
      </div>
      
      {getClassSpecificChallenge()}
    </div>
  );
};

export default InvestigationGame;
