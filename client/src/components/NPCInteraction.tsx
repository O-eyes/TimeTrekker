import { useState } from 'react';
import { NPC, NPCDialogue, Artifact } from '@/types/game';
import { X, ThumbsUp, MessageCircle } from 'lucide-react';

interface NPCInteractionProps {
  npc: NPC;
  onClose: () => void;
  onCollectArtifact?: (artifact: Artifact) => void;
  onUnlockSideQuest?: (questId: string) => void;
}

const NPCInteraction = ({ 
  npc, 
  onClose, 
  onCollectArtifact, 
  onUnlockSideQuest 
}: NPCInteractionProps) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [shownFact, setShownFact] = useState<boolean>(false);
  
  const currentDialogue = npc.dialogue[currentDialogueIndex];
  
  const handleNextDialogue = () => {
    if (currentDialogueIndex < npc.dialogue.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
      setShownFact(false);
    } else {
      // Cycle back to first dialogue
      setCurrentDialogueIndex(0);
      setShownFact(false);
    }
  };
  
  const handleShowFact = () => {
    setShownFact(true);
    
    // If this dialogue gives an artifact
    if (currentDialogue.givesArtifact && onCollectArtifact) {
      onCollectArtifact(currentDialogue.givesArtifact);
    }
    
    // If this dialogue unlocks a side quest
    if (currentDialogue.unlocksSideQuest && onUnlockSideQuest) {
      onUnlockSideQuest(currentDialogue.unlocksSideQuest);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-nexus-dark border border-nexus-accent rounded-lg w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-nexus-primary p-4 flex justify-between items-center border-b border-nexus-accent">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-nexus-cyan" />
            {npc.name} <span className="text-nexus-light ml-2 text-sm font-normal">({npc.role})</span>
          </h3>
          <button onClick={onClose} className="text-nexus-light hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex p-6">
          {/* NPC Portrait */}
          <div className="w-32 h-32 bg-nexus-secondary rounded-md flex items-center justify-center overflow-hidden mr-6 flex-shrink-0">
            <img 
              src={npc.portrait} 
              alt={npc.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, show a fallback
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=NPC';
              }}
            />
          </div>
          
          {/* Dialogue */}
          <div className="flex-1">
            <div className="bg-nexus-secondary p-4 rounded-md border border-nexus-accent mb-4">
              <p className="text-white">{currentDialogue.text}</p>
            </div>
            
            {/* Historical Fact */}
            {currentDialogue.historicalFact && (
              <div>
                {shownFact ? (
                  <div className="bg-nexus-primary/50 p-3 rounded-md border border-nexus-cyan">
                    <div className="text-xs uppercase tracking-wider text-nexus-cyan mb-1">Historical Fact</div>
                    <p className="text-sm text-white">{currentDialogue.historicalFact}</p>
                  </div>
                ) : (
                  <button 
                    onClick={handleShowFact}
                    className="w-full py-2 rounded-md border border-nexus-cyan text-nexus-cyan hover:bg-nexus-cyan hover:text-nexus-dark transition-colors flex justify-center items-center"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    <span>Ask about historical facts</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-nexus-primary p-4 border-t border-nexus-accent">
          <div className="flex justify-between">
            <span className="text-sm text-nexus-light">
              Dialogue {currentDialogueIndex + 1} of {npc.dialogue.length}
            </span>
            <button 
              onClick={handleNextDialogue}
              className="bg-nexus-cyan text-nexus-dark px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPCInteraction;