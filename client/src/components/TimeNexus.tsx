import { useState, useEffect, useCallback } from 'react';
import { 
  PlayerClass, 
  TimePeriod, 
  Quest, 
  Message, 
  Anomaly,
  Location,
  Artifact,
  PlayerSkills,
  Inventory,
  NPC
} from '@/types/game';
import TimePeriodSidebar from './TimePeriodSidebar';
import TimeNexusHub from './TimeNexusHub';
import HistoricalEra from './HistoricalEra';
import MessageLog from './MessageLog';
import InventoryPanel from './InventoryPanel';
import SkillsPanel from './SkillsPanel';
import NPCInteraction from './NPCInteraction';
import { Clock, Briefcase, Users } from 'lucide-react';

// Initial time periods data
const initialTimePeriods: TimePeriod[] = [
  {
    id: 'nexus',
    name: 'Time Nexus',
    shortDescription: 'Central Hub',
    integrity: 100,
    anomalies: 0,
    explored: true,
    icon: 'network',
  },
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    shortDescription: '2500 BCE - Reign of Pharaoh Khufu',
    integrity: 82,
    anomalies: 3,
    explored: false,
    icon: 'landmark',
  },
  {
    id: 'rome',
    name: 'Roman Empire',
    shortDescription: '50 CE - Height of Imperial Rome',
    integrity: 64,
    anomalies: 5,
    explored: false,
    icon: 'pillar',
  },
  {
    id: 'medieval',
    name: 'Medieval Europe',
    shortDescription: '1200 CE - Age of Feudalism',
    integrity: 75,
    anomalies: 2,
    explored: false,
    icon: 'sword',
  },
  {
    id: 'industrial',
    name: 'Industrial Revolution',
    shortDescription: '1850 CE - Age of Steam',
    integrity: 91,
    anomalies: 1,
    explored: false,
    icon: 'factory',
  },
];

// Initial anomalies data
const initialAnomalies: Record<string, Anomaly[]> = {
  egypt: [
    {
      id: 'egypt-1',
      name: 'Missing Pyramid Capstone',
      description: 'The golden capstone of the Great Pyramid has vanished, causing timeline distortions.',
      status: 'active',
      periodId: 'egypt',
    },
    {
      id: 'egypt-2',
      name: 'Anachronistic Technology',
      description: 'Modern tools discovered in Pharaoh\'s tomb, creating serious paradox potential.',
      status: 'active',
      periodId: 'egypt',
    },
    {
      id: 'egypt-3',
      name: 'Royal Lineage Disruption',
      description: 'An unknown figure is influencing royal succession decisions.',
      status: 'active',
      periodId: 'egypt',
    }
  ],
  rome: [
    {
      id: 'rome-1',
      name: 'Senate Conspiracy',
      description: 'A faction with future knowledge is manipulating the Roman Senate.',
      status: 'active',
      periodId: 'rome',
    },
    {
      id: 'rome-2',
      name: 'Colosseum Malfunction',
      description: 'The Colosseum contains machinery centuries ahead of its time.',
      status: 'active',
      periodId: 'rome',
    },
    {
      id: 'rome-3',
      name: 'Displaced Legionaries',
      description: 'An entire legion has disappeared from the timeline.',
      status: 'active',
      periodId: 'rome',
    }
  ],
  medieval: [
    {
      id: 'medieval-1',
      name: 'Disrupted Crusade',
      description: 'The Fourth Crusade never occurred, causing major timeline deviations.',
      status: 'active',
      periodId: 'medieval',
    },
    {
      id: 'medieval-2',
      name: 'Alchemical Anomaly',
      description: 'Alchemists have discovered advanced chemistry too early.',
      status: 'active',
      periodId: 'medieval',
    }
  ],
  industrial: [
    {
      id: 'industrial-1',
      name: 'Missing Inventor',
      description: 'A key inventor has vanished, threatening technological progression.',
      status: 'active',
      periodId: 'industrial',
    }
  ]
};

