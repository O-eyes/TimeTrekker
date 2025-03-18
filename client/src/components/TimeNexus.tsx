import { useState, useEffect } from "react";
import TimeSidebar from "./TimeSidebar";
import ClassSelection from "./ClassSelection";
import TimeEraContent from "./TimeEraContent";
import MessageLog from "./MessageLog";
import { Era, PlayerClass, Quest, Message } from "@/types";
import { 
  Clock, User, Zap, 
} from "lucide-react";

const initialEras: Era[] = [
  {
    id: "ancient-egypt",
    name: "Ancient Egypt",
    period: "3100 BCE - 332 BCE",
    description: "The Age of Pyramids and Pharaohs",
    integrity: 85,
    anomalies: 3,
    explored: false,
    colorClass: "text-yellow-500", // nexus-warning
    locations: [
      { name: "Giza Plateau", description: "Construction site of the Great Pyramid", colorClass: "bg-sky-500" },
      { name: "Pharaoh's Palace", description: "Royal residence of Khufu", colorClass: "bg-purple-600" },
      { name: "Nile River Delta", description: "Trade hub and spiritual center", colorClass: "bg-amber-500" }
    ],
    anomalyDetails: [
      { name: "Pyramid Construction Interference", description: "Timeline deviation: Modern tools appearing in 2500 BCE", severity: "high" },
      { name: "Temporal Echo in Royal Court", description: "Fragments of future events influencing royal decisions", severity: "medium" },
      { name: "Agricultural Timeline Shift", description: "Crops from future centuries appearing in fields", severity: "medium" }
    ]
  },
  {
    id: "roman-empire",
    name: "Roman Empire",
    period: "27 BCE - 476 CE",
    description: "The Golden Age of Rome",
    integrity: 72,
    anomalies: 5,
    explored: true,
    colorClass: "text-amber-500" // nexus-accent
  },
  {
    id: "medieval-europe",
    name: "Medieval Europe",
    period: "476 CE - 1500 CE",
    description: "Age of Knights and Castles",
    integrity: 91,
    anomalies: 1,
    explored: false,
    colorClass: "text-sky-500" // nexus-secondary
  },
  {
    id: "industrial-revolution",
    name: "Industrial Revolution",
    period: "1760 CE - 1840 CE",
    description: "The Machine Age",
    integrity: 64,
    anomalies: 7,
    explored: true,
    colorClass: "text-red-500" // nexus-danger
  }
];

