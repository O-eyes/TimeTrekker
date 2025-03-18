export interface TimePeriod {
  id: string;
  name: string;
  shortDescription: string;
  integrity: number;
  anomalies: number;
  explored: boolean;
  icon: string;
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
}

export interface Anomaly {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'resolved';
  periodId: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  periodId: string;
}

export type PlayerClass = 'Time Mage' | 'Historian' | 'Paradox Warrior' | null;

export type MessageType = 'system' | 'success' | 'quest' | 'warning' | 'travel';

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: string;
}

export const COLOR_MAP = {
  'system': 'border-nexus-purple',
  'success': 'border-nexus-cyan',
  'quest': 'border-nexus-green',
  'warning': 'border-nexus-red',
  'travel': 'border-nexus-yellow',
};
