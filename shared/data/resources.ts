
import { Resource } from '../types/resources';

export const resources: Record<string, Resource[]> = {
  egypt: [
    {
      id: 'egypt-limestone',
      name: 'Ancient Limestone',
      description: 'High-quality building stone from Egyptian quarries',
      tier: 'common',
      category: 'raw',
      baseValue: 100,
      eraOrigin: 'egypt',
      weight: 1,
      stackable: true,
      maxStack: 100
    },
    {
      id: 'egypt-papyrus',
      name: 'Refined Papyrus',
      description: 'Processed papyrus ready for scribing',
      tier: 'uncommon',
      category: 'refined',
      baseValue: 500,
      eraOrigin: 'egypt',
      weight: 2,
      stackable: true,
      maxStack: 50
    }
  ],
  nexus: [
    {
      id: 'temporal-crystal',
      name: 'Temporal Crystal',
      description: 'Pure crystallized time energy',
      tier: 'legendary',
      category: 'temporal',
      baseValue: 10000,
      eraOrigin: 'nexus',
      weight: 10,
      stackable: true,
      maxStack: 10
    }
  ]
};
