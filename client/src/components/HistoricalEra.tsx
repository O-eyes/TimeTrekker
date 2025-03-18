import { useState } from 'react';
import { TimePeriod, Quest, Anomaly, Location, NPC, PlayerSkills } from '@/types/game';
import { getNPCsForEra } from '@/data/npcs';
import QuestDisplay from './QuestDisplay';
import NPCInteraction from './NPCInteraction';
import { Landmark, ArrowLeft, AlertTriangle, Map, Users } from 'lucide-react';
import InvestigationGame from './InvestigationGame'; // Import the InvestigationGame component


interface HistoricalEraProps {
  timePeriod: TimePeriod;
  currentQuest: Quest | undefined;
  onAdvanceQuest: (questId: string) => void;
  onReturnToNexus: () => void;
  anomalies: Anomaly[];
  locations: Location[];
  playerSkills?: PlayerSkills;
  onCollectArtifact?: (artifact: any) => void;
  onUnlockSideQuest?: (questId: string) => void;
  playerClass?: string; // Added playerClass prop
  addMessage: (message: string, type: string) => void; // Added addMessage function
}

// Placeholder ResourceGathering component
const ResourceGathering = ({ eraId, availableResources, onGatherResource, playerEnergy }: any) => {
  return (
    <div>
      <h2>{eraId} Resources</h2>
      {availableResources.map(resource => (
        <div key={resource.id}>
          <p>{resource.name}: {resource.baseValue}</p>
          <button onClick={() => onGatherResource(resource, 1)}>Gather</button>
        </div>
      ))}
      <p>Player Energy: {playerEnergy}</p>
    </div>
  );
};


