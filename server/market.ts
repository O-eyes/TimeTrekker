
import { MarketOrder, ResourcePrice } from '../shared/types/economy';

class MarketSystem {
  private orders: MarketOrder[] = [];
  private prices: Map<string, ResourcePrice> = new Map();
  
  private async updatePrices() {
    this.prices.forEach((price, resourceId) => {
      const buyOrders = this.orders.filter(o => o.resourceId === resourceId && o.type === 'buy');
      const sellOrders = this.orders.filter(o => o.resourceId === resourceId && o.type === 'sell');
      
      const priceChange = this.calculatePriceChange(buyOrders, sellOrders);
      price.currentPrice *= (1 + priceChange);
      
      price.priceHistory.push({
        price: price.currentPrice,
        timestamp: new Date()
      });
    });
  }
  
  private calculatePriceChange(buyOrders: MarketOrder[], sellOrders: MarketOrder[]): number {
    const buyPressure = buyOrders.reduce((sum, order) => sum + order.quantity, 0);
    const sellPressure = sellOrders.reduce((sum, order) => sum + order.quantity, 0);
    
    return (buyPressure - sellPressure) * 0.001; // 0.1% max change per update
  }

  public placeOrder(order: MarketOrder) {
    this.orders.push(order);
    this.updatePrices();
  }

  public getOrders(): MarketOrder[] {
    return this.orders;
  }

  public getPrices(): Map<string, ResourcePrice> {
    return this.prices;
  }
}

export const marketSystem = new MarketSystem();
