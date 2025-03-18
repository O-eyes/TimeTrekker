import { useState } from 'react';
import { Quest, QuestChoice, PlayerSkills } from '@/types/game';
import { Scroll, Play, BrainCircuit, Lightbulb, SwordIcon } from 'lucide-react';
import { getQuestChoicesForEra, meetsSkillRequirement } from '@/data/questChoices';

interface QuestDisplayProps {
  quest: Quest | undefined;
  onAdvanceQuest: (questId: string) => void;
  playerSkills?: PlayerSkills;
}

const QuestDisplay = ({ quest, onAdvanceQuest, playerSkills }: QuestDisplayProps) => {
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<QuestChoice | null>(null);
  
  // Get available choices for this quest's era
  const getQuestChoices = () => {
    if (!quest) return [];
    
    // Get choices from the data and filter by player's skills if available
    const choices = getQuestChoicesForEra(quest.periodId);
    
    if (!playerSkills) return choices;
    
    // Return all choices, but mark which ones the player meets requirements for
    return choices.map(choice => ({
      ...choice,
      meetsRequirement: meetsSkillRequirement(playerSkills, choice)
    }));
  };
  
  // Function to handle choice selection
  const selectChoice = (choice: QuestChoice) => {
    setSelectedChoice(choice);
    
    // In a real implementation, this might update the quest with the choice
    // For now, we'll just close the choices panel
    setTimeout(() => {
      setShowChoices(false);
      // Then advance the quest
      onAdvanceQuest(quest!.id);
    }, 1000);
  };
  
  // Get icon for a skill
  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'temporal_manipulation': return <BrainCircuit className="w-4 h-4" />;
      case 'historical_knowledge': return <Lightbulb className="w-4 h-4" />;
      case 'combat_prowess': return <SwordIcon className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="bg-nexus-primary/80 backdrop-blur-md rounded-lg p-5 border border-nexus-accent">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Scroll className="w-5 h-5 mr-2 text-nexus-cyan" />
        Current Quest
      </h3>
      
      {quest ? (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white">{quest.name}</h4>
            <p className="text-sm text-nexus-light mt-1">{quest.description}</p>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-nexus-light">Progress</span>
              <span className="text-white font-mono">{quest.progress}/{quest.steps} steps</span>
            </div>
            <div className="w-full bg-nexus-dark rounded-full h-2">
              <div 
                className="bg-nexus-cyan h-2 rounded-full" 
                style={{ width: `${(quest.progress / quest.steps) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="text-sm mb-2">
              <span className="text-nexus-light">Reward:</span>
              <span className="text-nexus-cyan ml-2">{quest.reward}</span>
            </div>
            
            {showChoices ? (
              <div className="space-y-3 mt-4">
                <h5 className="text-sm font-medium text-white">Choose your approach:</h5>
                
                {getQuestChoices().map(choice => {
                  const hasRequirement = choice.skillRequirement !== undefined;
                  const meetsRequirement = !hasRequirement || 
                    (playerSkills && playerSkills[choice.skillRequirement!.skill] >= choice.skillRequirement!.level);
                  
                  return (
                    <div 
                      key={choice.id}
                      className={`p-3 rounded-md border ${
                        meetsRequirement 
                          ? 'border-nexus-cyan/50 bg-nexus-dark/70 cursor-pointer hover:bg-nexus-dark'
                          : 'border-nexus-accent/30 bg-nexus-dark/30 opacity-70 cursor-not-allowed'
                      } transition-colors`}
                      onClick={() => meetsRequirement && selectChoice(choice as QuestChoice)}
                    >
                      <div className="flex justify-between items-start">
                        <h6 className="font-medium text-white text-sm">{choice.text}</h6>
                        
                        {hasRequirement && (
                          <div className={`flex items-center space-x-1 text-xs ${
                            meetsRequirement ? 'text-nexus-green' : 'text-nexus-red'
                          }`}>
                            {getSkillIcon(choice.skillRequirement!.skill)}
                            <span>{choice.skillRequirement!.skill.replace('_', ' ')}</span>
                            <span className="font-mono">
                              {playerSkills ? `${playerSkills[choice.skillRequirement!.skill]}` : '0'}/{choice.skillRequirement!.level}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-nexus-light mt-1">{choice.description}</p>
                    </div>
                  );
                })}
                
                <button
                  onClick={() => setShowChoices(false)}
                  className="w-full px-3 py-1.5 bg-nexus-dark/50 text-nexus-light border border-nexus-accent/50 rounded-md hover:bg-nexus-dark transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => quest.progress < quest.steps ? setShowChoices(true) : null}
                disabled={quest.progress >= quest.steps}
                className={`w-full px-4 py-2 ${
                  quest.progress >= quest.steps 
                    ? 'bg-nexus-accent/20 text-nexus-light border-nexus-accent/30 cursor-not-allowed' 
                    : 'bg-nexus-cyan/20 hover:bg-nexus-cyan/30 text-nexus-cyan border-nexus-cyan/50 cursor-pointer'
                } border rounded-md transition-colors flex items-center justify-center space-x-2`}
              >
                <Play className="w-4 h-4" />
                <span>{quest.progress >= quest.steps ? 'Quest Complete' : 'Advance Quest'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 bg-nexus-dark/50 rounded border border-nexus-accent/50 text-center">
          <p className="text-nexus-light">No active quest in this time period.</p>
          <p className="text-xs text-nexus-light mt-2">Investigate anomalies to generate new quests.</p>
        </div>
      )}
    </div>
  );
};

export default QuestDisplay;
