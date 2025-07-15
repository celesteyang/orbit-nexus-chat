
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Bell, 
  Settings, 
  User,
  LogOut,
  Activity,
  Shield
} from 'lucide-react';

interface NavbarProps {
  currentUser?: {
    username: string;
    isAdmin?: boolean;
  };
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">ChatOrbit</span>
            </div>
            
            <Badge variant="secondary" className="hidden sm:flex">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-sm">Dashboard</Button>
            <Button variant="ghost" className="text-sm">Rooms</Button>
            <Button variant="ghost" className="text-sm">Analytics</Button>
          </div>

          {/* Right - User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {currentUser && (
              <>
                {currentUser.isAdmin && (
                  <Badge variant="outline" className="text-amber-400 border-amber-400">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
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

                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>

                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}

            {!currentUser && (
              <Button className="btn-orbit">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
