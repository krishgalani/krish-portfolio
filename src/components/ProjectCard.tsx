'use client';

import { useState } from 'react';
import { Project, Dictionary } from '@/types';

export default function ProjectCard({ 
  project, 
  dict 
}: { 
  project: Project; 
  dict: Dictionary['projects'] 
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="project-card">
      <div className={`project-card__icon-wrapper rounded-full overflow-hidden mx-auto mb-[var(--space-lg)] ${!isLoaded ? 'skeleton' : ''}`}>
        <img 
          className={`project-card__icon ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={project.icon} 
          alt={`${project.name} icon`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{ transition: 'opacity 0.3s ease-in-out' }}
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
