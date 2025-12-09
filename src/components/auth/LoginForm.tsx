import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, MessageCircle, Zap } from 'lucide-react';
import { useUser } from '../providers/UserContext';
import { buildHttpUrl, normalizeApiBase } from '@/lib/api';
const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_AUTH_URL);

const persistToken = (token: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem('token', token);
    window.localStorage.removeItem('token');
  } catch (err) {
    console.error('Failed to persist token in sessionStorage:', err);
    window.localStorage.setItem('token', token);
  }
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { login } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(buildHttpUrl(API_BASE_URL, '/login'), formData, {
        withCredentials: true,
      });

      console.log('Login successful:', response.data);
      
      const { token, user } = response.data as {
        token: string;
        user?: {
          id?: string;
          username?: string;
          email?: string;
          isAdmin?: boolean;
        };
      };

      persistToken(token);

      // Decode the JWT to get user info
      const payload = JSON.parse(atob(token.split('.')[1])) as {
        user_id?: string;
        sub?: string;
        email?: string;
        username?: string;
        isAdmin?: boolean;
      };
      const primaryEmail = user?.email || payload.email || formData.email;
      const fallbackUsername = primaryEmail ? primaryEmail.split('@')[0] : '';
      const formattedUser = {
        id: user?.id || payload.user_id || payload.sub || '',
        username: user?.username || payload.username || fallbackUsername || primaryEmail || '',
        email: primaryEmail,
        isAdmin: user?.isAdmin ?? Boolean(payload.isAdmin)
      };
      // 呼叫 login 函式，將格式化後的使用者資訊存入全局狀態
      login(formattedUser);
      // 導航到主頁
      navigate('/');
      
    } catch (err) {
      console.error('Login failed:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || '登入失敗，請檢查電子郵件和密碼。');
      } else {
        console.error(err);
        setError('發生未知錯誤。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 animate-glow">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient">ChatOrbit</h1>
            <p className="text-muted-foreground mt-2">
              Join the real-time streaming revolution
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-muted-foreground mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 錯誤訊息顯示區 - 恢復到簡單的文字樣式 */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="glass-effect pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border-muted" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-sm text-orbit-purple-400 hover:text-orbit-purple-300">
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-orbit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button onClick={() => navigate('/register')} className="text-orbit-purple-400 hover:text-orbit-purple-300 font-medium">
              Sign up
            </button>
          </div>
        </Card>

        {/* Features */}
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
