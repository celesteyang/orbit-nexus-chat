
import React from 'react';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Settings, 
  Mic, 
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  ArrowLeft,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomHeaderProps {
  roomName: string;
  onlineCount: number;
  isVideoOn?: boolean;
  isMicOn?: boolean;
  isSoundOn?: boolean;
  onToggleVideo?: () => void;
  onToggleMic?: () => void;
  onToggleSound?: () => void;
  onLeaveRoom?: () => void;
  isLive?: boolean;
}

export const RoomHeader = ({
  roomName,
  onlineCount,
  isVideoOn = false,
  isMicOn = false,
  isSoundOn = true,
  onToggleVideo,
  onToggleMic,
  onToggleSound,
  onLeaveRoom,
  isLive = true
}: RoomHeaderProps) => {
  return (
    <Card className="m-4 mb-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLeaveRoom}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {/* Room Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center relative">
              <span className="text-white font-bold text-lg">
                {roomName[0]?.toUpperCase() || 'R'}
              </span>
              {isLive && (
                <div className="absolute -top-1 -right-1">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-gradient">{roomName}</h1>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{onlineCount} 人在線</span>
                </div>
                {isLive && (
                  <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
                    <Radio className="w-3 h-3 mr-1" />
                    直播中
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSound}
            className={cn(
              "w-10 h-10 rounded-full transition-all duration-200",
              isSoundOn 
                ? "bg-orbit-blue-600 text-white hover:bg-orbit-blue-700" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMic}
            className={cn(
              "w-10 h-10 rounded-full transition-all duration-200",
              isMicOn 
                ? "bg-orbit-blue-600 text-white hover:bg-orbit-blue-700" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVideo}
            className={cn(
              "w-10 h-10 rounded-full transition-all duration-200",
              isVideoOn 
                ? "bg-orbit-blue-600 text-white hover:bg-orbit-blue-700" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="w-10 h-10 rounded-full hover:bg-white/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
