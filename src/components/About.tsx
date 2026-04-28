'use client';

import { useState } from 'react';
import { Dictionary } from '@/types';

export default function About({ dict }: { dict: Dictionary['about'] }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="about" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <div className="about-content">
        <p className="section__text">
          {dict.content}
        </p>
        <div className={`rounded-md overflow-hidden flex-shrink-0 ${!isLoaded ? 'skeleton' : ''}`}>
          <img 
            src="/assets/BU_logo.png" 
            alt="Boston University Logo" 
            className={`about__logo ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>
      </div>
    </section>
  );
}
