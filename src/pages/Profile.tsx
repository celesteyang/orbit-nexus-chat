import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/providers/UserContext';
import { Card } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, User, Shield, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8089';
const Profile = () => {
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [form, setForm] = useState({ oldPwd: '', newPwd: '' });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');
        try {
            await axios.post(
                `${API_BASE_URL}/change-password`,
                {
                    old_password: form.oldPwd,
                    new_password: form.newPwd,
                },
                { withCredentials: true }
            );
            setMsg('密碼修改成功！');
            setForm({ oldPwd: '', newPwd: '' });
            setShowChangePwd(false);
            setIsRedirecting(true);
            setTimeout(() => {
                navigate('/');
            }, 1000); // 1秒後導頁，讓使用者看到成功訊息
        } catch (err: any) {
            setMsg(err?.response?.data?.error || '密碼修改失敗');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) return <div className="p-8 text-center">請先登入</div>;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full space-y-8 p-8">
                {isRedirecting ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-12 h-12 text-orbit-blue-500 animate-spin mb-4" />
                        <div className="text-lg font-semibold text-gradient">密碼修改成功，正在跳轉...</div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orbit-purple-600 to-orbit-blue-600 flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{currentUser.username}</h2>
                                {currentUser.isAdmin && (
                                    <span className="text-xs text-amber-400 flex items-center"><Shield className="w-3 h-3 mr-1" /> 管理員</span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-muted-foreground">帳號：{currentUser.username}</div>
                            <div className="text-muted-foreground">權限：{currentUser.isAdmin ? 'Admin' : 'User'}</div>
                        </div>
                        <Button className="w-full mt-6 btn-orbit" onClick={() => setShowChangePwd(v => !v)}>
                            <Lock className="w-4 h-4 mr-2" /> 修改密碼
                        </Button>
                        {showChangePwd && (
                            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="oldPwd">舊密碼</Label>
                                    <Input id="oldPwd" name="oldPwd" type="password" value={form.oldPwd} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPwd">新密碼</Label>
                                    <Input id="newPwd" name="newPwd" type="password" value={form.newPwd} onChange={handleChange} required />
                                </div>
                                {msg && <div className="text-center text-sm text-red-500">{msg}</div>}
                                <Button type="submit" className="w-full btn-orbit" disabled={loading}>
                                    {loading ? '修改中...' : '送出'}
                                </Button>
                            </form>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default Profile;
