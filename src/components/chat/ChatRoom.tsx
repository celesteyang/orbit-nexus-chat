import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/layout';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { OnlineUsers } from './OnlineUsers';
import { RoomHeader } from './RoomHeader';
import { useUser } from '../providers/UserContext';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  isAdmin?: boolean;
  isModerator?: boolean;
  isOwn?: boolean;
}

interface ApiMessage {
  id: string;
  user_id: string;
  content: string;
  timestamp: string;
}

interface WsMessage extends ApiMessage {
  room_id: string;
}

const sortMessagesByTime = (msgs: Message[]) =>
  msgs.slice().sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

export const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // WebSocket connection
  const ws = React.useRef<WebSocket | null>(null);
  const { currentUser } = useUser();
  const currentUserId = currentUser?.id;
  const normalizedRoomId = roomId || 'general';
  const displayRoomName = normalizedRoomId.charAt(0).toUpperCase() + normalizedRoomId.slice(1);

  useEffect(() => {
    if (!currentUser) return;
    // Replace with your JWT token logic
    const token = localStorage.getItem('token');
    if (!token) return;
    ws.current = new WebSocket(`ws://localhost:8088/ws/chat?token=${token}`);
    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };
    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data) as WsMessage;
      setMessages(prev => {
        const isOwnMessage = Boolean(currentUserId && msg.user_id === currentUserId);
        if (isOwnMessage) {
          return prev;
        }
        console.log('Received message:', msg);
        console.log('Current user:', currentUser);
        const next = [...prev, {
          id: msg.id,
          username: msg.user_id,
          content: msg.content,
          timestamp: new Date(msg.timestamp),
          isOwn: isOwnMessage
        }];
        return sortMessagesByTime(next);
      });
    };
    return () => {
      ws.current?.close();
    };
  }, [currentUser, currentUserId, roomId]);

  // Fetch chat history from backend API
  useEffect(() => {
    if (!roomId) return;
    // Always use lowercase for roomId, and map "General" to "general"
    const apiRoomId = roomId.toLowerCase() === "general" ? "general" : roomId;
    fetch(`http://localhost:8088/chat/history/${apiRoomId}`)
      .then(res => res.json())
      .then((data: ApiMessage[]) => {
        // Map API response to Message type
        const formatted = sortMessagesByTime(data.map((msg) => ({
          id: msg.id,
          username: msg.user_id, // If you have username mapping, replace this
          content: msg.content,
          timestamp: new Date(msg.timestamp),
          isOwn: currentUserId ? msg.user_id === currentUserId : false
        })));
        setMessages(formatted);
      });
  }, [roomId, currentUserId]);

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

  // Send message via WebSocket
  const handleSendMessage = (content: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    ws.current.send(JSON.stringify({ room_id: normalizedRoomId, content }));
    // Optimistically add message to UI
    setMessages(prev => sortMessagesByTime([...prev, {
      id: Math.random().toString(36).slice(2),
      username: currentUser ? currentUser.username : '',
      content,
      timestamp: new Date(),
      isOwn: true
    }]));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RoomHeader
        roomName={displayRoomName}
        onlineCount={5}
        isLive={true}
        onLeaveRoom={() => navigate('/')}
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
            <div className="w-full flex justify-end p-2 bg-transparent">
              <MessageInput 
                onSendMessage={handleSendMessage} 
                placeholder="Type a message..."
              />
            </div>
          </Card>
        </div>
        {/* OnlineUsers sidebar */}
      </div>
    </div>
  );
};
