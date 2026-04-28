import { INITIAL_PROJECTS } from '@/lib/data';
import { Project, Dictionary } from '@/types';
import ProjectCard from './ProjectCard';

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
          <ProjectCard key={project.repo} project={project as Project} dict={dict} />
        ))}
      </div>
    </section>
  );
}
