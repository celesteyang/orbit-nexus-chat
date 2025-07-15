
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Users, 
  Settings, 
  Shield, 
  Mic, 
  MicOff,
  Video,
  VideoOff,
  MoreVertical,
  Ban,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  isAdmin?: boolean;
  isBanned?: boolean;
}

interface User {
  id: string;
  username: string;
  isOnline: boolean;
  isAdmin?: boolean;
  role?: 'viewer' | 'moderator' | 'admin';
}

export const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'StreamHost',
      content: 'Welcome to ChatOrbit! 🚀 Let\'s start the conversation!',
      timestamp: new Date(),
      isAdmin: true
    },
    {
      id: '2',
      username: 'TechViewer',
      content: 'Amazing backend architecture! Love the Redis integration',
      timestamp: new Date(),
    },
    {
      id: '3',
      username: 'CodeMaster',
      content: 'The WebSocket implementation looks solid 💪',
      timestamp: new Date(),
    }
  ]);
  
  const [users] = useState<User[]>([
    { id: '1', username: 'StreamHost', isOnline: true, isAdmin: true, role: 'admin' },
    { id: '2', username: 'TechViewer', isOnline: true, role: 'viewer' },
    { id: '3', username: 'CodeMaster', isOnline: true, role: 'moderator' },
    { id: '4', username: 'DevFan', isOnline: false, role: 'viewer' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      username: 'You',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'moderator': return 'text-orbit-purple-400';
      default: return 'text-orbit-cyan-400';
    }
  };

  const getRoleBadge = (role?: string, isAdmin?: boolean) => {
    if (isAdmin) return <Crown className="w-3 h-3 text-amber-400" />;
    if (role === 'moderator') return <Shield className="w-3 h-3 text-orbit-purple-400" />;
    return null;
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Card className="m-4 mb-0 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">TR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Tech Room</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{users.filter(u => u.isOnline).length} online</span>
                <Badge variant="secondary" className="ml-2">Live</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMicOn(!isMicOn)}
              className={cn(
                "w-10 h-10 rounded-full",
                isMicOn ? "bg-orbit-blue-600 text-white" : "bg-muted"
              )}
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={cn(
                "w-10 h-10 rounded-full",
                isVideoOn ? "bg-orbit-blue-600 text-white" : "bg-muted"
              )}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>

            <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Messages */}
        <div className="flex-1 p-4 pt-2 overflow-hidden">
          <Card className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="group">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {msg.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={cn("font-medium text-sm", getRoleColor())}>
                          {msg.username}
                        </span>
                        {getRoleBadge(undefined, msg.isAdmin)}
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 p-0"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm mt-1 break-words">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 glass-effect"
                />
                <Button type="submit" className="btn-orbit px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>

      {/* Sidebar - Users List */}
      <div className="w-80 p-4 pl-0">
        <Card className="h-full">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Users ({users.length})
            </h3>
          </div>
          
          <div className="p-4 space-y-3 overflow-y-auto">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                      user.isOnline ? "bg-green-500" : "bg-gray-500"
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className={cn("text-sm font-medium", getRoleColor(user.role))}>
                        {user.username}
                      </span>
                      {getRoleBadge(user.role, user.isAdmin)}
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 p-0 text-red-400 hover:text-red-300"
                >
                  <Ban className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
