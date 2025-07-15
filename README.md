# ChatOrbit Frontend

A modern, real-time chat application frontend built with React, TypeScript, and Tailwind CSS. Features dynamic chat rooms, live messaging, and a sleek UI with glass morphism effects.
[Demo] https://preview--orbit-nexus-chat.lovable.app/
## 🚀 Features

### Core Chat Functionality
- **Real-time Messaging**: WebSocket-powered instant messaging
- **Auto-scrolling**: Smart message scrolling that pauses when user scrolls up
- **Rate Limiting**: Visual feedback for message sending limits
- **User Roles**: Admin and moderator badges with special styling
- **Message History**: Paginated loading of previous messages
- **Online Users**: Live user count and presence indicators

### Room Management
- **Room Discovery**: Browse available chat rooms with search and filtering
- **Room Categories**: Organize rooms by topics (Technology, Gaming, Education, etc.)
- **Room Creation**: Create public or private rooms with custom settings
- **Password Protection**: Secure rooms with password authentication
- **Live Status**: Real-time indicators for active rooms

### User Experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern dark UI with vibrant accent colors
- **Glass Morphism**: Beautiful translucent effects and gradients
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **shadcn/ui** - Component library
- **Orval** - API client generation (ready for integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat-related components
│   │   ├── ChatRoom.tsx
│   │   ├── MessageItem.tsx
│   │   ├── MessageInput.tsx
│   │   ├── OnlineUsers.tsx
│   │   └── RoomHeader.tsx
│   ├── navigation/     # Navigation components
│   ├── rooms/          # Room management components
│   │   ├── RoomCard.tsx
│   │   └── CreateRoomModal.tsx
│   └── ui/             # Reusable UI components
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard
│   ├── Chat.tsx        # Chat room page
│   ├── Login.tsx       # Authentication
│   └── Rooms.tsx       # Room browser
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatorbit-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🔧 API Integration with Orval

This project is ready for Orval integration to generate type-safe API clients from your ChatOrbit backend.

### Setup Orval

1. **Install Orval**
   ```bash
   npm install -D orval
   ```

2. **Create orval.config.ts**
   ```typescript
   import { defineConfig } from 'orval';

   export default defineConfig({
     api: {
       input: 'http://localhost:8080/swagger.json', // Your backend OpenAPI spec
       output: {
         target: './src/api/generated.ts',
         client: 'react-query',
         mock: true
       }
     }
   });
   ```

3. **Generate API client**
   ```bash
   npx orval
   ```

4. **Use generated hooks**
   ```typescript
   import { useGetMessages, useSendMessage } from '@/api/generated';
   
   const ChatComponent = () => {
     const { data: messages } = useGetMessages({ roomId: '123' });
     const sendMessage = useSendMessage();
     // ... component logic
   };
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Purple-blue gradients (`orbit-purple`, `orbit-blue`)
- **Accent**: Cyan highlights (`orbit-cyan`)
- **Secondary**: Pink accents (`orbit-pink`)
- **Background**: Dark with subtle gradients
- **Glass Effects**: Translucent overlays with blur

### Components
- Built with shadcn/ui for consistency
- Custom glass morphism effects
- Responsive breakpoints
- Smooth animations and transitions

## 🔌 WebSocket Integration

The chat system is designed to work with WebSocket connections:

```typescript
// Example WebSocket usage (to be implemented)
const ws = new WebSocket(`ws://localhost:8080/ws?token=${jwt}&room=${roomId}`);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  // Handle incoming message
};

ws.send(JSON.stringify({
  content: "Hello, world!"
}));
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layouts for medium screens  
- **Desktop Enhanced**: Full feature set on large screens
- **Touch Friendly**: Large tap targets and gestures

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Using Lovable (Recommended)
1. Click the "Publish" button in Lovable
2. Your app will be deployed automatically

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

### Environment Variables
- `VITE_API_URL`: Backend API URL
- `VITE_WS_URL`: WebSocket server URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **ChatOrbit Backend**: Go-based microservices with Redis and MongoDB
- **API Documentation**: OpenAPI/Swagger specifications

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the [documentation](https://docs.chatorbit.dev)
- Join our [Discord community](https://discord.gg/chatorbit)

---

Built with ❤️ using modern web technologies
