
import { useState, useEffect } from 'react';

interface EnergySystemProps {
  maxEnergy: number;
  currentEnergy: number;
  onEnergyChange: (newEnergy: number) => void;
}

const EnergySystem = ({ maxEnergy, currentEnergy, onEnergyChange }: EnergySystemProps) => {
  useEffect(() => {
    const regenerationInterval = setInterval(() => {
      if (currentEnergy < maxEnergy) {
        onEnergyChange(Math.min(maxEnergy, currentEnergy + 1));
      }
    }, 10000); // Regenerate 1 energy every 10 seconds

    return () => clearInterval(regenerationInterval);
  }, [currentEnergy, maxEnergy]);

  return (
    <div className="flex items-center space-x-2">
      <div className="text-nexus-cyan">Energy</div>
      <div className="flex-1 bg-nexus-dark h-2 rounded-full">
        <div
          className="bg-nexus-cyan h-2 rounded-full transition-all"
          style={{ width: `${(currentEnergy / maxEnergy) * 100}%` }}
        />
      </div>
      <div className="text-nexus-light">{currentEnergy}/{maxEnergy}</div>
    </div>
  );
};

export default EnergySystem;
