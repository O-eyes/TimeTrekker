
import { useState } from 'react';
import { Swords, Shield, Target } from 'lucide-react';

interface CombatAction {
  name: string;
  energyCost: number;
  damage: number;
  accuracy: number;
}

interface Enemy {
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  defense: number;
}

interface CombatSystemProps {
  playerClass: string;
  playerLevel: number;
  useEnergy: (amount: number) => boolean;
  onVictory: () => void;
  onDefeat: () => void;
}

const CombatSystem = ({ playerClass, playerLevel, useEnergy, onVictory, onDefeat }: CombatSystemProps) => {
  const [enemy, setEnemy] = useState<Enemy>({
    name: 'Temporal Anomaly',
    health: 100,
    maxHealth: 100,
    damage: 15,
    defense: 5
  });

  const [playerHealth, setPlayerHealth] = useState(100);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const actions: CombatAction[] = [
    { name: 'Quick Strike', energyCost: 10, damage: 20, accuracy: 90 },
    { name: 'Heavy Attack', energyCost: 25, damage: 40, accuracy: 75 },
    { name: 'Temporal Blast', energyCost: 35, damage: 60, accuracy: 60 }
  ];

  const performAction = (action: CombatAction) => {
    if (!useEnergy(action.energyCost)) {
      addToCombatLog('Not enough energy!');
      return;
    }

    // Calculate hit chance
    const hit = Math.random() * 100 <= action.accuracy;
    if (hit) {
      const damage = Math.max(0, action.damage - enemy.defense);
      setEnemy(prev => ({
        ...prev,
        health: Math.max(0, prev.health - damage)
      }));
      addToCombatLog(`You dealt ${damage} damage with ${action.name}!`);

      if (enemy.health <= 0) {
        onVictory();
        return;
      }
    } else {
      addToCombatLog(`${action.name} missed!`);
    }

    // Enemy counterattack
    const enemyDamage = Math.max(0, enemy.damage - (playerLevel * 2));
    setPlayerHealth(prev => Math.max(0, prev - enemyDamage));
    addToCombatLog(`Enemy dealt ${enemyDamage} damage!`);

    if (playerHealth <= 0) {
      onDefeat();
    }
  };

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [...prev.slice(-4), message]);
  };

  return (
    <div className="bg-nexus-dark/90 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-nexus-cyan mb-2">Player</h3>
          <div className="w-full bg-nexus-dark rounded-full h-2 mb-1">
            <div 
              className="h-2 rounded-full bg-nexus-cyan"
              style={{ width: `${(playerHealth / 100) * 100}%` }}
            />
          </div>
          <span className="text-sm text-nexus-light">{playerHealth}/100</span>
        </div>
        <div>
          <h3 className="text-nexus-yellow mb-2">{enemy.name}</h3>
          <div className="w-full bg-nexus-dark rounded-full h-2 mb-1">
            <div 
              className="h-2 rounded-full bg-nexus-yellow"
              style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
            />
          </div>
          <span className="text-sm text-nexus-light">{enemy.health}/{enemy.maxHealth}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {actions.map(action => (
          <button
            key={action.name}
            onClick={() => performAction(action)}
            className="bg-nexus-primary hover:bg-nexus-accent p-2 rounded text-sm"
          >
            <div className="flex flex-col items-center">
              <span>{action.name}</span>
              <span className="text-nexus-light text-xs">Cost: {action.energyCost}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-nexus-dark/60 p-2 rounded">
        {combatLog.map((log, index) => (
          <div key={index} className="text-sm text-nexus-light">{log}</div>
        ))}
      </div>
    </div>
  );
};

export default CombatSystem;
