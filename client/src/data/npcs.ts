import { NPC, Artifact } from '@/types/game';

// NPC portraits - fallback URLs if images can't be loaded
const portraits = {
  egypt: [
    'https://via.placeholder.com/128?text=Nefertari',
    'https://via.placeholder.com/128?text=Imhotep'
  ],
  rome: [
    'https://via.placeholder.com/128?text=Seneca',
    'https://via.placeholder.com/128?text=Livia'
  ],
  medieval: [
    'https://via.placeholder.com/128?text=Thomas',
    'https://via.placeholder.com/128?text=Eleanor'
  ],
  industrial: [
    'https://via.placeholder.com/128?text=Maxwell',
    'https://via.placeholder.com/128?text=Ada'
  ]
};

// Sample artifacts that can be given by NPCs
const npcArtifacts: Record<string, Artifact> = {
  'hieroglyphic-tablet': {
    id: 'hieroglyphic-tablet',
    name: 'Hieroglyphic Tablet',
    description: 'A stone tablet with ancient Egyptian hieroglyphics depicting unusual astronomical events.',
    type: 'document',
    rarity: 'rare',
    eraOrigin: 'egypt',
    effects: ['Increases historical knowledge by 2 when studied', 'Provides insight into ancient Egyptian astronomy']
  },
  'roman-astrolabe': {
    id: 'roman-astrolabe',
    name: 'Roman Astrolabe',
    description: 'A bronze device used for astronomical measurements, inscribed with Latin numerals and unusual markings.',
    type: 'tool',
    rarity: 'uncommon',
    eraOrigin: 'rome',
    effects: ['Improves temporal manipulation accuracy', 'Helps with celestial navigation']
  },
  'alchemists-journal': {
    id: 'alchemists-journal',
    name: 'Alchemist\'s Journal',
    description: 'A leather-bound journal containing advanced chemical formulas centuries ahead of their time.',
    type: 'document',
    rarity: 'rare',
    eraOrigin: 'medieval',
    effects: ['Reveals historical anomalies when analyzed', 'Contains clues to resolving temporal distortions']
  },
  'tesla-coil-fragment': {
    id: 'tesla-coil-fragment',
    name: 'Tesla Coil Fragment',
    description: 'A component from an experimental device designed by Nikola Tesla, exhibiting unusual energy properties.',
    type: 'tech',
    rarity: 'legendary',
    eraOrigin: 'industrial',
    effects: ['Powers temporal devices', 'Enhances time manipulation abilities when equipped']
  }
};

