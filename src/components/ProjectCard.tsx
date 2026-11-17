'use client';

import { Project, Dictionary, Locale } from '@/types';
import SkeletonImage from './SkeletonImage';

export default function ProjectCard({ 
  project, 
  dict,
  lang,
}: { 
  project: Project; 
  dict: Dictionary['projects'];
  lang: Locale;
}) {
  const name = lang === 'zh' ? (project.nameZh ?? project.name) : project.name;
  const description = lang === 'zh' ? (project.descriptionZh ?? project.description) : project.description;
  const linkLabel = lang === 'zh'
    ? (project.linkLabelZh ?? dict.viewOnGithub)
    : (project.linkLabelEn ?? dict.viewOnGithub);

  return (
    <article className="project-card">
      <SkeletonImage 
        src={project.icon} 
        alt={`${name} icon`}
        className="project-card__icon"
        containerClassName="project-card__icon-wrapper rounded-full overflow-hidden"
        loading="lazy"
      />
      <h3 className="project-card__title">{name}</h3>
      <p className="project-card__description">{description}</p>
      <a 
        href={project.url} 
        className="project-card__link" 
        target="_blank" 
        rel="noopener"
      >
        {linkLabel}
      </a>
    </article>
  );
}
