import React from 'react';
import { Card, Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Activity, 
  Zap, 
  Plus,
  TrendingUp,
  Globe,
  Shield,
  Server,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const stats = [
    { label: 'Active Rooms', value: '24', change: '+12%', icon: MessageCircle, color: 'text-orbit-purple-400' },
    { label: 'Online Users', value: '1,234', change: '+8%', icon: Users, color: 'text-orbit-blue-400' },
    { label: 'Messages/min', value: '156', change: '+24%', icon: Activity, color: 'text-orbit-cyan-400' },
    { label: 'Uptime', value: '99.9%', change: '+0.1%', icon: Zap, color: 'text-green-400' }
  ];

  const rooms = [
    { 
      id: 'tech-talk', // Use backend room ID
      name: 'Tech Talk', 
      users: 89, 
      messages: 1234, 
      status: 'active',
      category: 'Technology'
    },
    { 
      id: 'gaming-zone',
      name: 'Gaming Zone', 
      users: 156, 
      messages: 2341, 
      status: 'active',
      category: 'Gaming'
    },
    { 
      id: 'dev-chat',
      name: 'Dev Chat', 
      users: 67, 
      messages: 987, 
      status: 'active',
      category: 'Development'
    },
    { 
      id: 'general', // Use backend room ID for General
      name: 'General', 
      users: 234, 
      messages: 3456, 
      status: 'maintenance',
      category: 'General'
    }
  ];

  const features = [
    { icon: Globe, title: 'WebSocket Real-time', desc: 'Instant message delivery' },
    { icon: Database, title: 'Redis Pub/Sub', desc: 'Scalable message broadcasting' },
    { icon: Shield, title: 'Admin Controls', desc: 'User management & moderation' },
    { icon: Server, title: 'MongoDB Logging', desc: 'Message persistence' }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">ChatOrbit Dashboard</h1>
            <p className="text-muted-foreground">Manage your real-time streaming chat platform</p>
          </div>
          <Button className="btn-orbit">
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full glass-effect ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orbit-purple-600/10 to-orbit-blue-600/10 rounded-full -translate-y-16 translate-x-16" />
            </Card>
          ))}
        </div> */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Rooms */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Rooms</h2>
                <Badge variant="secondary">Live</Badge>
              </div>
              
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-4 glass-effect rounded-lg hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() => navigate(`/chat/${room.id}`)}
                        >
                          {room.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{room.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{room.users}</div>
                        <div className="text-muted-foreground">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{room.messages}</div>
                        <div className="text-muted-foreground">Messages</div>
                      </div>
                      <Badge 
                        variant={room.status === 'active' ? 'default' : 'secondary'}
                        className={room.status === 'active' ? 'bg-green-600' : ''}
                      >
                        {room.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Features */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Platform Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 glass-effect rounded-lg">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orbit-purple-600/20 to-orbit-blue-600/20">
                      <feature.icon className="w-5 h-5 text-orbit-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 btn-orbit">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join a Room
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
