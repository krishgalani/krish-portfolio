'use client';

import { useState, useRef, useEffect } from 'react';
import { Dictionary } from '@/types';

export default function About({ dict }: { dict: Dictionary['about'] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <section id="about" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <div className="about-content">
        <p className="section__text">
          {dict.content}
        </p>
        <div className={`rounded-md overflow-hidden flex-shrink-0 ${!isLoaded ? 'skeleton' : ''}`}>
          <img 
            ref={imgRef}
            src="/assets/BU_logo.png" 
            alt="Boston University Logo" 
            className={`about__logo transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
