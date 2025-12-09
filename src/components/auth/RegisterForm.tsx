import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Zap } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_AUTH_URL;

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);

      console.log('Registration successful:', response.data);
      setSuccessMessage('註冊成功！您現在可以登入了。');

      // 註冊成功後導向登入頁面，可以加上延遲以讓使用者看到成功訊息
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 秒後導航

    } catch (err) {
      console.error('Registration failed:', err);
      if (axios.isAxiosError(err) && err.response) {
        // 從後端回傳的錯誤訊息中擷取詳細資訊
        setError(err.response.data.error || '註冊失敗，請檢查輸入內容。');
      } else {
        setError('發生未知錯誤。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* ... (UI 標誌和標題，可以從你的 LoginForm 複製過來) ... */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 animate-glow">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient">ChatOrbit</h1>
            <p className="text-muted-foreground mt-2">
              Create your account to start chatting
            </p>
          </div>
        </div>
        
        {/* 註冊表單 */}
        <Card className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Create an account</h2>
            <p className="text-muted-foreground mt-1">
              Join us today!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 錯誤和成功訊息顯示區 */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm text-center">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleInputChange}
                className="glass-effect"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="glass-effect"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              {/* 這裡可以加上 showPassword 的邏輯，為了簡潔我暫時省略 */}
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="glass-effect"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-orbit"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Sign Up
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-orbit-purple-400 hover:text-orbit-purple-300 font-medium"
            >
              Log in
            </button>
          </div>
        </Card>

        {/* ... (UI 特色展示，可以從你的 LoginForm 複製過來) ... */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="glass-effect rounded-lg p-4">
            <div className="text-orbit-cyan-400 font-mono text-sm">WebSocket</div>
            <div className="text-xs text-muted-foreground">Real-time</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-orbit-blue-400 font-mono text-sm">Redis</div>
            <div className="text-xs text-muted-foreground">Pub/Sub</div>
          </div>
        </div>
      </div>
    </div>
  );
};