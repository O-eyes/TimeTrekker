import { PlayerSkills, PlayerClass } from '@/types/game';
import { 
  Clock, 
  BookOpen, 
  Swords, 
  Microscope, 
  MessageSquare, 
  X 
} from 'lucide-react';

interface SkillsPanelProps {
  playerClass: PlayerClass;
  skills: PlayerSkills;
  onClose: () => void;
}

const SkillsPanel = ({ 
  playerClass, 
  skills, 
  onClose 
}: SkillsPanelProps) => {
  // Get skill color based on class specialization
  const getSkillColor = (skill: keyof PlayerSkills) => {
    if (playerClass === 'Time Mage' && skill === 'temporal_manipulation') {
      return 'bg-nexus-cyan';
    }
    if (playerClass === 'Historian' && skill === 'historical_knowledge') {
      return 'bg-nexus-purple';
    }
    if (playerClass === 'Paradox Warrior' && skill === 'combat_prowess') {
      return 'bg-nexus-red';
    }
    return 'bg-nexus-light';
  };

  // Get skill icon
  const getSkillIcon = (skill: keyof PlayerSkills) => {
    switch (skill) {
      case 'temporal_manipulation':
        return <Clock className="w-5 h-5" />;
      case 'historical_knowledge':
        return <BookOpen className="w-5 h-5" />;
      case 'combat_prowess':
        return <Swords className="w-5 h-5" />;
      case 'artifact_analysis':
        return <Microscope className="w-5 h-5" />;
      case 'diplomacy':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Get skill description
  const getSkillDescription = (skill: keyof PlayerSkills) => {
    switch (skill) {
      case 'temporal_manipulation':
        return 'Ability to perceive and manipulate the flow of time. Useful for resolving temporal anomalies.';
      case 'historical_knowledge':
        return 'Understanding of historical events and contexts. Helps identify anachronisms and timeline corruptions.';
      case 'combat_prowess':
        return 'Capability in physical confrontations. Essential for dealing with hostile timeline threats.';
      case 'artifact_analysis':
        return 'Skill in examining and utilizing temporal artifacts. Improves with each artifact collected.';
      case 'diplomacy':
        return 'Effectiveness in communication with historical figures. Increases chances of peaceful resolutions.';
      default:
        return '';
    }
  };

  // Format skill name for display
  const formatSkillName = (skill: string) => {
    return skill
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-80 bg-nexus-primary border-r border-nexus-accent p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Skills & Abilities</h3>
        <button 
          onClick={onClose}
          className="text-nexus-light hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-nexus-cyan font-medium mb-2">{playerClass} Specialization</h4>
        <p className="text-nexus-light text-sm">
          {playerClass === 'Time Mage' && 'Masters of temporal energy manipulation and paradox resolution.'}
          {playerClass === 'Historian' && 'Experts in historical knowledge and cultural understanding across time periods.'}
          {playerClass === 'Paradox Warrior' && 'Skilled combatants who protect the timeline from external threats.'}
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(skills).map(([skillName, level]) => (
          <div key={skillName} className="bg-nexus-dark p-3 rounded-md border border-nexus-accent">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="mr-2 text-nexus-cyan">
                  {getSkillIcon(skillName as keyof PlayerSkills)}
                </div>
                <span className="text-white font-medium">
                  {formatSkillName(skillName)}
                </span>
              </div>
              <span className="text-nexus-light text-sm">Level {level}/10</span>
            </div>

            {/* Skill progress bar */}
            <div className="h-2 bg-nexus-accent/30 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full rounded-full ${getSkillColor(skillName as keyof PlayerSkills)}`}
                style={{ width: `${level * 10}%` }}
              ></div>
            </div>

            <p className="text-xs text-nexus-light mt-1">
              {getSkillDescription(skillName as keyof PlayerSkills)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPanel;