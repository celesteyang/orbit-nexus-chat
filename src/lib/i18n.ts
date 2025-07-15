
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        rooms: "Chat Rooms",
        chat: "Live Chat",
        online: "Online",
        admin: "Admin",
        login: "Login",
        logout: "Logout"
      },
      chat: {
        welcome: "Welcome to ChatOrbit! 🚀 Let's start chatting!",
        inputPlaceholder: "Type a message...",
        rateLimited: "Sending messages too frequently, please try again later",
        blocked: "You are currently blocked from sending messages",
        autoScrollHint: "↓ Click to return to latest messages",
        onlineUsers: "Online Users",
        leaveRoom: "Leave Room",
        toggleVideo: "Toggle Video",
        toggleMic: "Toggle Microphone",
        toggleSound: "Toggle Sound"
      },
      rooms: {
        title: "Chat Rooms",
        subtitle: "Join a room and start chatting with others",
        createRoom: "Create Room",
        searchPlaceholder: "Search rooms...",
        categories: {
          all: "All",
          general: "General",
          tech: "Technology",
          gaming: "Gaming",
          music: "Music",
          art: "Art"
        },
        joinRoom: "Join Room",
        members: "members",
        online: "online",
        private: "Private",
        passwordRequired: "Password Required"
      },
      createRoom: {
        title: "Create New Room",
        roomName: "Room Name",
        description: "Description",
        category: "Category",
        private: "Private Room",
        password: "Password (Optional)",
        maxMembers: "Max Members",
        create: "Create Room",
        cancel: "Cancel"
      },
      common: {
        search: "Search",
        settings: "Settings",
        notifications: "Notifications",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        language: "Language"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: "首頁",
        rooms: "聊天室",
        chat: "即時聊天",
        online: "線上",
        admin: "管理員",
        login: "登入",
        logout: "登出"
      },
      chat: {
        welcome: "歡迎來到 ChatOrbit！🚀 讓我們開始聊天吧！",
        inputPlaceholder: "輸入訊息...",
        rateLimited: "發送訊息過於頻繁，請稍後再試",
        blocked: "您目前被禁止發送訊息",
        autoScrollHint: "↓ 點擊回到最新訊息",
        onlineUsers: "線上使用者",
        leaveRoom: "離開房間",
        toggleVideo: "切換攝影機",
        toggleMic: "切換麥克風",
        toggleSound: "切換聲音"
      },
      rooms: {
        title: "聊天室",
        subtitle: "加入房間與其他人開始聊天",
        createRoom: "建立房間",
        searchPlaceholder: "搜尋房間...",
        categories: {
          all: "全部",
          general: "一般",
          tech: "科技",
          gaming: "遊戲",
          music: "音樂",
          art: "藝術"
        },
        joinRoom: "加入房間",
        members: "成員",
        online: "線上",
        private: "私人",
        passwordRequired: "需要密碼"
      },
      createRoom: {
        title: "建立新房間",
        roomName: "房間名稱",
        description: "描述",
        category: "分類",
        private: "私人房間",
        password: "密碼（選填）",
        maxMembers: "最大成員數",
        create: "建立房間",
        cancel: "取消"
      },
      common: {
        search: "搜尋",
        settings: "設定",
        notifications: "通知",
        darkMode: "深色模式",
        lightMode: "淺色模式",
        language: "語言"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
