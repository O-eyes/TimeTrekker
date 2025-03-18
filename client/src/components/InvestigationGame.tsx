
import { useState, useEffect } from 'react';
import { Search, Clock, AlertTriangle } from 'lucide-react';

interface Clue {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  found: boolean;
}

interface InvestigationGameProps {
  eraId: string;
  useEnergy: (amount: number) => boolean;
  onClueFound: (clue: Clue) => void;
  onInvestigationComplete: () => void;
}

const InvestigationGame = ({ eraId, useEnergy, onClueFound, onInvestigationComplete }: InvestigationGameProps) => {
  const [clues, setClues] = useState<Clue[]>([]);
  const [searchArea, setSearchArea] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Initialize search grid and clues
    const grid = Array(6).fill(null).map(() => 
      Array(6).fill(0).map(() => Math.random() * 100)
    );
    setSearchArea(grid);

    // Generate clues based on era
    const newClues: Clue[] = [
      {
        id: `${eraId}-1`,
        name: 'Mysterious Artifact',
        description: 'An object that seems out of place in this timeline.',
        difficulty: 3,
        found: false
      },
      {
        id: `${eraId}-2`,
        name: 'Timeline Distortion',
        description: 'A noticeable anomaly in the temporal field.',
        difficulty: 2,
        found: false
      },
      {
        id: `${eraId}-3`,
        name: 'Historical Document',
        description: 'Contains important information about local events.',
        difficulty: 1,
        found: false
      }
    ];
    setClues(newClues);
  }, [eraId]);

  useEffect(() => {
    if (isSearching && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsSearching(false);
    }
  }, [isSearching, timeLeft]);

  const searchCell = (row: number, col: number) => {
    if (!useEnergy(5)) return; // Require energy to search

    setSelectedCell([row, col]);
    const searchValue = searchArea[row][col];
    
    // Find clues based on search value
    clues.forEach(clue => {
      if (!clue.found && searchValue > 80 - clue.difficulty * 10) {
        setClues(prev => prev.map(c => 
          c.id === clue.id ? { ...c, found: true } : c
        ));
        onClueFound(clue);
      }
    });

    // Check if all clues are found
    if (clues.every(c => c.found)) {
      onInvestigationComplete();
    }
  };

  return (
    <div className="bg-nexus-dark/90 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-nexus-cyan">Investigation Zone</h3>
        <div className="flex items-center gap-2">
          <Clock className="text-nexus-yellow" />
          <span className="text-nexus-light">{timeLeft}s</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1 mb-4">
        {searchArea.map((row, rowIndex) => (
          row.map((value, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => searchCell(rowIndex, colIndex)}
              className={`
                w-12 h-12 rounded 
                ${selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex
                  ? 'bg-nexus-cyan'
                  : 'bg-nexus-primary hover:bg-nexus-accent'}
              `}
            >
              {value > 80 && <AlertTriangle className="w-4 h-4 text-nexus-yellow" />}
            </button>
          ))
        ))}
      </div>

      <div className="space-y-2">
        {clues.map(clue => (
          <div 
            key={clue.id}
            className={`p-2 rounded ${
              clue.found ? 'bg-nexus-accent/50' : 'bg-nexus-primary'
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className={clue.found ? 'text-nexus-cyan' : 'text-nexus-yellow'} />
              <span className={clue.found ? 'text-nexus-light' : 'text-white'}>
                {clue.name}
              </span>
            </div>
            {clue.found && (
              <p className="text-sm text-nexus-light mt-1">{clue.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestigationGame;
