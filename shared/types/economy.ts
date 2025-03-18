
import { TemporalResource } from './resources';

export type MarketOrder = {
  id: string;
  resourceId: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  location: string;
  expiry: Date;
  playerId: string;
};

export type ResourcePrice = {
  resourceId: string;
  location: string;
  currentPrice: number;
  priceHistory: Array<{
    price: number;
    timestamp: Date;
  }>;
};

export type PlayerWallet = {
  id: string;
  temporalCredits: number;
  transactions: Array<{
    amount: number;
    type: 'credit' | 'debit';
    description: string;
    timestamp: Date;
  }>;
};
