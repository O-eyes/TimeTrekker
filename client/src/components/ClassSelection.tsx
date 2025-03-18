import { PlayerClass } from '@/types/game';
import { Clock, BookOpen, Swords } from 'lucide-react';

interface ClassSelectionProps {
  onSelectClass: (selectedClass: PlayerClass) => void;
}

const ClassSelection = ({ onSelectClass }: ClassSelectionProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Welcome to the Time Nexus</h2>
        <p className="text-nexus-light max-w-lg mx-auto">
          Select your class to begin your journey through time. Your choice will determine your abilities and approach to maintaining the timeline.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Time Mage */}
        <div 
          onClick={() => onSelectClass('Time Mage')}
          className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-nexus-primary mx-auto mb-4">
            <Clock className="w-8 h-8 text-nexus-cyan" />
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-2">Time Mage</h3>
          <p className="text-sm text-nexus-light text-center">
            Manipulates time-based effects to restore timeline integrity with powerful temporal magic.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <div className="h-1.5 bg-nexus-cyan rounded-full"></div>
            <div className="h-1.5 bg-nexus-cyan rounded-full"></div>
            <div className="h-1.5 bg-nexus-light rounded-full"></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-nexus-light px-1">
            <span>Manipulation</span>
            <span>Magic</span>
            <span>Combat</span>
          </div>
        </div>
        
        {/* Historian */}
        <div 
          onClick={() => onSelectClass('Historian')}
          className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-nexus-primary mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-nexus-yellow" />
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-2">Historian</h3>
          <p className="text-sm text-nexus-light text-center">
            Foresees possible timeline outcomes and uses knowledge of history to prevent paradoxes.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <div className="h-1.5 bg-nexus-yellow rounded-full"></div>
            <div className="h-1.5 bg-nexus-light rounded-full"></div>
            <div className="h-1.5 bg-nexus-light rounded-full"></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-nexus-light px-1">
            <span>Knowledge</span>
            <span>Foresight</span>
            <span>Defense</span>
          </div>
        </div>
        
        {/* Paradox Warrior */}
        <div 
          onClick={() => onSelectClass('Paradox Warrior')}
          className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-nexus-primary mx-auto mb-4">
            <Swords className="w-8 h-8 text-nexus-purple" />
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-2">Paradox Warrior</h3>
          <p className="text-sm text-nexus-light text-center">
            Harnesses timeline contradictions for power, turning temporal anomalies into weapons.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <div className="h-1.5 bg-nexus-light rounded-full"></div>
            <div className="h-1.5 bg-nexus-purple rounded-full"></div>
            <div className="h-1.5 bg-nexus-purple rounded-full"></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-nexus-light px-1">
            <span>Stability</span>
            <span>Power</span>
            <span>Offense</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-nexus-light italic">
          Choose wisely - your class selection is permanent and will affect how you resolve timeline anomalies.
        </p>
      </div>
    </div>
  );
};

export default ClassSelection;
