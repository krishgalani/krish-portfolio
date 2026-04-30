'use client';

import { Website, Locale } from '@/types';
import Link from 'next/link';
import SkeletonImage from './SkeletonImage';

export default function WebsiteCard({
  site,
  lang,
}: {
  site: Website;
  lang: Locale;
}) {
  const title = lang === 'en' ? site.titleEn : site.titleZh;
  const tag = lang === 'en' ? site.tagEn : site.tagZh;
  const description = lang === 'en' ? site.descriptionEn : site.descriptionZh;
  const altText = lang === 'en' ? `${site.titleEn} preview` : `${site.titleZh} 預覽`;

  const isInternal = site.category === 'published' && site.slug;
  const href = isInternal ? `/${lang}/projects/${site.slug}` : site.href;
  const target = isInternal ? undefined : "_blank";
  const rel = isInternal ? undefined : "noopener";

  const CardWrapper = isInternal ? Link : 'a';

  return (
    <article className="website-card">
      <CardWrapper href={href} target={target} rel={rel} className="website-card__link">
        <SkeletonImage 
          src={site.thumbnail}
          alt={altText}
          className="website-card__thumbnail"
          containerClassName="website-card__preview"
          loading="lazy"
        />
        <div className="website-card__content">
          <span className="website-card__tag">
            {tag}
          </span>
          <h3 className="website-card__title">
            {title}
          </h3>
          {site.domain && <p className="website-card__domain">{site.domain}</p>}
          <p className="website-card__description">
            {description}
          </p>
        </div>
      </CardWrapper>
    </article>
  );
}
