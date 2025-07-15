
import React from 'react';
import { cn } from '@/lib/utils';
import { Crown, Shield } from 'lucide-react';

interface MessageItemProps {
  message: {
    id: string;
    username: string;
    content: string;
    timestamp: Date;
    isAdmin?: boolean;
    isModerator?: boolean;
    isOwn?: boolean;
  };
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const getRoleIcon = () => {
    if (message.isAdmin) return <Crown className="w-3 h-3 text-amber-400" />;
    if (message.isModerator) return <Shield className="w-3 h-3 text-orbit-purple-400" />;
    return null;
  };

  const getUsernameColor = () => {
    if (message.isAdmin) return 'text-amber-400';
    if (message.isModerator) return 'text-orbit-purple-400';
    return 'text-orbit-cyan-400';
  };

  return (
    <div className={cn(
      "group animate-fade-in p-3 rounded-lg transition-all duration-200 hover:bg-white/5",
      message.isOwn && "ml-8 bg-gradient-to-r from-orbit-purple-500/10 to-orbit-blue-500/10 border border-orbit-purple-500/20"
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-offset-2 ring-offset-background",
          message.isOwn 
            ? "bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 ring-orbit-purple-400/50" 
            : "bg-gradient-to-r from-orbit-cyan-600 to-orbit-blue-600 ring-orbit-cyan-400/50"
        )}>
          {message.username[0].toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className={cn("font-semibold text-sm", getUsernameColor())}>
              {message.username}
            </span>
            {getRoleIcon()}
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <div className={cn(
            "text-sm break-words leading-relaxed",
            message.isOwn ? "text-white" : "text-foreground"
          )}>
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
