
import React from 'react';
import { cn } from '@/lib/utils';

interface LanguageLogoProps {
  name: string;
  icon: string;
  className?: string;
  delay?: number;
}

const LanguageLogo: React.FC<LanguageLogoProps> = ({ 
  name, 
  icon, 
  className,
  delay = 0
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-3 transition-all",
        "hover:scale-110 hover:shadow-lg hover:z-10",
        "rounded-lg bg-white/80 shadow-sm border border-gray-100",
        delay ? `appear-delay-${delay}` : '',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        <img src={icon} alt={`${name} logo`} className="max-w-full max-h-full object-contain" />
      </div>
      <span className="text-xs font-medium text-gray-700">{name}</span>
    </div>
  );
};

export default LanguageLogo;
