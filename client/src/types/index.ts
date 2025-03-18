export type PlayerClass = "time-mage" | "historian" | "paradox-warrior" | null;

export type Era = {
  id: string;
  name: string;
  period: string;
  description: string;
  integrity: number;
  anomalies: number;
  explored: boolean;
  colorClass: string;
  locations?: Location[];
  anomalyDetails?: Anomaly[];
};

export type Location = {
  name: string;
  description: string;
  colorClass: string;
};

export type Anomaly = {
  name: string;
  description: string;
  severity: "high" | "medium" | "low";
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  eraId: string;
  totalSteps: number;
  currentStep: number;
  reward: string;
  isCompleted: boolean;
};

export type MessageType = "SYSTEM" | "SUCCESS" | "TRAVEL" | "QUEST" | "WARNING";

export type Message = {
  type: MessageType;
  text: string;
  timestamp: number;
};
