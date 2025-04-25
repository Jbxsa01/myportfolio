import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorType: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed w-8 h-8 rounded-full bg-primary/20 pointer-events-none z-50 transition-transform duration-300"
      style={{ 
        left: `${position.x - 16}px`, 
        top: `${position.y - 16}px`,
        transform: cursorType === 'pointer' ? 'scale(1.5)' : 'scale(1)'
      }}
    >
      {cursorType === 'pointer' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default CustomCursor; 