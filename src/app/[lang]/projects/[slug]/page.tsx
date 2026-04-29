import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PUBLISHED_WEBSITES } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = [];
  for (const lang of ['en', 'zh']) {
    for (const project of PUBLISHED_WEBSITES) {
      if (project.slug) {
        paths.push({ lang, slug: project.slug });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = PUBLISHED_WEBSITES.find((p) => p.slug === slug);
  
  if (!project) return {};

  const title = lang === 'zh' ? project.titleZh : project.titleEn;
  return {
    title: `${title} | Krish Galani`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const project = PUBLISHED_WEBSITES.find((p) => p.slug === slug);

  if (!project || !project.gallery) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const details = dict.projectDetails;

  const title = locale === 'zh' ? project.titleZh : project.titleEn;
  const skills = locale === 'zh' ? project.skillsZh : project.skillsEn;
  
  const { gallery } = project;

  return (
    <article className="page case-study">
      <Link href={`/${locale}?tab=published#websites`} className="case-study__back-link">
        <ArrowLeft size={16} /> {details.backToHome}
      </Link>

      <div className="case-study__hero-container">
        <img src={gallery.hero} alt={title} className="case-study__hero-img-std" />
      </div>

      <main className="case-study__grid-layout">
        <aside className="case-study__sidebar">
          <div className="case-study__sidebar-sticky">
            <h2 className="case-study__section-title">{details.skills}</h2>
            {skills && (
              <ul className="skills-list">
                {skills.map((skill) => (
                  <li key={skill} className="skills-list__item">
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            <div className="case-study__sidebar-cta">
              <a 
                href={project.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="case-study__cta-btn"
              >
                {details.visitWebsite} <ArrowRight size={18} className="cta-arrow" />
              </a>
            </div>

            {project.logo && (
              <div className="case-study__sidebar-logo">
                <img src={project.logo} alt={`${title} logo`} className="sidebar-logo-img" />
              </div>
            )}
          </div>
        </aside>

        <div className="case-study__gallery-flow">
          {/* Top Full Image */}
          <img src={gallery.top} alt={`${title} showcase top`} className="gallery-img-fluid" />

          {/* Bottom Side-by-Side Images */}
          <div className="gallery-row-std">
            <img src={gallery.bottomLeft} alt={`${title} detail left`} className="gallery-img-fluid" />
            <img src={gallery.bottomRight} alt={`${title} detail right`} className="gallery-img-fluid" />
          </div>

          {/* Mobile Showcase Side-by-Side in Frames */}
          <div className="mobile-mockup-wrap">
            <div className="mobile-frame-std">
              <div className="mobile-frame-std__screen">
                <img src={gallery.mobileLeft} alt={`${title} mobile left`} className="mobile-frame-std__img" />
              </div>
            </div>
            <div className="mobile-frame-std">
              <div className="mobile-frame-std__screen">
                <img src={gallery.mobileRight} alt={`${title} mobile right`} className="mobile-frame-std__img" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {gallery.footer && (
        <div className="case-study__footer-img-wrap">
          <img src={gallery.footer} alt={`${title} footer`} className="gallery-img-fluid" />
        </div>
      )}
    </article>
  );
}