const HistoricalEra = ({ 
  timePeriod,
  currentQuest,
  onAdvanceQuest,
  onReturnToNexus,
  anomalies,
  locations,
  playerSkills,
  onCollectArtifact,
  onUnlockSideQuest,
  playerClass, // Added playerClass prop
  addMessage // Added addMessage function
}: HistoricalEraProps) => {
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [currentInvestigation, setCurrentInvestigation] = useState<Location | null>(null); // Added state for current investigation

  // Get NPCs for this time period
  const npcs = timePeriod.npcs || getNPCsForEra(timePeriod.id);

  // Map the era ID to a CSS background class
  const eraBackgrounds: Record<string, string> = {
    egypt: 'bg-[url("https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1470&auto=format&fit=crop")]',
    rome: 'bg-[url("https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1496&auto=format&fit=crop")]',
    medieval: 'bg-[url("https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?q=80&w=1374&auto=format&fit=crop")]',
    industrial: 'bg-[url("https://images.unsplash.com/photo-1518982380512-5a3c6f0583e0?q=80&w=1470&auto=format&fit=crop")]',
  };

  const backgroundClass = eraBackgrounds[timePeriod.id] || '';

  // Handle NPC selection
  const handleNPCClick = (npc: NPC) => {
    setSelectedNPC(npc);
  };

  // Close NPC dialog
  const handleCloseNPC = () => {
    setSelectedNPC(null);
  };

  return (
    <div className={`flex-1 overflow-y-auto scrollbar-thin historical-bg bg-nexus-primary ${backgroundClass} bg-cover bg-center h-[calc(81vh-4rem)]`}>
      <div className="min-h-full backdrop-blur-sm backdrop-brightness-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Landmark className="w-8 h-8 text-nexus-yellow mr-3" />
              <div>
                <h2 className="text-2xl font-semibold text-white">{timePeriod.name}</h2>
                <p className="text-nexus-light text-sm">{timePeriod.shortDescription}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <div className="text-xs text-nexus-light mb-1">Timeline Integrity</div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-nexus-dark rounded-full h-2">
                    <div 
                      className="bg-nexus-cyan h-2 rounded-full" 
                      style={{ width: `${timePeriod.integrity}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-nexus-cyan">{timePeriod.integrity}%</span>
                </div>
              </div>

              <button
                onClick={onReturnToNexus}
                className="px-3 py-1.5 border border-nexus-accent bg-nexus-primary hover:bg-nexus-secondary rounded-md text-sm flex items-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Return to Nexus
              </button>
            </div>
          </div>

          {/* Timeline Info and Quest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-nexus-primary/80 backdrop-blur-md rounded-lg p-5 border border-nexus-accent">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-nexus-yellow" />
                Timeline Anomalies
              </h3>
              <div className="space-y-4">
                {anomalies.map(anomaly => (
                  <div key={anomaly.id} className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{anomaly.name}</h4>
                        <p className="text-sm text-nexus-light mt-1">{anomaly.description}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-nexus-accent rounded-full text-nexus-yellow">
                        {anomaly.status === 'active' ? 'Active' : 'Resolved'}
                      </span>
                    </div>
                  </div>
                ))}

                {anomalies.length === 0 && (
                  <div className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50">
                    <p className="text-sm text-nexus-light">No anomalies detected in this time period.</p>
                  </div>
                )}
              </div>
              {/* Resource Gathering Section */}
              <div className="mt-6">
                <h2 className="text-xl text-nexus-cyan mb-4">Resource Operations</h2>
                <ResourceGathering
                  eraId={timePeriod.id}
                  onGatherResource={(resource, amount) => {
                    // TODO: Implement resource gathering handler
                    console.log(`Gathered ${amount} ${resource.name}`);
                  }}
                  availableResources={[
                    // Example resources - replace with actual era-specific resources
                    { id: 'temporal-energy', name: 'Temporal Energy', baseValue: 100 },
                    { id: 'paradox-matter', name: 'Paradox Matter', baseValue: 150 },
                  ]}
                  playerEnergy={100} // TODO: Implement energy system
                />
              </div>
            </div>

            {/* Quest Display */}
            <QuestDisplay 
              quest={currentQuest} 
              onAdvanceQuest={onAdvanceQuest}
              playerSkills={playerSkills}
            />
          </div>

          {/* Location Details */}
          <div className="bg-nexus-primary/80 backdrop-blur-md rounded-lg p-5 border border-nexus-accent mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Map className="w-5 h-5 mr-2 text-nexus-yellow" />
              Location Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map(location => (
                <div key={location.id} className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50">
                  <h4 className="font-medium text-white text-sm">{location.name}</h4>
                  <p className="text-xs text-nexus-light mt-1">{location.description}</p>
                  <button 
                    onClick={() => {
                      if (!playerClass) {
                        addMessage("You must select a class before investigating.", "warning");
                        return;
                      }
                      setCurrentInvestigation(location);
                    }}
                    className={`mt-2 px-2 py-1 text-xs rounded ${
                      playerClass 
                        ? 'bg-nexus-accent text-white hover:bg-nexus-accent/80' 
                        : 'bg-nexus-dark/50 text-nexus-light cursor-not-allowed'
                    }`}
                  >
                    {playerClass ? 'Investigate' : 'Class Required'}
                  </button>

                  {currentInvestigation?.id === location.id && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="max-w-2xl w-full mx-4">
                        <InvestigationGame
                          playerClass={playerClass} // Added playerClass prop (replace 'playerClass' with actual prop)
                          location={currentInvestigation}
                          onComplete={(success) => {
                            if (success) {
                              onAdvanceQuest(currentQuest?.id || '');
                            }
                            setCurrentInvestigation(null);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {locations.length === 0 && (
                <div className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50 col-span-3">
                  <p className="text-sm text-nexus-light">No notable locations found in this time period.</p>
                </div>
              )}
            </div>
          </div>

          {/* Historical NPCs */}
          <div className="bg-nexus-primary/80 backdrop-blur-md rounded-lg p-5 border border-nexus-accent mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-nexus-yellow" />
              Historical Figures
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {npcs.map(npc => (
                <div 
                  key={npc.id} 
                  className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50 hover:bg-nexus-dark/70 transition-colors cursor-pointer"
                  onClick={() => handleNPCClick(npc)}
                >
                  <div className="flex items-start">
                    <div 
                      className="w-12 h-12 rounded-full overflow-hidden bg-nexus-dark mr-3 flex-shrink-0 bg-center bg-cover"
                      style={{ backgroundImage: `url(${npc.portrait})` }}
                    ></div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{npc.name}</h4>
                      <p className="text-xs text-nexus-cyan">{npc.role}</p>
                      <p className="text-xs text-nexus-light mt-1 line-clamp-2">
                        {npc.dialogue[0]?.text?.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {npcs.length === 0 && (
                <div className="p-3 bg-nexus-dark/50 rounded border border-nexus-accent/50 col-span-full">
                  <p className="text-sm text-nexus-light">No historical figures available for interaction in this time period.</p>
                </div>
              )}
            </div>
          </div>

          {/* NPC Interaction Dialog */}
          {selectedNPC && (
            <NPCInteraction 
              npc={selectedNPC} 
              onClose={handleCloseNPC}
              onCollectArtifact={onCollectArtifact}
              onUnlockSideQuest={onUnlockSideQuest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalEra;