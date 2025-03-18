import { PlayerClass } from '@/types/game';
import { Clock, BookOpen, Swords, Info, X, Shield } from 'lucide-react';
import { useState } from 'react';

interface ClassSelectionProps {
  onSelectClass: (selectedClass: PlayerClass) => void;
}

interface ClassStats {
  name: string;
  stats: {
    [key: string]: number;
  };
  abilities: string[];
  specialization: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ClassSelection = ({ onSelectClass }: ClassSelectionProps) => {
  const [showStats, setShowStats] = useState<PlayerClass | null>(null);

  // Class stats data
  const classStats: Record<string, ClassStats> = {
    'Time Mage': {
      name: 'Time Mage',
      stats: {
        'Timeline Manipulation': 85,
        'Temporal Magic': 90,
        'Combat Power': 40,
        'Anomaly Detection': 75,
        'Paradox Resistance': 60
      },
      abilities: [
        'Time Freeze: Temporarily halt time flow in small areas',
        'Chrono Shield: Create protective temporal barriers',
        'Entropy Reversal: Restore degraded timeline segments',
        'Temporal Vision: See possible timeline outcomes'
      ],
      specialization: 'Manipulation of timeline fabric and energy flows',
      description: 'Masters of temporal energy who can bend, stretch, and manipulate time. Time Mages excel at healing timeline fractures and preventing paradoxes through magical means rather than force.',
      icon: <Clock className="w-8 h-8 text-nexus-cyan" />,
      color: 'text-nexus-cyan'
    },
    'Historian': {
      name: 'Historian',
      stats: {
        'Timeline Manipulation': 50,
        'Temporal Magic': 30,
        'Combat Power': 40,
        'Anomaly Detection': 95,
        'Paradox Resistance': 80
      },
      abilities: [
        'Historical Insight: Instantly understand any time period',
        'Paradox Prediction: Foresee consequences of timeline changes',
        'Knowledge Barrier: Create shields from temporal knowledge',
        'Timeline Analysis: Trace anomaly origins with perfect accuracy'
      ],
      specialization: 'Knowledge of all possible timeline variations',
      description: 'Keepers of temporal knowledge with unmatched ability to identify anomalies and predict their effects. Historians can identify the source of paradoxes and provide precise solutions to complex timeline problems.',
      icon: <BookOpen className="w-8 h-8 text-nexus-yellow" />,
      color: 'text-nexus-yellow'
    },
    'Paradox Warrior': {
      name: 'Paradox Warrior',
      stats: {
        'Timeline Manipulation': 40,
        'Temporal Magic': 55,
        'Combat Power': 90,
        'Anomaly Detection': 60,
        'Paradox Resistance': 85
      },
      abilities: [
        'Paradox Blade: Channel timeline contradictions as a weapon',
        'Temporal Dash: Move through small segments of time',
        'Anomaly Absorption: Draw power from timeline inconsistencies',
        'Causal Strike: Attacks that echo across multiple time points'
      ],
      specialization: 'Converting timeline anomalies into combat power',
      description: 'Elite fighters who harness the energy of timeline contradictions as weapons. Paradox Warriors excel in combat scenarios and can absorb anomalous energy to strengthen their abilities in the field.',
      icon: <Swords className="w-8 h-8 text-nexus-purple" />,
      color: 'text-nexus-purple'
    }
  };

  // Stats modal display
  const renderStatsModal = () => {
    if (!showStats) return null;
    
    const stats = classStats[showStats];
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
        <div className="bg-nexus-primary border border-nexus-accent rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-nexus-accent">
            <div className="flex items-center">
              {stats.icon}
              <h3 className={`text-xl font-semibold ml-3 ${stats.color}`}>{stats.name}</h3>
            </div>
            <button 
              onClick={() => setShowStats(null)}
              className="text-nexus-light hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-white font-medium mb-2">Class Overview</h4>
              <p className="text-nexus-light">{stats.description}</p>
            </div>
            
            {/* Stats */}
            <div>
              <h4 className="text-white font-medium mb-3">Attribute Ratings</h4>
              <div className="space-y-3">
                {Object.entries(stats.stats).map(([name, value]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-nexus-light">{name}</span>
                      <span className={`${stats.color} font-mono`}>{value}/100</span>
                    </div>
                    <div className="w-full bg-nexus-dark rounded-full h-2">
                      <div 
                        className={`${name === 'Timeline Manipulation' ? 'bg-nexus-cyan' : 
                                      name === 'Temporal Magic' ? 'bg-nexus-purple' : 
                                      name === 'Combat Power' ? 'bg-nexus-red' : 
                                      name === 'Anomaly Detection' ? 'bg-nexus-yellow' : 
                                      'bg-nexus-green'
                                    } h-2 rounded-full`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Abilities */}
            <div>
              <h4 className="text-white font-medium mb-3">Special Abilities</h4>
              <ul className="space-y-2">
                {stats.abilities.map((ability, index) => (
                  <li key={index} className="flex items-start">
                    <Shield className="w-4 h-4 text-nexus-yellow mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-nexus-light text-sm">{ability}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Specialization */}
            <div>
              <h4 className="text-white font-medium mb-2">Specialization</h4>
              <p className="text-nexus-light">{stats.specialization}</p>
            </div>
          </div>
          
          <div className="border-t border-nexus-accent p-4 flex justify-between">
            <button 
              onClick={() => setShowStats(null)}
              className="px-4 py-2 border border-nexus-accent bg-nexus-secondary hover:bg-nexus-accent/30 rounded-md text-sm transition-colors"
            >
              Return to Selection
            </button>
            
            <button 
              onClick={() => onSelectClass(showStats)}
              className="px-4 py-2 bg-nexus-cyan/20 hover:bg-nexus-cyan/30 text-nexus-cyan border border-nexus-cyan/50 rounded-md text-sm transition-colors"
            >
              Select {stats.name}
            </button>
          </div>
        </div>
      </div>
    );
  };

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
        <div className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300">
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
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowStats('Time Mage')}
              className="px-3 py-1.5 bg-nexus-accent/30 hover:bg-nexus-accent/50 text-nexus-light hover:text-white rounded text-sm transition-colors flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1" />
              View Stats
            </button>
            <button
              onClick={() => onSelectClass('Time Mage')}
              className="px-3 py-1.5 bg-nexus-cyan/20 hover:bg-nexus-cyan/30 text-nexus-cyan rounded text-sm transition-colors"
            >
              Select Class
            </button>
          </div>
        </div>
        
        {/* Historian */}
        <div className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300">
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
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowStats('Historian')}
              className="px-3 py-1.5 bg-nexus-accent/30 hover:bg-nexus-accent/50 text-nexus-light hover:text-white rounded text-sm transition-colors flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1" />
              View Stats
            </button>
            <button
              onClick={() => onSelectClass('Historian')}
              className="px-3 py-1.5 bg-nexus-cyan/20 hover:bg-nexus-cyan/30 text-nexus-cyan rounded text-sm transition-colors"
            >
              Select Class
            </button>
          </div>
        </div>
        
        {/* Paradox Warrior */}
        <div className="bg-nexus-secondary border border-nexus-accent hover:border-nexus-cyan rounded-lg p-5 transition-all duration-300">
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
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowStats('Paradox Warrior')}
              className="px-3 py-1.5 bg-nexus-accent/30 hover:bg-nexus-accent/50 text-nexus-light hover:text-white rounded text-sm transition-colors flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1" />
              View Stats
            </button>
            <button
              onClick={() => onSelectClass('Paradox Warrior')}
              className="px-3 py-1.5 bg-nexus-cyan/20 hover:bg-nexus-cyan/30 text-nexus-cyan rounded text-sm transition-colors"
            >
              Select Class
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-nexus-light italic">
          Choose wisely - your class selection is permanent and will affect how you resolve timeline anomalies.
        </p>
      </div>
      
      {/* Stats Modal */}
      {renderStatsModal()}
    </div>
  );
};

export default ClassSelection;
