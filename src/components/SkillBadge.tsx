
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
  delay?: number;
  icon?: React.ReactNode;
  level?: number; // 1-5 for skill level
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  name, 
  className,
  delay = 0,
  icon,
  level = 3
}) => {
  return (
    <div 
      className={cn(
        "px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-100 text-foreground font-medium text-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/30 flex items-center gap-2 appear",
        delay ? `appear-delay-${delay}` : '',
        className
      )}
    >
      {icon && <span className="text-primary">{icon}</span>}
      <span>{name}</span>
      
      {/* Skill level indicators */}
      {level > 0 && (
        <div className="ml-auto flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                i < level ? "bg-primary" : "bg-gray-200"
              )}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillBadge;
