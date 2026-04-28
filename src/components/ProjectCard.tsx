'use client';

import { useState, useRef, useEffect } from 'react';
import { Project, Dictionary } from '@/types';

export default function ProjectCard({ 
  project, 
  dict 
}: { 
  project: Project; 
  dict: Dictionary['projects'] 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <article className="project-card">
      <div className={`project-card__icon-wrapper rounded-full overflow-hidden mx-auto mb-[var(--space-lg)] ${!isLoaded ? 'skeleton' : ''}`}>
        <img 
          ref={imgRef}
          className={`project-card__icon transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={project.icon} 
          alt={`${project.name} icon`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <h3 className="project-card__title">{project.name}</h3>
      <p className="project-card__description">{project.description}</p>
      <a 
        href={project.url} 
        className="project-card__link" 
        target="_blank" 
        rel="noopener"
      >
        {dict.viewOnGithub}
      </a>
    </article>
  );
}
