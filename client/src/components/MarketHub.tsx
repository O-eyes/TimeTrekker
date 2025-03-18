
import { useState } from 'react';
import { Resource, MarketOrder } from '@shared/types/economy';

interface MarketHubProps {
  resources: Resource[];
  playerCredits: number;
  onPlaceOrder: (order: MarketOrder) => void;
}

const MarketHub = ({ resources, playerCredits, onPlaceOrder }: MarketHubProps) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  return (
    <div className="bg-nexus-dark/90 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-nexus-cyan">Temporal Market Exchange</h2>
        <div className="text-nexus-light">Credits: {playerCredits}</div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg text-nexus-yellow">Available Resources</h3>
          <div className="grid gap-2">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="p-2 bg-nexus-primary rounded cursor-pointer hover:bg-nexus-accent"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="text-nexus-cyan">{resource.name}</div>
                <div className="text-sm text-nexus-light">{resource.baseValue} credits</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg text-nexus-yellow">Trade</h3>
          {selectedResource && (
            <div className="bg-nexus-primary p-4 rounded">
              <h4 className="text-nexus-cyan mb-2">{selectedResource.name}</h4>
              <div className="space-y-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-2 bg-nexus-dark rounded"
                  min="1"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  className="w-full p-2 bg-nexus-dark rounded"
                  min="0"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => onPlaceOrder({
                      type: 'buy',
                      resourceId: selectedResource.id,
                      quantity,
                      price
                    })}
                    className="flex-1 bg-nexus-cyan text-nexus-dark p-2 rounded"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => onPlaceOrder({
                      type: 'sell',
                      resourceId: selectedResource.id,
                      quantity,
                      price
                    })}
                    className="flex-1 bg-nexus-yellow text-nexus-dark p-2 rounded"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketHub;
