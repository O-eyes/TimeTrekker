import { useEffect, useRef } from 'react';
import { Message, COLOR_MAP } from '@/types/game';
import { MessageSquareText, Trash2 } from 'lucide-react';

interface MessageLogProps {
  messages: Message[];
}

const MessageLog = ({ messages }: MessageLogProps) => {
  const messageLogRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTop = messageLogRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="h-48 border-t border-nexus-accent bg-nexus-primary overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b border-nexus-accent flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquareText className="w-5 h-5 text-nexus-cyan" />
          <h3 className="font-medium text-white">Message Log</h3>
        </div>
        <button className="text-nexus-light hover:text-white transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        ref={messageLogRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2 text-sm font-mono"
      >
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
  );
};

export default MessageLog;
