import { Quest } from '@/types/game';
import { Scroll, Play } from 'lucide-react';

interface QuestDisplayProps {
  quest: Quest | undefined;
  onAdvanceQuest: (questId: string) => void;
}

const QuestDisplay = ({ quest, onAdvanceQuest }: QuestDisplayProps) => {
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
            
            <button
              onClick={() => onAdvanceQuest(quest.id)}
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
