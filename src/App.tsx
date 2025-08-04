
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/ui/layout";
import { Navbar } from "./components/navigation/Navbar";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { UserProvider, useUser } from "./components/providers/UserContext";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import './lib/i18n';


const queryClient = new QueryClient();

const AppContent = () => {
  const { currentUser } = useUser();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="chatorbit-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Navbar currentUser={currentUser || undefined} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:roomId" element={<Chat />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const App = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
);

export default App;
