import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VirtualAssistant from './components/VirtualAssistant';
import ChatBot from './components/ChatBot';
import CustomScrollbar from './components/ui/CustomScrollbar';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomScrollbar className="h-screen">
            <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
              <Routes>
                <Route path="/" element={<Index cvRef={cvRef} />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </CustomScrollbar>
        </BrowserRouter>
        <VirtualAssistant
          mousePosition={mousePosition}
          scrollPosition={scrollPosition}
          cvRef={cvRef}
        />
        <ChatBot cvRef={cvRef} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
