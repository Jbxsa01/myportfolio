import React, { useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  trackColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = '',
  trackColor = 'bg-gray-100',
  thumbColor = 'bg-primary/50',
  thumbHoverColor = 'bg-primary'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(percentage);
      
      // Calculer la hauteur du thumb
      const thumbHeightPercentage = (clientHeight / scrollHeight) * 100;
      setThumbHeight(Math.max(thumbHeightPercentage, 10)); // Minimum 10%
      
      // Calculer la position du thumb
      const thumbTopPercentage = (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeightPercentage);
      setThumbTop(thumbTopPercentage);
    };

    container.addEventListener('scroll', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);
    updateScrollbar();

    return () => {
      container.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
    };
  }, []);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;

    const { scrollHeight, clientHeight } = container;
    const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
    const clickPosition = e.clientY - container.getBoundingClientRect().top - thumbHeight / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const newThumbTop = e.clientY - containerRect.top - thumbHeight / 2;
      const maxThumbTop = containerRect.height - thumbHeight;
      const boundedThumbTop = Math.max(0, Math.min(newThumbTop, maxThumbTop));
      const scrollPercentage = (boundedThumbTop / maxThumbTop) * (scrollHeight - clientHeight);
      container.scrollTop = scrollPercentage;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const trackRect = container.getBoundingClientRect();
    const clickPosition = e.clientY - trackRect.top;
    const trackHeight = trackRect.height;
    const scrollPercentage = clickPosition / trackHeight;
    const scrollAmount = scrollPercentage * (container.scrollHeight - container.clientHeight);
    container.scrollTop = scrollAmount;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-y-auto ${className}`}
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {children}
      
      {/* Track */}
      <div 
        className={`absolute right-0 top-0 w-2 h-full ${trackColor} rounded-full`}
        onClick={handleTrackClick}
      >
        {/* Thumb */}
        <div
          className={`absolute right-0 w-full ${thumbColor} hover:${thumbHoverColor} rounded-full transition-colors duration-200 cursor-pointer`}
          style={{
            height: `${thumbHeight}%`,
            top: `${thumbTop}%`,
            opacity: isDragging ? 1 : 0.8,
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  );
};

export default CustomScrollbar; 