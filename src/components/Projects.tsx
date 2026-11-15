import { INITIAL_PROJECTS } from '@/lib/data';
import { Project, Dictionary, Locale } from '@/types';
import ProjectCard from './ProjectCard';

async function getGithubProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    INITIAL_PROJECTS.map(async (project) => {
      if (!project.repo) return project;

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

export default async function Projects({ dict, lang }: { dict: Dictionary['projects']; lang: Locale }) {
  const projects = await getGithubProjects();

  return (
    <section id="projects" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} dict={dict} lang={lang} />
        ))}
      </div>
    </section>
  );
}
