
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Bell, 
  Settings, 
  User,
  LogOut,
  Activity,
  Shield,
  Home,
  Users
} from 'lucide-react';

interface NavbarProps {
  currentUser?: {
    username: string;
    isAdmin?: boolean;
  };
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">ChatOrbit</span>
            </div>
            
            <Badge variant="secondary" className="hidden sm:flex">
              <Activity className="w-3 h-3 mr-1" />
              線上
            </Badge>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="text-sm hover:text-orbit-cyan-400"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              首頁
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm hover:text-orbit-purple-400"
              onClick={() => navigate('/rooms')}
            >
              <Users className="w-4 h-4 mr-2" />
              聊天室
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm hover:text-orbit-blue-400"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              即時聊天
            </Button>
          </div>

          {/* Right - User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative hover:bg-white/10">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            {currentUser && (
              <>
                {currentUser.isAdmin && (
                  <Badge variant="outline" className="text-amber-400 border-amber-400">
                    <Shield className="w-3 h-3 mr-1" />
                    管理員
                  </Badge>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {currentUser.username[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {currentUser.username}
                  </span>
                </div>

                <Button variant="ghost" size="sm" className="hover:bg-white/10">
                  <Settings className="w-4 h-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={() => navigate('/login')}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}

            {!currentUser && (
              <Button 
                className="btn-orbit"
                onClick={() => navigate('/login')}
              >
                登入
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
