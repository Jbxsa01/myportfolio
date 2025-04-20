
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  link,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "card-glass overflow-hidden appear h-full",
        delay ? `appear-delay-${delay}` : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden relative">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {link && (
          <a 
            href={link} 
            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            target="_blank" 
            rel="noreferrer"
          >
            Voir le projet <ArrowUpRight size={16} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
