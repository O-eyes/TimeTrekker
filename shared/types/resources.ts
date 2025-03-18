
export type ResourceTier = 'common' | 'uncommon' | 'rare' | 'legendary';
export type ResourceCategory = 'raw' | 'refined' | 'artifact' | 'temporal';

export interface Resource {
  id: string;
  name: string;
  description: string;
  tier: ResourceTier;
  category: ResourceCategory;
  baseValue: number;
  eraOrigin: string;
  weight: number;
  stackable: boolean;
  maxStack: number;
}

export const RESOURCE_BASE_VALUES = {
  common: 100,
  uncommon: 500,
  rare: 2500,
  legendary: 10000
};

export const RESOURCE_WEIGHTS = {
  common: 1,
  uncommon: 2,
  rare: 5,
  legendary: 10
};
