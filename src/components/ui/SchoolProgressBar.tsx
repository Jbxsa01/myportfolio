import React from 'react';

interface SchoolProgressBarProps {
  subject: string;
  grade: number;
  maxGrade?: number;
  semester?: string;
  year?: string;
  showDetails?: boolean;
  className?: string;
}

const SchoolProgressBar: React.FC<SchoolProgressBarProps> = ({
  subject,
  grade,
  maxGrade = 20,
  semester,
  year,
  showDetails = true,
  className = '',
}) => {
  const percentage = (grade / maxGrade) * 100;
  
  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'bg-success';
    if (grade >= 14) return 'bg-primary';
    if (grade >= 12) return 'bg-secondary';
    if (grade >= 10) return 'bg-warning';
    return 'bg-danger';
  };

  const getGradeText = (grade: number) => {
    if (grade >= 16) return 'Excellent';
    if (grade >= 14) return 'Très bien';
    if (grade >= 12) return 'Bien';
    if (grade >= 10) return 'Satisfaisant';
    return 'À améliorer';
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-800">{subject}</h4>
          {showDetails && (semester || year) && (
            <p className="text-sm text-gray-500">
              {semester && <span>{semester}</span>}
              {semester && year && <span> • </span>}
              {year && <span>{year}</span>}
            </p>
          )}
        </div>
        <div className="text-right">
          <span className="font-bold text-lg">{grade}/{maxGrade}</span>
          {showDetails && (
            <p className="text-sm text-gray-500">{getGradeText(grade)}</p>
          )}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3">
        <div
          className={`${getGradeColor(grade)} transition-all duration-500 ease-out h-full rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SchoolProgressBar; 