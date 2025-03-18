import { useEffect, useRef, useState } from 'react';
import { Message, COLOR_MAP } from '@/types/game';
import { MessageSquareText, Trash2 } from 'lucide-react';

interface MessageLogProps {
  messages: Message[];
}

const MessageLog = ({ messages }: MessageLogProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`bg-nexus-primary/80 border-t border-nexus-accent transition-all ${isMinimized ? 'h-12' : 'h-[19vh]'}`}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-nexus-accent">
        <h3 className="text-sm font-medium text-nexus-cyan">Message Log</h3>
        <button 
          onClick={() => setIsMinimized(!isMinimized)} 
          className="text-nexus-light hover:text-nexus-cyan"
        >
          {isMinimized ? 'Maximize' : 'Minimize'}
        </button>
      </div>
      <div className={`${isMinimized ? 'hidden' : 'block'} overflow-y-auto custom-scrollbar`}>
        <div ref={messagesEndRef} className="p-4 flex flex-col"> {/* Added ref for scrolling */}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`p-2 rounded bg-nexus-dark/50 border-l-4 ${COLOR_MAP[message.type]}`}
            >
              <span className="text-xs text-nexus-light mr-2">{message.timestamp}</span>
              <span className="text-white">{message.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageLog;