import { PlayerClass, TimePeriod } from '@/types/game';
import ClassSelection from './ClassSelection';
import { Network, User, Activity, Shield } from 'lucide-react';

interface TimeNexusHubProps {
  playerClass: PlayerClass;
  onSelectClass: (selectedClass: PlayerClass) => void;
  timelineRepairs: number;
  artifactsCollected: number;
  factionStanding: string;
  overallIntegrity: number;
  timePeriods: TimePeriod[];
}

const TimeNexusHub = ({ 
  playerClass, 
  onSelectClass,
  timelineRepairs,
  artifactsCollected,
  factionStanding,
  overallIntegrity,
  timePeriods
}: TimeNexusHubProps) => {
  // If no class is selected, show class selection UI
  if (!playerClass) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-to-b from-nexus-primary to-nexus-dark">
        <ClassSelection onSelectClass={onSelectClass} />
      </div>
    );
  }

  // Calculate explored eras
  const exploredEras = timePeriods.filter(p => p.id !== 'nexus' && p.explored).length;
  const totalEras = timePeriods.filter(p => p.id !== 'nexus').length;
  
  // Count total anomalies
  const totalAnomalies = timePeriods.reduce((sum, p) => sum + p.anomalies, 0);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-to-b from-nexus-primary to-nexus-dark p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Network className="w-8 h-8 text-nexus-purple mr-3" />
          <h2 className="text-2xl font-semibold text-white">Time Nexus Hub</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Your Status */}
          <div className="bg-nexus-secondary rounded-lg p-5 border border-nexus-accent">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-nexus-cyan" />
              Your Status
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Class</span>
                  <span className="text-nexus-cyan font-mono">{playerClass}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Timeline Repairs</span>
                  <span className="text-white font-mono">{timelineRepairs}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Artifacts Collected</span>
                  <span className="text-white font-mono">{artifactsCollected}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Faction Standing</span>
                  <span className="text-nexus-yellow font-mono">{factionStanding}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline Status */}
          <div className="bg-nexus-secondary rounded-lg p-5 border border-nexus-accent">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-nexus-yellow" />
              Timeline Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Overall Integrity</span>
                  <span className="text-nexus-yellow font-mono">{overallIntegrity}%</span>
                </div>
                <div className="w-full bg-nexus-primary rounded-full h-2">
                  <div 
                    className="bg-nexus-yellow h-2 rounded-full" 
                    style={{ width: `${overallIntegrity}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Total Anomalies</span>
                  <span className="text-white font-mono">{totalAnomalies}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-nexus-light">Eras Explored</span>
                  <span className="text-white font-mono">{exploredEras} / {totalEras}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Faction Information */}
          <div className="bg-nexus-secondary rounded-lg p-5 border border-nexus-accent">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-nexus-purple" />
              Faction Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexus-light">Chronos Guild</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-nexus-cyan"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-cyan"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexus-light">Temporal Alliance</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-nexus-cyan"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexus-light">Paradox Syndicate</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                  <div className="w-2 h-2 rounded-full bg-nexus-light"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-nexus-light">
              <p>Interact with factions by completing timeline missions that align with their interests.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4 text-nexus-light text-sm">
          <p>Select a time period from the sidebar to travel to that era and begin resolving anomalies.</p>
        </div>
      </div>
    </div>
  );
};

export default TimeNexusHub;
