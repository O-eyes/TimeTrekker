import { useState, useEffect } from 'react';
import { Location } from '@/types/game';

interface Location {
  name: string;
  // Add other relevant location properties as needed
}

interface InvestigationGameProps {
  location: Location;
  playerClass: string;
  onComplete: (success: boolean) => void;
}

export default function InvestigationGame({ location, playerClass, onComplete }: InvestigationGameProps) {
  const [clues, setClues] = useState<string[]>([]);
  const [selectedClues, setSelectedClues] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    // Generate random clues based on location
    setClues([
      `Strange markings on ${location.name} walls`,
      'Temporal energy readings',
      'Displaced artifacts',
      'Witness accounts',
      'Historical documents'
    ]);

    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const selectClue = (clue: string) => {
    setSelectedClues(prev => [...prev, clue]);
    if (selectedClues.length >= 2) {
      onComplete(true);
    }
  };

  return (
    <div className="bg-nexus-dark/90 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-nexus-cyan text-xl">Investigation: {location.name}</h2>
        <span className="text-nexus-accent">Time: {timeRemaining}s</span>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {clues.map((clue, index) => (
          <button
            key={index}
            onClick={() => selectClue(clue)}
            disabled={selectedClues.includes(clue)}
            className={`p-3 text-left rounded ${
              selectedClues.includes(clue)
                ? 'bg-nexus-accent/50 text-nexus-light'
                : 'bg-nexus-secondary hover:bg-nexus-accent/30 text-white'
            }`}
          >
            {clue}
          </button>
        ))}
      </div>

      <div className="text-nexus-light text-sm">
        Find and collect relevant clues before time runs out!
      </div>
    </div>
  );
}