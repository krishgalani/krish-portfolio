export interface Website {
  href: string;
  slug?: string;
  thumbnail: string;
  tagEn: string;
  tagZh: string;
  titleEn: string;
  titleZh: string;
  domain?: string;
  descriptionEn: string;
  descriptionZh: string;
  category: 'published' | 'templates';
  quoteEn?: string;
  quoteZh?: string;
  challengeEn?: string;
  challengeZh?: string;
  solutionEn?: string;
  solutionZh?: string;
  skillsEn?: string[];
  skillsZh?: string[];
  logo?: string;
  galleryBg?: string;
  stackedBg?: string;
  mobileBg?: string;
  gallery?: {
    hero: string;
    top: string;
    bottomLeft: string;
    bottomRight: string;
    stacked?: string[];
    mobileLeft: string;
    mobileRight: string;
    footer?: string;
  };
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
  projectDetails: {
    skills: string;
    challenge: string;
    solution: string;
    visitWebsite: string;
    backToHome: string;
  };
}
