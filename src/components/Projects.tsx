import { INITIAL_PROJECTS } from '@/lib/data';
import { Project, Dictionary } from '@/types';

async function getGithubProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    INITIAL_PROJECTS.map(async (project) => {
      try {
        const res = await fetch(`https://api.github.com/repos/krishgalani/${project.repo}`, {
          next: { revalidate: 3600 }, // Cache for 1 hour
        });
        const data = await res.json();
        if (data.name) {
          return {
            ...project,
            name: data.name,
            description: data.description || project.description,
            url: data.html_url,
          };
        }
      } catch (err) {
        console.warn(`Error fetching ${project.repo}:`, err);
      }
      return project;
    })
  );
  return projects;
}

export default async function Projects({ dict }: { dict: Dictionary['projects'] }) {
  const projects = await getGithubProjects();

  return (
    <section id="projects" className="section">
      <h2 className="section__title">{dict.title}</h2>
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
              {dict.viewOnGithub}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
