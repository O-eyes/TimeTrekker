
import { useState, useEffect } from 'react';
import { Resource } from '@shared/types/economy';

interface ResourceGatheringProps {
  eraId: string;
  onGatherResource: (resource: Resource, amount: number) => void;
  availableResources: Resource[];
  playerEnergy: number;
}

const ResourceGathering = ({ eraId, onGatherResource, availableResources, playerEnergy }: ResourceGatheringProps) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [gatheringProgress, setGatheringProgress] = useState(0);
  const [isGathering, setIsGathering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGathering && playerEnergy > 0) {
      interval = setInterval(() => {
        setGatheringProgress(prev => {
          if (prev >= 100) {
            setIsGathering(false);
            onGatherResource(selectedResource!, Math.floor(Math.random() * 3) + 1);
            return 0;
          }
          return prev + 10;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGathering, selectedResource, playerEnergy]);

  return (
    <div className="p-4 bg-nexus-dark/90 rounded-lg">
      <h3 className="text-lg text-nexus-cyan mb-4">Resource Gathering</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {availableResources.map(resource => (
          <button
            key={resource.id}
            onClick={() => setSelectedResource(resource)}
            className={`p-2 rounded ${
              selectedResource?.id === resource.id 
                ? 'bg-nexus-cyan text-nexus-dark' 
                : 'bg-nexus-accent text-white hover:bg-nexus-accent/80'
            }`}
          >
            {resource.name}
          </button>
        ))}
      </div>

      {selectedResource && (
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-nexus-light">Progress</span>
            <span className="text-nexus-cyan">{gatheringProgress}%</span>
          </div>
          
          <div className="w-full bg-nexus-dark rounded-full h-2 mb-4">
            <div 
              className="bg-nexus-cyan h-2 rounded-full transition-all" 
              style={{ width: `${gatheringProgress}%` }}
            />
          </div>

          <button
            onClick={() => setIsGathering(!isGathering)}
            disabled={playerEnergy <= 0}
            className={`w-full py-2 rounded ${
              isGathering 
                ? 'bg-nexus-yellow text-nexus-dark' 
                : 'bg-nexus-cyan text-nexus-dark'
            } ${playerEnergy <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGathering ? 'Stop Gathering' : 'Start Gathering'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceGathering;
