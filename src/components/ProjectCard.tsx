'use client';

import { Project, Dictionary } from '@/types';
import SkeletonImage from './SkeletonImage';

export default function ProjectCard({ 
  project, 
  dict 
}: { 
  project: Project; 
  dict: Dictionary['projects'] 
}) {
  return (
    <article className="project-card">
      <SkeletonImage 
        src={project.icon} 
        alt={`${project.name} icon`}
        className="project-card__icon"
        containerClassName="project-card__icon-wrapper rounded-full overflow-hidden mx-auto mb-[var(--space-lg)]"
        loading="lazy"
      />
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