// Initial locations data
const initialLocations: Record<string, Location[]> = {
  egypt: [
    {
      id: 'egypt-loc-1',
      name: 'Great Pyramid of Giza',
      description: 'Construction site with thousands of workers.',
      periodId: 'egypt',
    },
    {
      id: 'egypt-loc-2',
      name: 'Royal Palace',
      description: 'Center of political power and intrigue.',
      periodId: 'egypt',
    },
    {
      id: 'egypt-loc-3',
      name: 'Temple of Ra',
      description: 'Sacred site with powerful temporal energy.',
      periodId: 'egypt',
    }
  ],
  rome: [
    {
      id: 'rome-loc-1',
      name: 'Roman Forum',
      description: 'Center of Roman politics and commerce.',
      periodId: 'rome',
    },
    {
      id: 'rome-loc-2',
      name: 'Colosseum',
      description: 'Massive amphitheater with temporal disturbances.',
      periodId: 'rome',
    },
    {
      id: 'rome-loc-3',
      name: 'Senate House',
      description: 'Where powerful decisions shape the empire.',
      periodId: 'rome',
    }
  ],
  medieval: [
    {
      id: 'medieval-loc-1',
      name: 'Castle Keep',
      description: 'Fortress with unusual defensive technologies.',
      periodId: 'medieval',
    },
    {
      id: 'medieval-loc-2',
      name: 'Cathedral Square',
      description: 'Center of religious and cultural life.',
      periodId: 'medieval',
    },
    {
      id: 'medieval-loc-3',
      name: 'Alchemist Quarter',
      description: 'Where strange experiments are conducted.',
      periodId: 'medieval',
    }
  ],
  industrial: [
    {
      id: 'industrial-loc-1',
      name: 'Steam Factory',
      description: 'Hub of industrial innovation.',
      periodId: 'industrial',
    },
    {
      id: 'industrial-loc-2',
      name: 'Inventor\'s Workshop',
      description: 'Where the future is being created too soon.',
      periodId: 'industrial',
    },
    {
      id: 'industrial-loc-3',
      name: 'Railway Terminal',
      description: 'Node in the transportation network with temporal anomalies.',
      periodId: 'industrial',
    }
  ]
};

