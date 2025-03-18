import { Inventory, Artifact } from '@/types/game';

interface InventoryPanelProps {
  inventory: Inventory;
  onClose: () => void;
}

const InventoryPanel = ({ inventory, onClose }: InventoryPanelProps) => {
  return (
    <div className="w-80 bg-nexus-primary border-r border-nexus-accent p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Inventory</h3>
        <button 
          onClick={onClose}
          className="text-nexus-light hover:text-white transition-colors"
        >
          <span className="text-lg">×</span>
        </button>
      </div>
      
      {inventory.artifacts.length === 0 ? (
        <p className="text-nexus-light text-sm italic">Your inventory is empty. Complete quests to collect artifacts.</p>
      ) : (
        <div className="space-y-3">
          {inventory.artifacts.map(artifact => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ArtifactCardProps {
  artifact: Artifact;
}

const ArtifactCard = ({ artifact }: ArtifactCardProps) => {
  return (
    <div 
      className={`p-3 rounded-md bg-nexus-dark border-l-4 
        ${artifact.rarity === 'common' ? 'border-gray-400' : 
          artifact.rarity === 'uncommon' ? 'border-nexus-green' :
          artifact.rarity === 'rare' ? 'border-nexus-cyan' : 'border-nexus-purple'
        }`}
    >
      <h4 className="text-white font-medium">{artifact.name}</h4>
      <div className="flex justify-between text-xs text-nexus-light mt-1">
        <span>{artifact.type}</span>
        <span className="capitalize">{artifact.rarity}</span>
      </div>
      <p className="text-sm text-nexus-light mt-2">{artifact.description}</p>
      {artifact.effects && (
        <div className="mt-2">
          <span className="text-xs text-nexus-cyan">Effects:</span>
          <ul className="text-xs text-nexus-light mt-1 list-disc pl-4">
            {artifact.effects.map((effect, idx) => (
              <li key={idx}>{effect}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;