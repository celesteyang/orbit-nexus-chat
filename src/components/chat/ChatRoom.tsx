
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/layout';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { OnlineUsers } from './OnlineUsers';
import { RoomHeader } from './RoomHeader';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  isAdmin?: boolean;
  isModerator?: boolean;
  isOwn?: boolean;
}

interface User {
  id: string;
  username: string;
  isOnline: boolean;
  isAdmin?: boolean;
  isModerator?: boolean;
}

export const ChatRoom = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: '直播主',
      content: '歡迎來到 ChatOrbit！🚀 讓我們開始聊天吧！',
      timestamp: new Date(),
      isAdmin: true
    },
    {
      id: '2',
      username: '技術愛好者',
      content: '太棒了！這個後端架構看起來很厲害 💪',
      timestamp: new Date(),
    },
    {
      id: '3',
      username: '程式高手',
      content: 'WebSocket 整合看起來很穩定，Redis 也用得很好！',
      timestamp: new Date(),
      isModerator: true
    },
    {
      id: '4',
      username: '你',
      content: '哇！這個聊天室設計得真棒！',
      timestamp: new Date(),
      isOwn: true
    }
  ]);
  
  const [users] = useState<User[]>([
    { id: '1', username: '直播主', isOnline: true, isAdmin: true },
    { id: '2', username: '技術愛好者', isOnline: true },
    { id: '3', username: '程式高手', isOnline: true, isModerator: true },
    { id: '4', username: '你', isOnline: true },
    { id: '5', username: '觀眾A', isOnline: true },
    { id: '6', username: '開發者B', isOnline: false },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const scrollToBottom = () => {
    if (isAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAutoScroll]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
    setIsAutoScroll(isAtBottom);
  };

  const handleSendMessage = (content: string) => {
    // 模擬限流檢查
    if (Math.random() < 0.1) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 3000);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      username: '你',
      content,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleLeaveRoom = () => {
    navigate('/rooms');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <RoomHeader
        roomName="科技討論室"
        onlineCount={users.filter(u => u.isOnline).length}
        isVideoOn={isVideoOn}
        isMicOn={isMicOn}
        isSoundOn={isSoundOn}
        onToggleVideo={() => setIsVideoOn(!isVideoOn)}
        onToggleMic={() => setIsMicOn(!isMicOn)}
        onToggleSound={() => setIsSoundOn(!isSoundOn)}
        onLeaveRoom={handleLeaveRoom}
        isLive={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4 pt-2">
          <Card className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-2"
              onScroll={handleScroll}
            >
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Auto-scroll indicator */}
            {!isAutoScroll && (
              <div className="px-4 py-2 border-t border-white/10">
                <button
                  onClick={() => setIsAutoScroll(true)}
                  className="text-xs text-orbit-cyan-400 hover:text-orbit-cyan-300 transition-colors"
                >
                  ↓ 點擊回到最新訊息
                </button>
              </div>
            )}

            {/* Message Input */}
            <div className="border-t border-white/10 p-4">
              <MessageInput
                onSendMessage={handleSendMessage}
                isBlocked={isBlocked}
                isRateLimited={isRateLimited}
                placeholder="輸入訊息..."
              />
            </div>
          </Card>
        </div>

        {/* Sidebar - Online Users */}
        <div className="w-80 p-4 pl-0">
          <OnlineUsers 
            users={users} 
            currentUserId="4"
          />
        </div>
      </div>
    </div>
  );
};