const TimeNexus = () => {
  // Main app state
  const [playerClass, setPlayerClass] = useState<PlayerClass>(null);
  const [currentEra, setCurrentEra] = useState<string>('nexus');
  const [timePeriods, setTimePeriods] = useState<TimePeriod[]>(initialTimePeriods);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: 'Welcome to the Time Nexus. Choose your class to begin.',
      type: 'system',
      timestamp: formatTimestamp(new Date()),
    }
  ]);
  const [timelineRepairs, setTimelineRepairs] = useState<number>(0);
  const [artifactsCollected, setArtifactsCollected] = useState<number>(0);
  const [factionStanding, setFactionStanding] = useState<string>('Neutral');
  const [overallIntegrity, setOverallIntegrity] = useState<number>(78);
  
  // New state for enhanced features
  const [activeNPC, setActiveNPC] = useState<NPC | null>(null);
  const [inventory, setInventory] = useState<Inventory>({
    artifacts: [],
    capacity: 10
  });
  const [playerSkills, setPlayerSkills] = useState<PlayerSkills>({
    temporal_manipulation: 1,
    historical_knowledge: 1,
    combat_prowess: 1,
    artifact_analysis: 1,
    diplomacy: 1
  });
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showSkills, setShowSkills] = useState<boolean>(false);

  // Helper function to format timestamps
  function formatTimestamp(date: Date): string {
    return date.toLocaleTimeString().slice(0, 5);
  }

  // Add message to the log
  const addMessage = useCallback((text: string, type: Message['type'] = 'system') => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      type,
      timestamp: formatTimestamp(new Date()),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  // Select player class
  const selectClass = useCallback((selectedClass: PlayerClass) => {
    setPlayerClass(selectedClass);
    addMessage(`You have chosen the ${selectedClass} class. Temporal abilities unlocked.`, 'success');
  }, [addMessage]);

  // Travel to a different era
  const travelToEra = useCallback((eraId: string) => {
    const era = timePeriods.find(period => period.id === eraId);
    if (!era) return;

    setCurrentEra(eraId);
    
    // Mark as explored if first visit
    if (!era.explored && eraId !== 'nexus') {
      setTimePeriods(prev => prev.map(period => 
        period.id === eraId ? { ...period, explored: true } : period
      ));
      addMessage(`First visit to ${era.name}. Timeline integrity at ${era.integrity}%.`, 'travel');
    } else {
      addMessage(`Traveled to ${era.name}. Timeline integrity at ${era.integrity}%.`, 'travel');
    }

    // Generate a quest if none exists for this era and it's not the nexus
    if (eraId !== 'nexus' && !quests.some(q => q.periodId === eraId && !q.completed)) {
      generateQuest(eraId);
    }
  }, [timePeriods, quests, addMessage]);

  // Generate a new quest for an era
  const generateQuest = useCallback((eraId: string) => {
    const era = timePeriods.find(period => period.id === eraId);
    if (!era) return;

    const anomaly = initialAnomalies[eraId]?.[0];
    if (!anomaly) return;

    const newQuest: Quest = {
      id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Resolve an anomaly in ${era.name}`,
      description: `The ${anomaly.name.toLowerCase()} must be addressed to prevent timeline degradation.`,
      steps: 5,
      progress: 0,
      reward: generateReward(),
      completed: false,
      periodId: eraId,
    };

    setQuests(prev => [...prev, newQuest]);
    addMessage(`New quest received: ${newQuest.name}`, 'quest');
  }, [timePeriods, addMessage]);

  // Generate a random artifact reward
  const generateReward = () => {
    const artifacts = [
      {
        name: 'Hourglass of Thoth',
        type: 'relic',
        rarity: 'rare',
        eraOrigin: 'egypt'
      },
      {
        name: 'Chronometer Compass',
        type: 'tool', 
        rarity: 'uncommon',
        eraOrigin: 'industrial'
      },
      {
        name: 'Paradox Prism',
        type: 'paradox',
        rarity: 'legendary',
        eraOrigin: 'nexus'
      },
      {
        name: 'Time-Weaver\'s Thread',
        type: 'tech',
        rarity: 'rare',
        eraOrigin: 'rome'
      },
      {
        name: 'Quantum Chalice',
        type: 'relic',
        rarity: 'rare',
        eraOrigin: 'medieval'
      }
    ];
    
    const selected = artifacts[Math.floor(Math.random() * artifacts.length)];
    return `Temporal Artifact: ${selected.name}`;
  };
  
  // Add artifact to player inventory
  const addArtifactToInventory = useCallback((artifactName: string) => {
    if (inventory.artifacts.length >= inventory.capacity) {
      addMessage('Your inventory is full. Consider examining some artifacts at the Nexus.', 'warning');
      return false;
    }
    
    // Extract the actual name from the string format "Temporal Artifact: Name"
    const name = artifactName.replace('Temporal Artifact: ', '');
    
    // Create new artifact
    const newArtifact: Artifact = {
      id: `artifact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: `A mysterious artifact from the timestream.`,
      type: 'relic' as const,
      rarity: 'uncommon' as const,
      eraOrigin: currentEra,
      effects: ['Increases historical knowledge when studied']
    };
    
    // Add to inventory
    setInventory(prev => ({
      ...prev,
      artifacts: [...prev.artifacts, newArtifact]
    }));
    
    addMessage(`Added ${name} to your inventory.`, 'inventory');
    
    // Improve skill based on artifact type
    improveSkill('artifact_analysis', 1);
    
    return true;
  }, [inventory, currentEra, addMessage]);
  
  // Improve a player skill
  const improveSkill = useCallback((skill: keyof PlayerSkills, amount: number) => {
    setPlayerSkills(prev => ({
      ...prev,
      [skill]: Math.min(10, prev[skill] + amount)
    }));
    
    addMessage(`${skill.replace('_', ' ')} skill improved by ${amount}.`, 'success');
  }, []);

  // Advance quest progress
  const advanceQuest = useCallback((questId: string) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId && quest.progress < quest.steps) {
        const newProgress = quest.progress + 1;
        const completed = newProgress >= quest.steps;
        
        // Add message
        addMessage(`Quest progress: ${newProgress}/${quest.steps} steps completed.`, 'quest');
        
        // Improve skills based on progress
        if (playerClass === 'Time Mage') {
          improveSkill('temporal_manipulation', 1);
        } else if (playerClass === 'Historian') {
          improveSkill('historical_knowledge', 1);
        } else if (playerClass === 'Paradox Warrior') {
          improveSkill('combat_prowess', 1);
        }
        
        // If completed, add completion message and reward
        if (completed) {
          addMessage(`Quest completed! Received reward: ${quest.reward}`, 'success');
          
          // Add artifact to inventory
          addArtifactToInventory(quest.reward);
          
          setArtifactsCollected(prev => prev + 1);
          
          // Improve timeline integrity for the era
          setTimePeriods(prevPeriods => prevPeriods.map(period => 
            period.id === quest.periodId 
              ? { 
                  ...period, 
                  integrity: Math.min(100, period.integrity + 5),
                  anomalies: Math.max(0, period.anomalies - 1)
                } 
              : period
          ));
          
          setTimelineRepairs(prev => prev + 1);
          setOverallIntegrity(prev => Math.min(100, prev + 3));
          
          // Randomly improve diplomacy
          if (Math.random() > 0.7) {
            improveSkill('diplomacy', 1);
          }
        }
        
        return { ...quest, progress: newProgress, completed };
      }
      return quest;
    }));
  }, [addMessage, playerClass, addArtifactToInventory, improveSkill]);

  // Get current quest for the active era
  const getCurrentQuest = useCallback(() => {
    return quests.find(quest => quest.periodId === currentEra && !quest.completed);
  }, [currentEra, quests]);

  // Get anomalies for the current era
  const getCurrentAnomalies = useCallback(() => {
    if (currentEra === 'nexus') return [];
    return initialAnomalies[currentEra] || [];
  }, [currentEra]);

  // Get locations for the current era
  const getCurrentLocations = useCallback(() => {
    if (currentEra === 'nexus') return [];
    return initialLocations[currentEra] || [];
  }, [currentEra]);

  // Initial welcome message
  useEffect(() => {
    // Initial message is already added in the state initialization
  }, []);

  return (
    <div id="time-nexus" className="flex flex-col h-screen bg-nexus-dark overflow-hidden">
      {/* Header */}
      <header className="bg-nexus-primary px-6 py-3 border-b border-nexus-accent flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-nexus-cyan" />
          <h1 className="text-xl font-semibold text-white">Time Nexus</h1>
        </div>
        
        {playerClass && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-nexus-cyan font-mono">
              <span className="px-2 py-1 bg-nexus-secondary rounded-md">Class: {playerClass}</span>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with time periods */}
        <TimePeriodSidebar 
          timePeriods={timePeriods} 
          currentEra={currentEra} 
          onSelectEra={travelToEra} 
        />

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header Toolbar */}
          {playerClass && (
            <div className="flex justify-end space-x-2 p-2 bg-nexus-primary border-b border-nexus-accent">
              {/* Inventory Button */}
              <button 
                onClick={() => setShowInventory(!showInventory)} 
                className={`px-3 py-1 rounded flex items-center space-x-1 text-sm transition-colors ${showInventory ? 'bg-nexus-cyan text-nexus-dark' : 'bg-nexus-accent text-white hover:bg-nexus-cyan hover:text-nexus-dark'}`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Inventory ({inventory.artifacts.length}/{inventory.capacity})</span>
              </button>
              
              {/* Skills Button */}
              <button 
                onClick={() => setShowSkills(!showSkills)}
                className={`px-3 py-1 rounded flex items-center space-x-1 text-sm transition-colors ${showSkills ? 'bg-nexus-cyan text-nexus-dark' : 'bg-nexus-accent text-white hover:bg-nexus-cyan hover:text-nexus-dark'}`}
              >
                <Users className="w-4 h-4" />
                <span>Skills</span>
              </button>
            </div>
          )}
          
          {/* Main content */}
          <div className={`flex-1 ${showInventory || showSkills ? 'flex' : 'block'} overflow-hidden`}>
            {/* Inventory Panel - only visible when showInventory is true */}
            {showInventory && playerClass && (
              <InventoryPanel 
                inventory={inventory} 
                onClose={() => setShowInventory(false)} 
              />
            )}
            
            {/* Skills Panel - only visible when showSkills is true */}
            {showSkills && playerClass && (
              <SkillsPanel 
                playerClass={playerClass}
                skills={playerSkills}
                onClose={() => setShowSkills(false)}
              />
            )}
            
            {/* Active NPC Interaction */}
            {activeNPC && (
              <NPCInteraction 
                npc={activeNPC}
                onClose={() => setActiveNPC(null)}
                onCollectArtifact={(artifact) => {
                  // Add artifact to inventory
                  setInventory(prev => ({
                    ...prev,
                    artifacts: [...prev.artifacts, artifact]
                  }));
                  
                  // Add message to log
                  addMessage(`Added ${artifact.name} to your inventory.`, 'inventory');
                  
                  // Improve skill
                  improveSkill('artifact_analysis', 1);
                }}
                onUnlockSideQuest={(questId) => {
                  // TODO: Implement side quest unlocking
                  addMessage('A new side quest has been unlocked!', 'quest');
                }}
              />
            )}
            
            <div className={`${showInventory || showSkills ? 'flex-1' : 'w-full'} overflow-hidden flex flex-col`}>
              {currentEra === 'nexus' ? (
                <TimeNexusHub 
                  playerClass={playerClass} 
                  onSelectClass={selectClass}
                  timelineRepairs={timelineRepairs}
                  artifactsCollected={artifactsCollected}
                  factionStanding={factionStanding}
                  overallIntegrity={overallIntegrity}
                  timePeriods={timePeriods}
                />
              ) : (
                <HistoricalEra 
                  timePeriod={timePeriods.find(period => period.id === currentEra)!}
                  currentQuest={getCurrentQuest()}
                  onAdvanceQuest={advanceQuest}
                  onReturnToNexus={() => travelToEra('nexus')}
                  anomalies={getCurrentAnomalies()}
                  locations={getCurrentLocations()}
                />
              )}
            </div>
          </div>
          
          {/* Message log */}
          <MessageLog messages={messages} />
        </main>
      </div>
    </div>
  );
};

export default TimeNexus;
