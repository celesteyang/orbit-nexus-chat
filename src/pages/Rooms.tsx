
import React, { useState } from 'react';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RoomCard } from '@/components/rooms/RoomCard';
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  TrendingUp, 
  Users, 
  Radio,
  Clock
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  onlineCount: number;
  isLive: boolean;
  isPrivate: boolean;
  hasPassword: boolean;
  category: string;
  host: {
    username: string;
    isVerified: boolean;
  };
  tags: string[];
  createdAt: Date;
}

const Rooms = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('onlineCount');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [rooms] = useState<Room[]>([
    {
      id: '1',
      name: '科技討論室',
      description: '討論最新的科技趨勢、程式設計技巧和開發經驗分享',
      onlineCount: 142,
      isLive: true,
      isPrivate: false,
      hasPassword: false,
      category: '科技',
      host: { username: '科技大師', isVerified: true },
      tags: ['程式設計', 'AI', 'React', 'WebSocket'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: '遊戲實況聊天',
      description: '一起討論遊戲、觀看實況，分享遊戲心得和攻略',
      onlineCount: 89,
      isLive: true,
      isPrivate: false,
      hasPassword: false,
      category: '遊戲',
      host: { username: '遊戲高手', isVerified: false },
      tags: ['遊戲', '實況', '攻略', '娛樂'],
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: '學習交流區',
      description: '學習資源分享、讀書心得討論、考試經驗交流',
      onlineCount: 67,
      isLive: false,
      isPrivate: false,
      hasPassword: true,
      category: '教育',
      host: { username: '學習達人', isVerified: true },
      tags: ['學習', '分享', '討論', '成長'],
      createdAt: new Date('2024-01-10')
    },
    {
      id: '4',
      name: '音樂分享空間',
      description: '分享喜愛的音樂、討論音樂創作、音樂人交流平台',
      onlineCount: 45,
      isLive: false,
      isPrivate: false,
      hasPassword: false,
      category: '音樂',
      host: { username: '音樂愛好者', isVerified: false },
      tags: ['音樂', '創作', '分享', '藝術'],
      createdAt: new Date('2024-01-25')
    },
    {
      id: '5',
      name: '創業聊天室',
      description: '創業經驗分享、商業模式討論、投資理財交流',
      onlineCount: 23,
      isLive: true,
      isPrivate: true,
      hasPassword: true,
      category: '商業',
      host: { username: '創業家', isVerified: true },
      tags: ['創業', '商業', '投資', '理財'],
      createdAt: new Date('2024-01-12')
    }
  ]);

  const categories = ['全部', '科技', '遊戲', '教育', '音樂', '商業', '娛樂', '生活'];

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '全部' || room.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'onlineCount':
          return b.onlineCount - a.onlineCount;
        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleJoinRoom = (roomId: string) => {
    navigate(`/chat/${roomId}`);
  };

  const handleCreateRoom = (roomData: any) => {
    console.log('Creating room:', roomData);
    // 這裡會調用 API 創建房間
  };

  const liveRooms = rooms.filter(room => room.isLive);
  const totalOnline = rooms.reduce((sum, room) => sum + room.onlineCount, 0);

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">
            探索聊天室
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            加入各種有趣的聊天室，與志同道合的朋友一起交流討論
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orbit-cyan-400">{rooms.length}</div>
              <div className="text-sm text-muted-foreground">個聊天室</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orbit-purple-400">{liveRooms.length}</div>
              <div className="text-sm text-muted-foreground">正在直播</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orbit-blue-400">{totalOnline}</div>
              <div className="text-sm text-muted-foreground">人在線</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋聊天室..."
              className="pl-10 glass-effect border-white/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedCategory === category
                    ? "bg-orbit-purple-600 text-white"
                    : "border-white/20 hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Sort & Create */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10"
              onClick={() => setSortBy(sortBy === 'onlineCount' ? 'createdAt' : 'onlineCount')}
            >
              <Filter className="w-4 h-4 mr-2" />
              {sortBy === 'onlineCount' ? '熱門度' : '最新'}
            </Button>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-orbit"
            >
              <Plus className="w-4 h-4 mr-2" />
              創建聊天室
            </Button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onJoinRoom={handleJoinRoom}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">找不到相關聊天室</h3>
            <p className="text-muted-foreground mb-4">
              試試其他關鍵字或創建一個新的聊天室
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-orbit"
            >
              <Plus className="w-4 h-4 mr-2" />
              創建聊天室
            </Button>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </Container>
  );
};

export default Rooms;
