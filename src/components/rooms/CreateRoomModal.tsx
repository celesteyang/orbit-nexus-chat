
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { X, Plus } from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomData: any) => void;
}

const categories = ['科技', '遊戲', '音樂', '教育', '娛樂', '生活', '運動', '藝術'];
const suggestedTags = ['程式設計', 'AI', 'React', 'WebSocket', '直播', '討論', '學習', '分享'];

export const CreateRoomModal = ({ isOpen, onClose, onCreateRoom }: CreateRoomModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: [] as string[],
    isPrivate: false,
    password: '',
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRoom(formData);
    setFormData({
      name: '',
      description: '',
      category: '',
      tags: [],
      isPrivate: false,
      password: '',
    });
    onClose();
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-effect border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gradient">
            創建新聊天室
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div className="space-y-2">
            <Label htmlFor="name">聊天室名稱 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="輸入聊天室名稱"
              className="glass-effect border-white/20"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">聊天室描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="簡單描述這個聊天室的主題..."
              className="glass-effect border-white/20 min-h-[80px]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>分類 *</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={formData.category === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    formData.category === category
                      ? "bg-orbit-purple-600 text-white"
                      : "border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, category }))}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>標籤 (最多 5 個)</Label>
            
            {/* Current Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-orbit-blue-500/20 text-orbit-blue-300 pr-1"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-1 hover:bg-white/10"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add New Tag */}
            {formData.tags.length < 5 && (
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="新增標籤"
                  className="glass-effect border-white/20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(newTag);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTag(newTag)}
                  className="border-white/20 hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Suggested Tags */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">建議標籤:</Label>
              <div className="flex flex-wrap gap-1">
                {suggestedTags
                  .filter(tag => !formData.tags.includes(tag))
                  .slice(0, 6)
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer text-xs border-white/20 hover:bg-white/10"
                      onClick={() => addTag(tag)}
                    >
                      + {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">密碼 (可選)</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="設定聊天室密碼"
              className="glass-effect border-white/20"
            />
            <p className="text-xs text-muted-foreground">
              留空則為公開聊天室
            </p>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-white/20 hover:bg-white/10"
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            className="btn-orbit"
            disabled={!formData.name.trim() || !formData.category}
          >
            創建聊天室
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
