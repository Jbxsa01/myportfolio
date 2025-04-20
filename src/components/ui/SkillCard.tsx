import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  level: number;
  color?: string;
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon: Icon,
  title,
  level,
  color = 'primary',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="somagec-card p-6 hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`text-${color}`} size={24} />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Niveau</span>
          <span className="text-sm font-medium text-gray-800">{level}%</span>
        </div>
        <ProgressBar
          progress={level}
          color={color}
          height={6}
          showPercentage={false}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard; 