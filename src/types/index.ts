export interface Website {
  href: string;
  thumbnail: string;
  tagEn: string;
  tagZh: string;
  titleEn: string;
  titleZh: string;
  domain?: string;
  descriptionEn: string;
  descriptionZh: string;
  category: 'published' | 'templates';
}

export interface Project {
  repo: string;
  icon: string;
  name: string;
  description: string;
  url: string;
}

export type Locale = 'en' | 'zh';

export interface Dictionary {
  hero: {
    title: string;
    subtitle: string;
    about: string;
    projects: string;
    websites: string;
    contact: string;
    cv: string;
  };
  about: {
    title: string;
    content: string;
  };
  websites: {
    title: string;
    clientWebsites: string;
    websiteTemplates: string;
  };
  projects: {
    title: string;
    viewOnGithub: string;
  };
  contact: {
    title: string;
    email: string;
    linkedin: string;
  };
}
