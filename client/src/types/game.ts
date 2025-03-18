export interface TimePeriod {
  id: string;
  name: string;
  shortDescription: string;
  integrity: number;
  anomalies: number;
  explored: boolean;
  icon: string;
  npcs?: NPC[];
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  steps: number;
  progress: number;
  reward: string;
  completed: boolean;
  periodId: string;
  choices?: QuestChoice[];
  currentChoiceIndex?: number;
}

export interface QuestChoice {
  id: string;
  text: string;
  description: string;
  outcome: string;
  skillRequirement?: {
    skill: Skill;
    level: number;
  };
  rewardBonus?: Artifact;
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  type: 'tool' | 'relic' | 'document' | 'tech' | 'paradox';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  effects?: string[];
  eraOrigin: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  dialogue: NPCDialogue[];
  portrait: string;
  factIndex?: number;
}

export interface NPCDialogue {
  id: string;
  text: string;
  historicalFact?: string;
  requiresArtifact?: string;
  givesArtifact?: Artifact;
  unlocksSideQuest?: string;
}

export interface Anomaly {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'resolved';
  periodId: string;
  severity?: 'minor' | 'moderate' | 'severe';
  causeDescription?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  periodId: string;
  npcs?: string[]; // IDs of NPCs at this location
  artifacts?: string[]; // IDs of artifacts that can be found here
}

export type PlayerClass = 'Time Mage' | 'Historian' | 'Paradox Warrior' | null;

export type Skill = 'temporal_manipulation' | 'historical_knowledge' | 'combat_prowess' | 'artifact_analysis' | 'diplomacy';

export interface PlayerSkills {
  temporal_manipulation: number;
  historical_knowledge: number;
  combat_prowess: number;
  artifact_analysis: number;
  diplomacy: number;
}

export interface Inventory {
  artifacts: Artifact[];
  capacity: number;
}

export type MessageType = 'system' | 'success' | 'quest' | 'warning' | 'travel' | 'npc' | 'inventory';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: string;
  npcName?: string;
}

export const COLOR_MAP = {
  'system': 'border-nexus-purple',
  'success': 'border-nexus-cyan',
  'quest': 'border-nexus-green',
  'warning': 'border-nexus-red',
  'travel': 'border-nexus-yellow',
  'npc': 'border-white',
  'inventory': 'border-nexus-purple',
};
