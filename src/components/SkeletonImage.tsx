'use client';

import { useState, useRef, useEffect } from 'react';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export default function SkeletonImage({ 
  src, 
  alt, 
  className, 
  containerClassName = '', 
  ...props 
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`${containerClassName} ${!isLoaded ? 'skeleton' : ''}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
