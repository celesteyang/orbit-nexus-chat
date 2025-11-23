import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/layout';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { OnlineUsers } from './OnlineUsers';
import { RoomHeader } from './RoomHeader';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  isAdmin?: boolean;
  isModerator?: boolean;
  isOwn?: boolean;
}

export const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Fetch chat history from backend API
  useEffect(() => {
    if (!roomId) return;
    // Always use lowercase for roomId, and map "General" to "general"
    const apiRoomId = roomId.toLowerCase() === "general" ? "general" : roomId;
    fetch(`http://localhost:8088/chat/history/${apiRoomId}`)
      .then(res => res.json())
      .then(data => {
        // Map API response to Message type
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          username: msg.user_id, // If you have username mapping, replace this
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formatted);
      });
  }, [roomId]);

  // Auto-scroll logic
  useEffect(() => {
    if (isAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    setIsAutoScroll(scrollHeight - scrollTop - clientHeight < 10);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RoomHeader
        roomName="General"
        onlineCount={5}
        isLive={true}
        onLeaveRoom={() => navigate('/rooms')}
      />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col p-4 pt-2">
          <Card className="flex-1 flex flex-col overflow-hidden">
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
            {/* MessageInput and other controls */}
          </Card>
        </div>
        {/* OnlineUsers sidebar */}
      </div>
    </div>
  );
};