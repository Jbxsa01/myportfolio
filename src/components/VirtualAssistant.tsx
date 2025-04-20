import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle } from 'lucide-react';

interface VirtualAssistantProps {
  mousePosition: { x: number; y: number };
  scrollPosition: number;
  cvRef: React.RefObject<HTMLDivElement>;
}

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({
  mousePosition,
  scrollPosition,
  cvRef,
}) => {
  const [message, setMessage] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const assistantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cvRef.current || !assistantRef.current) return;

    const cvRect = cvRef.current.getBoundingClientRect();
    const assistantRect = assistantRef.current.getBoundingClientRect();

    // Calculate distance from mouse to CV elements
    const distanceToMouse = Math.hypot(
      mousePosition.x - (cvRect.left + cvRect.width / 2),
      mousePosition.y - (cvRect.top + cvRect.height / 2)
    );

    // Show assistant when mouse is near CV section
    if (distanceToMouse < 300) {
      setIsVisible(true);
      
      // Update assistant position with smooth movement
      const targetX = mousePosition.x - assistantRect.width / 2;
      const targetY = mousePosition.y - assistantRect.height / 2;
      
      setPosition({
        x: targetX,
        y: targetY,
      });

      // Update message based on mouse position relative to CV elements
      const elements = cvRef.current.querySelectorAll('.cv-element');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.hypot(
          mousePosition.x - (rect.left + rect.width / 2),
          mousePosition.y - (rect.top + rect.height / 2)
        );

        if (distance < 100) {
          const elementType = element.getAttribute('data-type');
          switch (elementType) {
            case 'experience':
              setMessage("Découvrez mes expériences professionnelles !");
              break;
            case 'skills':
              setMessage("Voici mes compétences techniques principales.");
              break;
            case 'education':
              setMessage("Parcourez mon parcours académique.");
              break;
            default:
              setMessage("");
          }
        }
      });
    } else {
      setIsVisible(false);
      setMessage("");
    }
  }, [mousePosition, cvRef]);

  return (
    <div
      ref={assistantRef}
      className={`fixed z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="relative">
        <div className="assistant-float assistant-pulse bg-primary/10 p-4 rounded-full">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        {message && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-primary/10 p-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <p className="text-sm text-primary">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualAssistant; 