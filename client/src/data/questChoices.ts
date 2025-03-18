import { QuestChoice, PlayerSkills } from '@/types/game';

// Quest choices for each era
export const questChoices: Record<string, QuestChoice[]> = {
  egypt: [
    {
      id: 'egypt-choice-1',
      text: 'Diplomatic Approach',
      description: 'Attempt to negotiate with the timeline intruder to understand their motives.',
      outcome: 'The intruder reveals they are from a future faction seeking to alter Egyptian architectural knowledge. Your diplomatic skill impresses them, leading to valuable information.',
      skillRequirement: {
        skill: 'diplomacy',
        level: 3
      }
    },
    {
      id: 'egypt-choice-2',
      text: 'Historical Analysis',
      description: 'Study historical records to identify the exact moment of timeline divergence.',
      outcome: 'Your careful analysis reveals that the capstone was replaced with a technologically advanced replica designed to transmit data to the future.',
      skillRequirement: {
        skill: 'historical_knowledge',
        level: 2
      }
    },
    {
      id: 'egypt-choice-3',
      text: 'Direct Confrontation',
      description: 'Track down and confront the timeline intruder directly.',
      outcome: 'You corner the intruder at the pyramid construction site. After a brief struggle, they escape but drop crucial evidence about their plans.',
      skillRequirement: {
        skill: 'combat_prowess',
        level: 4
      }
    }
  ],
  rome: [
    {
      id: 'rome-choice-1',
      text: 'Temporal Investigation',
      description: 'Use your temporal abilities to track energy signatures in the Senate building.',
      outcome: 'You detect traces of advanced temporal technology hidden beneath the Senate floor, revealing a sophisticated surveillance system.',
      skillRequirement: {
        skill: 'temporal_manipulation',
        level: 3
      }
    },
    {
      id: 'rome-choice-2',
      text: 'Senate Infiltration',
      description: 'Disguise yourself as a senator to observe suspicious behavior firsthand.',
      outcome: 'You identify three senators who appear to have advanced knowledge. One accidentally reveals information about a future technology transfer.',
      skillRequirement: {
        skill: 'diplomacy',
        level: 2
      }
    },
    {
      id: 'rome-choice-3',
      text: 'Artifact Analysis',
      description: 'Examine unusual artifacts found near the Colosseum for timeline contamination.',
      outcome: 'The artifacts contain microcomponents that don\'t belong in this era. Your analysis provides crucial evidence of deliberate timeline manipulation.',
      skillRequirement: {
        skill: 'artifact_analysis',
        level: 4
      }
    }
  ],
  medieval: [
    {
      id: 'medieval-choice-1',
      text: 'Alchemical Investigation',
      description: 'Investigate the alchemists\' laboratory for signs of anachronistic knowledge.',
      outcome: 'You discover formulas that shouldn\'t exist for several more centuries, including early concepts of atomic theory and electrical conductivity.',
      skillRequirement: {
        skill: 'historical_knowledge',
        level: 3
      }
    },
    {
      id: 'medieval-choice-2',
      text: 'Temporal Stabilization',
      description: 'Use temporal abilities to stabilize the anomalous energy around the cathedral.',
      outcome: 'Your intervention neutralizes a temporal field that was accelerating knowledge transfer across time periods. The local timeline begins to self-correct.',
      skillRequirement: {
        skill: 'temporal_manipulation',
        level: 5
      }
    },
    {
      id: 'medieval-choice-3',
      text: 'Knight\'s Gambit',
      description: 'Join the castle guard to monitor unusual activities among visiting dignitaries.',
      outcome: 'You uncover a visitor from the future posing as a foreign noble, who has been introducing advanced metallurgical techniques to local craftsmen.',
      skillRequirement: {
        skill: 'combat_prowess',
        level: 3
      }
    }
  ],
  industrial: [
    {
      id: 'industrial-choice-1',
      text: 'Technical Examination',
      description: 'Analyze the factory machinery for evidence of future technology.',
      outcome: 'You identify components that incorporate principles of quantum mechanics, centuries ahead of their time. The contamination is isolated to Tesla\'s work.',
      skillRequirement: {
        skill: 'artifact_analysis',
        level: 4
      }
    },
    {
      id: 'industrial-choice-2',
      text: 'Temporal Tracing',
      description: 'Follow temporal energy traces to locate the missing inventor.',
      outcome: 'Your abilities lead you to a hidden workshop where Tesla is being held. He\'s being forced to incorporate future technology into his designs.',
      skillRequirement: {
        skill: 'temporal_manipulation',
        level: 4
      }
    },
    {
      id: 'industrial-choice-3',
      text: 'Historical Research',
      description: 'Research historical records to identify timeline discrepancies in technological development.',
      outcome: 'Your research reveals that certain patents filed in this era contain principles that weren\'t discovered until decades later, accelerating technological progress unnaturally.',
      skillRequirement: {
        skill: 'historical_knowledge',
        level: 4
      }
    }
  ]
};

// Helper function to get quest choices for a specific era
export function getQuestChoicesForEra(eraId: string): QuestChoice[] {
  return questChoices[eraId] || [];
}

// Helper function to get a specific quest choice by ID
export function getQuestChoiceById(choiceId: string): QuestChoice | undefined {
  for (const era in questChoices) {
    const choice = questChoices[era].find(c => c.id === choiceId);
    if (choice) return choice;
  }
  return undefined;
}

// Helper function to check if player meets skill requirement for a choice
export function meetsSkillRequirement(playerSkills: Record<string, number> | PlayerSkills, choice: QuestChoice): boolean {
  if (!choice.skillRequirement) return true;
  
  const { skill, level } = choice.skillRequirement;
  return ((playerSkills as Record<string, number>)[skill] || 0) >= level;
}