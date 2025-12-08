import React from 'react';
import { cn } from '@/lib/utils';
import { Crown, Shield } from 'lucide-react';
import { useUser } from '../providers/UserContext';
import axios from 'axios';

const usernameCache = new Map<string, string>();
const fetchPromises = new Map<string, Promise<string>>();

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
  const { currentUser } = useUser();
  const [username, setUsername] = React.useState<string>(message.username);

  React.useEffect(() => {
    if (message.isOwn || message.username.length !== 24) {
      return;
    }

    const cached = usernameCache.get(message.username);
    if (cached) {
      setUsername(cached);
      return;
    }

    let isActive = true;
    let request = fetchPromises.get(message.username);

    if (!request) {
      request = axios
        .get(`http://35.229.145.142:8087/user/${message.username}`)
        .then(res => {
          const name = res.data?.name || res.data?.username || message.username;
          usernameCache.set(message.username, name);
          fetchPromises.delete(message.username);
          return name;
        })
        .catch(() => {
          fetchPromises.delete(message.username);
          return message.username;
        });
      fetchPromises.set(message.username, request);
    }

    request.then(name => {
      if (isActive) {
        setUsername(name);
      }
    });

    return () => {
      isActive = false;
    };
  }, [message.username, message.isOwn]);

  const displayName = message.isOwn && currentUser ? currentUser.username : username;

  // Format timestamp as YYYY/MM/DD HH:mm
  const formattedTime = `${message.timestamp.getFullYear()}/${(message.timestamp.getMonth()+1).toString().padStart(2,'0')}/${message.timestamp.getDate().toString().padStart(2,'0')} ${message.timestamp.getHours().toString().padStart(2,'0')}:${message.timestamp.getMinutes().toString().padStart(2,'0')}`;

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
          {displayName[0].toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className={cn("font-semibold text-sm", getUsernameColor())}>
              {displayName}
            </span>
            {getRoleIcon()}
            <span className="text-xs text-muted-foreground">
              {formattedTime}
            </span>
          </div>
          
          <div className="text-sm break-words leading-relaxed text-foreground">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
