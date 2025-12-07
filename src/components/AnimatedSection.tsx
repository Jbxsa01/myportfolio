
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className, 
  id,
  delay = 0,
  animation = 'fade-in'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback: ensure the section becomes visible even if the observer never fires
    const fallbackTimer = setTimeout(() => setIsVisible(true), 800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animationClass = `animate-${animation}`;
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn('overflow-hidden', className)}
      style={{ 
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div 
        className={cn(isVisible ? animationClass : '')} 
        style={{ 
          ...delayStyle,
          animationFillMode: 'both',
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default AnimatedSection;
