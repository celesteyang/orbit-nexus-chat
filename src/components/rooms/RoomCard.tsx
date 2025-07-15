
import React from 'react';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Radio, Lock, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
  description: string;
  onlineCount: number;
  isLive: boolean;
  isPrivate: boolean;
  hasPassword: boolean;
  category: string;
  host: {
    username: string;
    isVerified: boolean;
  };
  tags: string[];
}

interface RoomCardProps {
  room: Room;
  onJoinRoom: (roomId: string) => void;
}

export const RoomCard = ({ room, onJoinRoom }: RoomCardProps) => {
  return (
    <Card className={cn(
      "p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl",
      room.isLive && "ring-2 ring-red-500/30 shadow-red-500/20"
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-bold text-lg text-gradient group-hover:text-white transition-colors">
                {room.name}
              </h3>
              {room.hasPassword && (
                <Lock className="w-4 h-4 text-amber-400" />
              )}
              {room.isLive && (
                <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
                  <Radio className="w-3 h-3 mr-1 animate-pulse" />
                  直播中
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors">
              {room.description}
            </p>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {room.host.username[0].toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            主持人: {room.host.username}
          </span>
          {room.host.isVerified && (
            <Crown className="w-3 h-3 text-amber-400" />
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs bg-orbit-purple-500/20 text-orbit-purple-300">
            {room.category}
          </Badge>
          {room.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-white/20 text-muted-foreground">
              {tag}
            </Badge>
          ))}
          {room.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-white/20 text-muted-foreground">
              +{room.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{room.onlineCount} 人在線</span>
          </div>
          
          <Button
            onClick={() => onJoinRoom(room.id)}
            className="btn-orbit text-sm px-4 py-2 hover:scale-105 transition-transform"
          >
            {room.hasPassword ? '輸入密碼加入' : '立即加入'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
