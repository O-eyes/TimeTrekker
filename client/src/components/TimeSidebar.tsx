import { Era } from "@/types";
import { Clock } from "lucide-react";

type TimeSidebarProps = {
  eras: Era[];
  currentLocation: string;
  onSelectEra: (eraId: string) => void;
};

export default function TimeSidebar({ eras, currentLocation, onSelectEra }: TimeSidebarProps) {
  return (
    <aside className="w-full md:w-64 lg:w-80 bg-slate-950 border-r border-purple-600/30 overflow-auto scrollbar-thin">
      <div className="p-4">
        <h2 className="font-mono text-lg mb-4 text-white flex items-center">
          <Clock className="h-5 w-5 mr-2 text-sky-500" />
          Time Periods
        </h2>
        
        {/* Time Nexus */}
        <div 
          className={`mb-3 rounded-lg ${
            currentLocation === "nexus" 
              ? "bg-purple-600/20 border border-purple-600" 
              : "bg-slate-800/60 hover:bg-slate-800 border border-purple-600/30"
          } p-3 cursor-pointer transition duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]`}
          onClick={() => onSelectEra("nexus")}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-mono text-white">Time Nexus</h3>
            <span className="px-2 py-0.5 rounded-full bg-purple-600/40 text-white text-xs">Hub</span>
          </div>
          <p className="text-sm mt-1 text-slate-300">Central temporal junction point</p>
          <div className="mt-2 flex items-center text-sm text-slate-400">
            {currentLocation === "nexus" && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
                <span>Current Location</span>
              </>
            )}
          </div>
        </div>
        
        {/* Time Eras */}
        {eras.map((era) => (
          <div 
            key={era.id}
            className={`mb-3 rounded-lg ${
              currentLocation === era.id 
                ? "bg-purple-600/20 border border-purple-600" 
                : "bg-slate-800/60 hover:bg-slate-800 border border-purple-600/30"
            } p-3 cursor-pointer transition duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]`}
            onClick={() => onSelectEra(era.id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-mono">{era.name}</h3>
              <span className={`px-2 py-0.5 rounded-full bg-${era.colorClass.split('-')[1]}-500/20 ${era.colorClass} text-xs`}>
                {era.integrity}% Integrity
              </span>
            </div>
            <p className="text-sm mt-1 text-slate-300">{era.period}</p>
            <div className="mt-2">
              <div className="h-2 bg-slate-700 rounded-md overflow-hidden">
                <div 
                  className={`h-full rounded-md bg-${era.colorClass.split('-')[1]}-500`} 
                  style={{ width: `${era.integrity}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-slate-400">Anomalies: {era.anomalies}</span>
                <span className="text-slate-400">{era.explored ? "Explored" : "Unexplored"}</span>
              </div>
            </div>
            
            {currentLocation === era.id && (
              <div className="mt-2 flex items-center text-sm text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
                <span>Current Location</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
