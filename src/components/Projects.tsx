'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

interface Project {
  repo: string;
  icon: string;
  name: string;
  description: string;
  url: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    repo: 'jobsdb-scraper',
    icon: 'https://hk.jobsdb.com/static/shared-web/favicon-4e1897dfd0901e8a3bf7e604d3a90636.ico',
    name: 'JobsDB Scraper',
    description: 'A tool to scrape job listings from JobsDB.',
    url: '#',
  },
  {
    repo: 'whatstheweatherlike',
    icon: 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
    name: "What's the weather like",
    description: 'A simple weather application.',
    url: '#',
  },
  {
    repo: 'chatroom',
    icon: '/resources/live-chat.png',
    name: 'Chatroom',
    description: 'A real-time chat application.',
    url: '#',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const { t } = useLanguage();

  useEffect(() => {
    projects.forEach((project, index) => {
      fetch(`https://api.github.com/repos/krishgalani/${project.repo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            setProjects((prev) => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                name: data.name,
                description: data.description || updated[index].description,
                url: data.html_url,
              };
              return updated;
            });
          }
        })
        .catch((err) => console.warn(`Error fetching ${project.repo}:`, err));
    });
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="section__title">{t('projects', '項目')}</h2>
      <div className="projects">
        {projects.map((project) => (
          <article key={project.repo} className="project-card">
            <img 
              className="project-card__icon" 
              src={project.icon} 
              alt={`${project.name} icon`}
            />
            <h3 className="project-card__title">{project.name}</h3>
            <p className="project-card__description">{project.description}</p>
            <a 
              href={project.url} 
              className="project-card__link" 
              target="_blank" 
              rel="noopener"
            >
              {t('View on GitHub', '在 GitHub 上查看')}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