export default function TimeNexus() {
  const [playerClass, setPlayerClass] = useState<PlayerClass>(null);
  const [currentLocation, setCurrentLocation] = useState<string>("nexus");
  const [eras, setEras] = useState<Era[]>(initialEras);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { type: "SYSTEM", text: "Welcome to the Time Nexus. Please select your temporal class to begin.", timestamp: Date.now() }
  ]);

  const getDisplayNameForClass = (className: PlayerClass) => {
    switch (className) {
      case "time-mage": return "Time Mage";
      case "historian": return "Historian";
      case "paradox-warrior": return "Paradox Warrior";
      default: return "";
    }
  };

  const addMessage = (type: Message["type"], text: string) => {
    const newMessage = { type, text, timestamp: Date.now() };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleClassSelect = (selectedClass: PlayerClass) => {
    setPlayerClass(selectedClass);
    const displayName = getDisplayNameForClass(selectedClass);
    addMessage("SUCCESS", `You have selected the ${displayName} class. Your temporal abilities are now active.`);
  };

  const handleEraSelect = (eraId: string) => {
    // Can't travel without selecting a class first
    if (!playerClass) return;
    
    // Set current location to the selected era
    setCurrentLocation(eraId);
    
    // Find the selected era
    const selectedEra = eras.find(era => era.id === eraId);
    if (!selectedEra) return;
    
    // Generate travel message
    addMessage("TRAVEL", `You have traveled to ${selectedEra.name} (${selectedEra.period}).`);
    
    // If the era has not been explored yet, mark as explored
    if (!selectedEra.explored) {
      setEras(prev => prev.map(era => 
        era.id === eraId ? { ...era, explored: true } : era
      ));
    }
    
    // Generate quest if one doesn't exist for this era yet
    if (!activeQuest || activeQuest.eraId !== eraId) {
      const newQuest: Quest = {
        id: `quest-${Date.now()}`,
        title: `Resolve an anomaly in ${selectedEra.name}`,
        description: selectedEra.id === "ancient-egypt" 
          ? "The construction of the Great Pyramid is facing timeline interference. Investigate and fix the anomaly."
          : `Timeline anomalies detected in ${selectedEra.name}. Restore the proper flow of history.`,
        eraId: eraId,
        totalSteps: 5,
        currentStep: 0,
        reward: selectedEra.id === "ancient-egypt" 
          ? "Temporal Artifact - Pharaoh's Chronometer"
          : `Temporal Artifact from ${selectedEra.name}`,
        isCompleted: false
      };
      
      setActiveQuest(newQuest);
      addMessage("QUEST", `New quest accepted: "${newQuest.title}".`);
    }
    
    // Add warning about timeline integrity
    addMessage("WARNING", `Timeline integrity at ${selectedEra.integrity}%. Multiple anomalies detected in this era.`);
  };

  const advanceQuest = () => {
    if (!activeQuest || activeQuest.isCompleted) return;
    
    if (activeQuest.currentStep < activeQuest.totalSteps) {
      const updatedQuest = {
        ...activeQuest,
        currentStep: activeQuest.currentStep + 1
      };
      
      // Check if quest is now complete
      if (updatedQuest.currentStep === updatedQuest.totalSteps) {
        updatedQuest.isCompleted = true;
        setActiveQuest(updatedQuest);
        addMessage("SUCCESS", `Quest completed: "${activeQuest.title}". Received reward: ${activeQuest.reward}.`);
        
        // Update era integrity since the quest is completed
        const eraId = activeQuest.eraId;
        setEras(prev => prev.map(era => {
          if (era.id === eraId) {
            // Increase integrity by 5-15% but don't exceed 100%
            const increase = Math.floor(Math.random() * 11) + 5;
            const newIntegrity = Math.min(100, era.integrity + increase);
            // Decrease anomalies by 1 (minimum 0)
            const newAnomalies = Math.max(0, era.anomalies - 1);
            
            return { ...era, integrity: newIntegrity, anomalies: newAnomalies };
          }
          return era;
        }));
      } else {
        // Just advance the quest
        setActiveQuest(updatedQuest);
        addMessage("QUEST", `Quest progress updated: ${updatedQuest.currentStep}/${updatedQuest.totalSteps} steps completed.`);
      }
    }
  };

  const handleClearLog = () => {
    setMessages([{ type: "SYSTEM", text: "Message log cleared.", timestamp: Date.now() }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200 font-sans">
      {/* Header */}
      <header className="bg-slate-950 p-4 border-b border-purple-600/30">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-medium font-mono font-bold text-white flex items-center">
            <Clock className="h-8 w-8 mr-2 text-sky-500" />
            <span>Time Nexus</span>
          </h1>
          
          {/* Player Status */}
          <div className="flex items-center space-x-2">
            {playerClass && (
              <div className="hidden md:flex items-center mr-2">
                <Zap className="h-5 w-5 mr-1 text-amber-500" />
                <span className="text-amber-500 font-medium text-sm">{getDisplayNameForClass(playerClass)}</span>
              </div>
            )}
            <div className="bg-slate-800 rounded-full p-1 shadow-[0_0_15px_rgba(109,40,217,0.4)]">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Time Era Sidebar */}
        <TimeSidebar 
          eras={eras} 
          currentLocation={currentLocation} 
          onSelectEra={handleEraSelect} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {/* Show class selection if no class selected yet */}
            {!playerClass ? (
              <ClassSelection onSelectClass={handleClassSelect} />
            ) : (
              <TimeEraContent 
                currentLocation={currentLocation}
                eras={eras}
                activeQuest={activeQuest}
                onAdvanceQuest={advanceQuest}
              />
            )}
          </div>
          
          {/* Message Log */}
          <MessageLog messages={messages} onClearLog={handleClearLog} />
        </div>
      </main>
    </div>
  );
}
