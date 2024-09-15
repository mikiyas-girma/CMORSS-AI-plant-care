import React, { ReactNode, useState } from 'react';

type PropType = {
  imageClassName?: string;
  containerClassName?: string;
  imgUrl: string;
  altText?: string;
  LoadingComponent: ReactNode;
};

const ImageWithPlaceholder: React.FC<PropType> = ({
  imageClassName,
  containerClassName,
  imgUrl,
  altText,
  LoadingComponent,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  //   Return JSX
  return (
    <div
      className={
        containerClassName
          ? containerClassName
          : 'min-h-full w-full bg-white rounded-lg'
      }
    >
      {isLoading && <div className="min-h-[400px] ">{LoadingComponent}</div>}

      <img
        src={imgUrl}
        onLoad={handleImageLoad}
        style={isLoading ? { display: 'none' } : {}}
        alt={altText || 'Image'}
        className={
          imageClassName || `h-full object-contain w-full` + 'animate-fadein'
        }
      />
    </div>
  );
};

export default ImageWithPlaceholder;
