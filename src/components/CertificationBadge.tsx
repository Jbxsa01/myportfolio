import React from 'react';

interface CertificationBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({ 
  type, 
  size = 'md', 
  className = '' 
}) => {
  const getBadgeConfig = (type: string) => {
    const configs: { [key: string]: { color: string; bgColor: string; icon: string; text: string } } = {
      // Technologies principales
      'php': {
        color: '#777BB4',
        bgColor: '#F7DF1E',
        icon: 'P',
        text: 'PHP'
      },
      'python': {
        color: '#3776AB',
        bgColor: '#FFD43B',
        icon: 'Py',
        text: 'Python'
      },
      'react': {
        color: '#61DAFB',
        bgColor: '#282C34',
        icon: '⚛',
        text: 'React'
      },
      'java': {
        color: '#ED8B00',
        bgColor: '#FFFFFF',
        icon: '☕',
        text: 'Java'
      },
      'javascript': {
        color: '#F7DF1E',
        bgColor: '#000000',
        icon: 'JS',
        text: 'JavaScript'
      },
      'html': {
        color: '#E34F26',
        bgColor: '#FFFFFF',
        icon: 'H',
        text: 'HTML'
      },
      'css': {
        color: '#1572B6',
        bgColor: '#FFFFFF',
        icon: 'C',
        text: 'CSS'
      },
      'c': {
        color: '#A8B9CC',
        bgColor: '#FFFFFF',
        icon: 'C',
        text: 'C'
      },
      'sql': {
        color: '#336791',
        bgColor: '#FFFFFF',
        icon: 'SQL',
        text: 'SQL'
      },
      
      // Cloud & DevOps
      'aws': {
        color: '#FF9900',
        bgColor: '#232F3E',
        icon: '☁',
        text: 'AWS'
      },
      'azure': {
        color: '#0078D4',
        bgColor: '#00A1F1',
        icon: '☁',
        text: 'Azure'
      },
      'docker': {
        color: '#2496ED',
        bgColor: '#FFFFFF',
        icon: '🐳',
        text: 'Docker'
      },
      'kubernetes': {
        color: '#326CE5',
        bgColor: '#FFFFFF',
        icon: '☸',
        text: 'K8s'
      },
      
      // AI & Data
      'ai': {
        color: '#4285F4',
        bgColor: '#34A853',
        icon: '🤖',
        text: 'AI'
      },
      
      // Networking
      'cisco': {
        color: '#1BA0D7',
        bgColor: '#FFFFFF',
        icon: '🌐',
        text: 'Cisco'
      },
      
      // Hardware & IoT
      'arduino': {
        color: '#00979D',
        bgColor: '#FFFFFF',
        icon: '⚡',
        text: 'Arduino'
      },
      
      // Frameworks & Libraries
      'bootstrap': {
        color: '#7952B3',
        bgColor: '#FFFFFF',
        icon: 'B',
        text: 'Bootstrap'
      },
      'javafx': {
        color: '#ED8B00',
        bgColor: '#FFFFFF',
        icon: 'FX',
        text: 'JavaFX'
      },
      
      // Operating Systems
      'linux': {
        color: '#FCC624',
        bgColor: '#000000',
        icon: '🐧',
        text: 'Linux'
      },
      'unix': {
        color: '#FCC624',
        bgColor: '#000000',
        icon: 'U',
        text: 'Unix'
      },
      
      // Soft Skills
      'soft-skills': {
        color: '#FF6B6B',
        bgColor: '#FFE5E5',
        icon: '💬',
        text: 'Soft Skills'
      },
      
      // Research
      'research': {
        color: '#6B46C1',
        bgColor: '#F3E8FF',
        icon: '🔍',
        text: 'Research'
      },
      
      // Software Engineering
      'software-engineering': {
        color: '#059669',
        bgColor: '#D1FAE5',
        icon: '⚙️',
        text: 'Software Eng.'
      },
      
      // Web Development
      'web-development': {
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        icon: '🌐',
        text: 'Web Dev'
      }
    };
    
    return configs[type.toLowerCase()] || {
      color: '#6B7280',
      bgColor: '#F3F4F6',
      icon: '📜',
      text: type
    };
  };

  const config = getBadgeConfig(type);
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  return (
    <div 
      className={`rounded-lg flex items-center justify-center font-bold shadow-lg border-2 border-white ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.color
      }}
      title={config.text}
    >
      <span className="font-mono">{config.icon}</span>
    </div>
  );
};

export default CertificationBadge; 