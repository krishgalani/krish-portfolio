import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PUBLISHED_WEBSITES } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SkeletonImage from '@/components/SkeletonImage';
import { preload } from 'react-dom';

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

  const { gallery } = project;

  // Phase 2: Implement Header Preloads
  preload(gallery.hero, { as: 'image' });
  preload(gallery.top, { as: 'image' });
  if (project.logo) preload(project.logo, { as: 'image' });

  const dict = await getDictionary(locale);
  const details = dict.projectDetails;

  const title = locale === 'zh' ? project.titleZh : project.titleEn;
  const skills = locale === 'zh' ? project.skillsZh : project.skillsEn;

  return (
    <article className="page case-study">
      <Link href={`/${locale}?tab=published#websites`} className="case-study__back-link">
        <ArrowLeft size={16} /> {details.backToHome}
      </Link>

      <SkeletonImage 
        src={gallery.hero} 
        alt={title} 
        className="case-study__hero-img-std" 
        containerClassName="case-study__hero-container"
      />

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
              <SkeletonImage 
                src={project.logo} 
                alt={`${title} logo`} 
                className="sidebar-logo-img" 
                containerClassName="case-study__sidebar-logo"
              />
            )}
          </div>
        </aside>

        <div className="case-study__gallery-flow" style={{ backgroundColor: project.galleryBg }}>
          {/* Top Full Image */}
          <SkeletonImage 
            src={gallery.top} 
            alt={`${title} showcase top`} 
            className="gallery-img-fluid" 
          />

          <div className="gallery-row-std">
            <SkeletonImage 
              src={gallery.bottomLeft} 
              alt={`${title} detail left`} 
              className="gallery-img-fluid" 
            />
            <SkeletonImage 
              src={gallery.bottomRight} 
              alt={`${title} detail right`} 
              className="gallery-img-fluid" 
            />
          </div>
        </div>
      </main>

      {/* Stacked Full-Width Screenshots Section - Moved outside grid for centering */}
      {gallery.stacked && gallery.stacked.length > 0 && (
        <div className="case-study__stacked-gallery" style={{ backgroundColor: project.stackedBg }}>
          <div className="case-study__stacked-content">
            {gallery.stacked.map((img, index) => (
              <SkeletonImage 
                key={`${img}-${index}`}
                src={img} 
                alt={`${title} screenshot ${index + 1}`} 
                className="gallery-img-fluid"
                containerClassName="case-study__stacked-img-container"
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Showcase Section - Moved outside grid for centering */}
      <div className="portfolio mobile" style={{ backgroundColor: project.mobileBg }}>
        <ul className="img-project">
          <li>
            <div className="mobile-frame-std__screen">
              <SkeletonImage 
                src={gallery.mobileLeft} 
                alt={`${title} mobile left`} 
                className="mobile-frame-std__img" 
                containerClassName="w-full h-full"
              />
            </div>
          </li>
          <li>
            <div className="mobile-frame-std__screen">
              <SkeletonImage 
                src={gallery.mobileRight} 
                alt={`${title} mobile right`} 
                className="mobile-frame-std__img" 
                containerClassName="w-full h-full"
              />
            </div>
          </li>
        </ul>
      </div>

      {gallery.footer && (
        <SkeletonImage 
          src={gallery.footer} 
          alt={`${title} footer`} 
          className="gallery-img-fluid" 
          containerClassName="case-study__footer-img-wrap"
        />
      )}
    </article>
  );
}
