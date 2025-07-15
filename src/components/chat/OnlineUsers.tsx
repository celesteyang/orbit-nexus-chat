
import React from 'react';
import { Card } from '@/components/ui/layout';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Shield, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  username: string;
  isOnline: boolean;
  isAdmin?: boolean;
  isModerator?: boolean;
}

interface OnlineUsersProps {
  users: User[];
  currentUserId?: string;
}

export const OnlineUsers = ({ users, currentUserId }: OnlineUsersProps) => {
  const onlineUsers = users.filter(user => user.isOnline);

  const getRoleIcon = (user: User) => {
    if (user.isAdmin) return <Crown className="w-3 h-3 text-amber-400" />;
    if (user.isModerator) return <Shield className="w-3 h-3 text-orbit-purple-400" />;
    return null;
  };

  const getRoleColor = (user: User) => {
    if (user.isAdmin) return 'text-amber-400';
    if (user.isModerator) return 'text-orbit-purple-400';
    return 'text-orbit-cyan-400';
  };

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center text-gradient">
            <Users className="w-4 h-4 mr-2" />
            在線用戶
          </h3>
          <Badge variant="secondary" className="bg-orbit-blue-500/20 text-orbit-blue-300">
            {onlineUsers.length}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3 overflow-y-auto max-h-80">
        {onlineUsers.map((user) => (
          <div 
            key={user.id} 
            className={cn(
              "flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/5",
              user.id === currentUserId && "bg-gradient-to-r from-orbit-purple-500/10 to-orbit-blue-500/10 border border-orbit-purple-500/20"
            )}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse-slow" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className={cn("text-sm font-medium truncate", getRoleColor(user))}>
                  {user.username}
                  {user.id === currentUserId && " (你)"}
                </span>
                {getRoleIcon(user)}
              </div>
            </div>

            {user.id === currentUserId && (
              <UserCheck className="w-4 h-4 text-orbit-cyan-400" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
