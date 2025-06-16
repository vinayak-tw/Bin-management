import React from 'react';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-emerald-600',
  red: 'from-red-400 to-red-600',
  yellow: 'from-yellow-400 to-amber-600',
  purple: 'from-purple-400 to-purple-600'
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  className,
  color = 'blue' 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={clsx('w-full bg-gray-200 rounded-full h-2.5 shadow-inner', className)}>
      <div
        className={clsx(
          'h-2.5 rounded-full transition-all duration-700 ease-out bg-gradient-to-r shadow-sm',
          colorClasses[color]
        )}
        style={{ 
          width: `${percentage}%`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};