
import { useState, useEffect } from 'react';
import { Battery, BatteryCharging } from 'lucide-react';

interface EnergySystemProps {
  maxEnergy: number;
  onEnergyDepleted: () => void;
}

const EnergySystem = ({ maxEnergy, onEnergyDepleted }: EnergySystemProps) => {
  const [energy, setEnergy] = useState(maxEnergy);
  const [recharging, setRecharging] = useState(false);

  useEffect(() => {
    const rechargeInterval = setInterval(() => {
      if (recharging && energy < maxEnergy) {
        setEnergy(prev => Math.min(maxEnergy, prev + 5));
      }
    }, 1000);

    return () => clearInterval(rechargeInterval);
  }, [recharging, energy, maxEnergy]);

  const useEnergy = (amount: number) => {
    if (energy >= amount) {
      setEnergy(prev => prev - amount);
      return true;
    }
    onEnergyDepleted();
    return false;
  };

  const startRecharge = () => {
    setRecharging(true);
  };

  const stopRecharge = () => {
    setRecharging(false);
  };

  return (
    <div className="bg-nexus-dark/80 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {recharging ? <BatteryCharging className="text-nexus-cyan" /> : <Battery className="text-nexus-yellow" />}
        <span className="text-nexus-light">Energy: {energy}/{maxEnergy}</span>
      </div>
      <div className="w-full bg-nexus-dark rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${recharging ? 'bg-nexus-cyan' : 'bg-nexus-yellow'}`}
          style={{ width: `${(energy / maxEnergy) * 100}%` }}
        />
      </div>
      <button
        onClick={recharging ? stopRecharge : startRecharge}
        className={`mt-2 px-3 py-1 rounded text-sm ${
          recharging 
            ? 'bg-nexus-cyan text-nexus-dark' 
            : 'bg-nexus-dark text-nexus-cyan border border-nexus-cyan'
        }`}
      >
        {recharging ? 'Stop Recharge' : 'Start Recharge'}
      </button>
    </div>
  );
};

export default EnergySystem;