// NPCs for each historical era
export const historicalNPCs: Record<string, NPC[]> = {
  egypt: [
    {
      id: 'egypt-npc-1',
      name: 'Nefertari',
      role: 'Royal Scribe',
      portrait: portraits.egypt[0],
      dialogue: [
        {
          id: 'egypt-dialogue-1',
          text: 'Welcome, traveler from beyond time. Your arrival was foretold in the stars.',
          historicalFact: 'Ancient Egyptian astronomers were among the first to create star charts and calendars based on celestial movements.'
        },
        {
          id: 'egypt-dialogue-2',
          text: 'The Golden Capstone of the Great Pyramid has gone missing. Without it, the cosmic energies cannot be properly channeled.',
          historicalFact: 'The Great Pyramid of Giza was originally capped with a golden pyramidion that would reflect sunlight and be visible for miles.'
        },
        {
          id: 'egypt-dialogue-3',
          text: 'I have been documenting strange occurrences. Perhaps this tablet might help your investigation.',
          givesArtifact: npcArtifacts['hieroglyphic-tablet']
        }
      ]
    },
    {
      id: 'egypt-npc-2',
      name: 'Imhotep',
      role: 'Master Architect',
      portrait: portraits.egypt[1],
      dialogue: [
        {
          id: 'egypt-dialogue-4',
          text: 'The alignment of the pyramid with the stars is crucial. Any disruption threatens the very fabric of Ma\'at - cosmic order itself.',
          historicalFact: 'The Great Pyramid aligns perfectly with the cardinal directions, with an error of less than a fraction of a percent.'
        },
        {
          id: 'egypt-dialogue-5',
          text: 'I have seen strange tools near the construction site. Metal unlike any I have ever worked with.',
          historicalFact: 'Ancient Egyptians primarily used copper tools for construction, as iron-working was not yet widespread in the Old Kingdom.'
        },
        {
          id: 'egypt-dialogue-6',
          text: 'Someone is attempting to alter the design of the pyramid. This threatens not just our time, but all times.',
          unlocksSideQuest: 'egypt-side-quest-1'
        }
      ]
    }
  ],
  rome: [
    {
      id: 'rome-npc-1',
      name: 'Seneca',
      role: 'Philosopher and Advisor',
      portrait: portraits.rome[0],
      dialogue: [
        {
          id: 'rome-dialogue-1',
          text: 'Ah, another visitor with strange garments and stranger speech. These are unusual times indeed.',
          historicalFact: 'Seneca the Younger was a Stoic philosopher who served as advisor to Emperor Nero, before eventually being forced to commit suicide.'
        },
        {
          id: 'rome-dialogue-2',
          text: 'The Senate grows restless. Some members speak with knowledge they could not possibly possess. Future events, precise details...',
          historicalFact: 'The Roman Senate was one of the most enduring institutions in Roman history, lasting over 1,000 years from the early days of the city to the fall of the Western Empire.'
        },
        {
          id: 'rome-dialogue-3',
          text: 'I have kept this device hidden. It belonged to a stranger who spoke of distant stars and times yet to come.',
          givesArtifact: npcArtifacts['roman-astrolabe']
        }
      ]
    },
    {
      id: 'rome-npc-2',
      name: 'Livia',
      role: 'Imperial Strategist',
      portrait: portraits.rome[1],
      dialogue: [
        {
          id: 'rome-dialogue-4',
          text: 'The Colosseum hides secrets beneath its arena. I have heard strange mechanical sounds where there should be none.',
          historicalFact: 'The Colosseum had an elaborate underground structure called the hypogeum, with tunnels and mechanisms to raise animals and gladiators to the arena surface.'
        },
        {
          id: 'rome-dialogue-5',
          text: 'An entire legion vanished near the northern frontier. No bodies, no signs of battle - simply gone, as if plucked from the earth.',
          historicalFact: 'The most famous lost legion of Rome was the Ninth Legion (Legio IX Hispana), which some historians believe disappeared in Britain around 120 CE.'
        },
        {
          id: 'rome-dialogue-6',
          text: 'I believe someone is attempting to alter the course of the Empire from within. We must find who is responsible.',
          unlocksSideQuest: 'rome-side-quest-1'
        }
      ]
    }
  ],
  medieval: [
    {
      id: 'medieval-npc-1',
      name: 'Brother Thomas',
      role: 'Scholar Monk',
      portrait: portraits.medieval[0],
      dialogue: [
        {
          id: 'medieval-dialogue-1',
          text: 'God\'s blessings upon you, traveler. Your arrival coincides with most unusual events.',
          historicalFact: 'Medieval monasteries were centers of learning where ancient texts were preserved and copied by hand, saving much classical knowledge through the Dark Ages.'
        },
        {
          id: 'medieval-dialogue-2',
          text: 'The alchemists speak of transformations beyond natural law. Their experiments yield results that defy explanation.',
          historicalFact: 'While medieval alchemy is often dismissed as pseudoscience, it laid important groundwork for modern chemistry and scientific methodology.'
        },
        {
          id: 'medieval-dialogue-3',
          text: 'I have hidden this journal away from prying eyes. Its contents would be deemed heretical, yet I believe it contains important truths.',
          givesArtifact: npcArtifacts['alchemists-journal']
        }
      ]
    },
    {
      id: 'medieval-npc-2',
      name: 'Lady Eleanor',
      role: 'Noble Observer',
      portrait: portraits.medieval[1],
      dialogue: [
        {
          id: 'medieval-dialogue-4',
          text: 'The stars are not as they should be. The astronomers are baffled by configurations not recorded in any charts.',
          historicalFact: 'Medieval astronomers carefully tracked celestial movements, as they were important for both navigation and determining religious feast days.'
        },
        {
          id: 'medieval-dialogue-5',
          text: 'Word has reached us that preparations for the Fourth Crusade have mysteriously ceased. The Pope himself seems confused by the sudden change.',
          historicalFact: 'The Fourth Crusade (1202-1204) was originally intended to recapture Jerusalem but instead resulted in the sack of Constantinople, a Christian city.'
        },
        {
          id: 'medieval-dialogue-6',
          text: 'I have heard whispers of strange devices in the Alchemist Quarter. Perhaps we should investigate discreetly.',
          unlocksSideQuest: 'medieval-side-quest-1'
        }
      ]
    }
  ],
  industrial: [
    {
      id: 'industrial-npc-1',
      name: 'Dr. Maxwell',
      role: 'Electrical Engineer',
      portrait: portraits.industrial[0],
      dialogue: [
        {
          id: 'industrial-dialogue-1',
          text: 'Extraordinary! Your arrival corresponds precisely with the electromagnetic anomalies I\'ve been measuring.',
          historicalFact: 'James Clerk Maxwell\'s equations, published in the 1860s, unified electricity, magnetism, and light as manifestations of the same phenomenon: electromagnetism.'
        },
        {
          id: 'industrial-dialogue-2',
          text: 'Tesla has vanished. His workshop remains, but his most important notebooks and prototypes are missing.',
          historicalFact: 'Nikola Tesla contributed to the design of the modern alternating current (AC) electricity supply system, which revolutionized power distribution.'
        },
        {
          id: 'industrial-dialogue-3',
          text: 'I recovered this from Tesla\'s laboratory before others could find it. It appears to be of critical importance.',
          givesArtifact: npcArtifacts['tesla-coil-fragment']
        }
      ]
    },
    {
      id: 'industrial-npc-2',
      name: 'Professor Ada',
      role: 'Computational Theorist',
      portrait: portraits.industrial[1],
      dialogue: [
        {
          id: 'industrial-dialogue-4',
          text: 'My analytical engine has been producing calculations I never programmed it to perform. Equations relating to temporal mechanics.',
          historicalFact: 'Ada Lovelace is considered the first computer programmer, having written an algorithm for Charles Babbage\'s Analytical Engine in the 1840s.'
        },
        {
          id: 'industrial-dialogue-5',
          text: 'The steam engines at the factory are running at impossible efficiencies. As if they\'re being powered by principles not yet discovered.',
          historicalFact: 'The steam engine was the primary power source of the Industrial Revolution, transforming manufacturing, transportation, and society as a whole.'
        },
        {
          id: 'industrial-dialogue-6',
          text: 'I believe someone is attempting to accelerate technological development beyond its natural progression. We must investigate the railway terminal.',
          unlocksSideQuest: 'industrial-side-quest-1'
        }
      ]
    }
  ]
};

// Helper function to get NPCs for a specific era
export function getNPCsForEra(eraId: string): NPC[] {
  return historicalNPCs[eraId] || [];
}

// Helper function to get a specific NPC by ID
export function getNPCById(npcId: string): NPC | undefined {
  for (const era in historicalNPCs) {
    const npc = historicalNPCs[era].find(n => n.id === npcId);
    if (npc) return npc;
  }
  return undefined;
}