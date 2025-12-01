// src/components/providers/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8089';
const USER_STORAGE_KEY = 'currentUser';

// 定義用戶資訊的型別
interface User {
  id: string;
  username: string;
  email?: string;
  isAdmin: boolean;
  // 可以加入更多用戶資訊，例如 id, email, 等級等
}

// 定義上下文的型別
interface UserContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// 建立上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 建立 Provider 元件
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to persist user session:', err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (storageErr) {
      console.error('Failed to clear user session:', storageErr);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed && parsed.id && parsed.username) {
        setCurrentUser(parsed);
      }
    } catch (err) {
      console.error('Failed to restore user session:', err);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 建立一個方便使用的自訂 Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
