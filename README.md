# ChatOrbit Frontend

A modern, real-time chat application frontend built with React, TypeScript, and Tailwind CSS. Features dynamic chat rooms, live messaging, and a sleek UI with glass morphism effects.
[Demo] https://preview--orbit-nexus-chat.lovable.app/
## Features

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

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **shadcn/ui** - Component library

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
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
│   ├── Logout.tsx  
│   └── Rooms.tsx       # Room browser
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Getting Started

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
## Deployment

### Using Lovable (Recommended)
1. Click the "Publish" button in Lovable
2. Your app will be deployed automatically

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Related Projects
- **ChatOrbit Backend**: Go-based microservices with Redis and MongoDB
- **API Documentation**: OpenAPI/Swagger specifications

## Deploy to Google Cloud Run with Artifact Registry

Build a Docker image, push it to Google Artifact Registry, and deploy the image to Cloud Run.

This project assumes:

1.You already have a Google Cloud Project

2.Cloud SDK installed

3.Docker installed

### Enable Artifact Registry API
```gcloud services enable artifactregistry.googleapis.com```

### Authenticate Docker to Artifact Registry
```gcloud auth configure-docker asia-east1-docker.pkg.dev```
### Build Docker Image
```docker build -t asia-east1-docker.pkg.dev/<PROJECT_ID>/<REPO>/<IMAGE>:latest .```

### Push Image to Artifact Registry

```docker push asia-east1-docker.pkg.dev/<PROJECT_ID>/<REPO>/<IMAGE>:latest```

### Deploy to Cloud Run
```bash
gcloud run deploy chatorbit-web \
  --image=asia-east1-docker.pkg.dev/<PROJECT_ID>/<REPO>/<IMAGE>:latest \
  --platform=managed \
  --region=asia-east1 \
  --allow-unauthenticated
```

THen Cloud Run will return a public HTTPS URL.