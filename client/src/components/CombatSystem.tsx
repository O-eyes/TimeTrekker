import { useState } from 'react';
import { PlayerClass } from '@/types/game';

interface CombatSystemProps {
  playerClass: PlayerClass;
  playerLevel: number;
  onCombatEnd: (victory: boolean) => void;
}

export default function CombatSystem({ playerClass, playerLevel, onCombatEnd }: CombatSystemProps) {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(80);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const attack = () => {
    // Player attacks
    const playerDamage = Math.floor(Math.random() * 20) + 10;
    setEnemyHealth(prev => Math.max(0, prev - playerDamage));
    setCombatLog(prev => [...prev, `You deal ${playerDamage} damage!`]);

    // Enemy attacks back
    if (enemyHealth > 0) {
      const enemyDamage = Math.floor(Math.random() * 15) + 5;
      setPlayerHealth(prev => Math.max(0, prev - enemyDamage));
      setCombatLog(prev => [...prev, `Enemy deals ${enemyDamage} damage!`]);
    }

    // Check combat end conditions
    if (enemyHealth <= playerDamage) {
      onCombatEnd(true);
    } else if (playerHealth <= 0) {
      onCombatEnd(false);
    }
  };

  return (
    <div className="bg-nexus-dark p-4 rounded-lg">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-nexus-cyan">Player HP: {playerHealth}</h3>
          <p className="text-nexus-light">Class: {playerClass}</p>
        </div>
        <div>
          <h3 className="text-red-500">Enemy HP: {enemyHealth}</h3>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={attack}
          className="w-full bg-nexus-accent hover:bg-nexus-accent/80 text-white py-2 rounded"
        >
          Attack
        </button>
      </div>

      <div className="mt-4 h-32 overflow-y-auto bg-nexus-dark/50 p-2 rounded">
        {combatLog.map((log, i) => (
          <p key={i} className="text-sm text-nexus-light">{log}</p>
        ))}
      </div>
    </div>
  );
}