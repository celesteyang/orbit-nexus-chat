
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isBlocked?: boolean;
  isRateLimited?: boolean;
  rateLimitMessage?: string;
  placeholder?: string;
}

export const MessageInput = ({ 
  onSendMessage, 
  isBlocked, 
  isRateLimited, 
  rateLimitMessage,
  placeholder = "輸入訊息..." 
}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isBlocked || isRateLimited) return;
    
    onSendMessage(message.trim());
    setMessage('');
  };

  const isDisabled = isBlocked || isRateLimited || !message.trim();

  return (
    <div className="space-y-3">
      {/* Error Alerts */}
      {isBlocked && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            您已被封鎖，無法發送訊息
          </AlertDescription>
        </Alert>
      )}
      
      {isRateLimited && (
        <Alert className="animate-fade-in border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-200">
            {rateLimitMessage || "發送訊息過於頻繁，請稍後再試"}
          </AlertDescription>
        </Alert>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
              placeholder={isBlocked ? "您已被封鎖" : placeholder}
              disabled={isBlocked}
              className={`pr-16 glass-effect border-white/20 focus:border-orbit-cyan-400/50 transition-all duration-200 ${
                isBlocked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              maxLength={maxLength}
            />
            
            {/* Character Count */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {message.length}/{maxLength}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isDisabled}
            className={`
              px-4 transition-all duration-200 
              ${isDisabled 
                ? 'opacity-50 cursor-not-allowed bg-muted' 
                : 'btn-orbit hover:scale-105 hover:shadow-lg hover:shadow-orbit-purple-500/25'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
