import { TimePeriod } from '@/types/game';
import { Hourglass, Clock, LucideIcon } from 'lucide-react';
import { createElement } from 'react';
import dynamic from 'next/dynamic';

interface TimePeriodSidebarProps {
  timePeriods: TimePeriod[];
  currentEra: string;
  onSelectEra: (eraId: string) => void;
}

// Helper function to dynamically get Lucide icons
const getIcon = (name: string) => {
  try {
    // This is a workaround since we can't use dynamic import with Lucide icons easily
    // We'll use a limited set of icons that we know exist
    switch (name) {
      case 'network': return Clock;
      case 'landmark': return Clock;
      case 'pillar': return Clock;
      case 'sword': return Clock; 
      case 'factory': return Clock;
      default: return Clock;
    }
  } catch (error) {
    return Clock;
  }
};

const TimePeriodSidebar = ({ timePeriods, currentEra, onSelectEra }: TimePeriodSidebarProps) => {
  return (
    <aside className="w-20 md:w-64 border-r border-nexus-accent bg-nexus-primary flex flex-col">
      <div className="p-4 border-b border-nexus-accent">
        <h2 className="hidden md:block text-nexus-cyan font-semibold">Time Periods</h2>
        <h2 className="md:hidden text-nexus-cyan text-center">
          <Hourglass className="w-6 h-6 mx-auto" />
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2">
        {timePeriods.map((period) => {
          const isSelected = period.id === currentEra;
          const Icon = getIcon(period.icon);
          
          // Determine integrity color
          let integrityColor = 'text-nexus-green';
          if (period.integrity < 70) integrityColor = 'text-nexus-red';
          else if (period.integrity < 85) integrityColor = 'text-nexus-yellow';
          
          return (
            <div 
              key={period.id}
              onClick={() => onSelectEra(period.id)}
              className={`time-era-card flex items-center p-3 rounded-lg border ${
                isSelected 
                  ? 'border-nexus-cyan selected animate-glow' 
                  : 'border-nexus-accent bg-nexus-secondary hover:bg-nexus-accent/30'
              } cursor-pointer transition-all duration-300`}
            >
              <div className="md:mr-3 flex-shrink-0 flex items-center justify-center">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-nexus-cyan' : 'text-nexus-light'}`} />
              </div>
              <div className="hidden md:block">
                <div className="flex justify-between">
                  <h3 className="font-medium">{period.name}</h3>
                  {period.id !== 'nexus' && (
                    <span className={`text-xs px-1.5 py-0.5 bg-nexus-accent/50 rounded-full ${integrityColor}`}>
                      {period.integrity}%
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-xs text-nexus-light mt-1">
                  {period.id !== 'nexus' && (
                    <>
                      <span>Anomalies: {period.anomalies}</span>
                      <span className={period.explored ? 'text-nexus-yellow' : 'text-nexus-light'}>
                        {period.explored ? 'Explored' : 'Not Explored'}
                      </span>
                    </>
                  )}
                  {period.id === 'nexus' && <span>{period.shortDescription}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default TimePeriodSidebar;
