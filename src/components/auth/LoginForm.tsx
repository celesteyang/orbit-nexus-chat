
import React, { useState } from 'react';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, MessageCircle, Zap } from 'lucide-react';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
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
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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

            <Button type="submit" className="w-full btn-orbit">
              <Zap className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button className="text-orbit-purple-400 hover:text-orbit-purple-300 font-medium">
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
