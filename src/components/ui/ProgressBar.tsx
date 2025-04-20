import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  height?: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  color = 'primary',
  showPercentage = true,
  height = 8,
  className = '',
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">{progress}%</span>
          )}
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className={`${getColorClass()} transition-all duration-500 ease-out rounded-full`}
          style={{ 
            width: `${progress}%`,
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 