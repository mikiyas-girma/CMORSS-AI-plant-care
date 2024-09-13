import { LoaderCircle } from 'lucide-react';
import React from 'react';

type LoadingType = {
  className?: string;
  iconHeight?: number;
  message?: string;
  iconType?: 'box' | 'ring';
  iconColor?: string;
};

const LoadingComp: React.FC<LoadingType> = ({
  className = 'h-[50%]',
  iconHeight = 40,
  iconColor = 'green',
  iconType,
  message,
}) => {
  return (
    <div className={`flex flex-col justify-center text-center ${className}`}>
      <LoaderCircle
        className={`animate-spin mx-auto rounded-md my-3  ${
          iconType === 'box' ? `bg-primary-${iconColor}` : ''
        }`}
        size={iconHeight}
        color={iconType === 'box' ? '' : iconColor}
      />
      <p className="animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingComp;
