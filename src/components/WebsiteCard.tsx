'use client';

import { useState, useRef, useEffect } from 'react';
import { Website, Locale } from '@/types';
import Link from 'next/link';

export default function WebsiteCard({
  site,
  lang,
}: {
  site: Website;
  lang: Locale;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);
  
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
        <div className={`website-card__preview ${!isLoaded ? 'skeleton' : ''}`}>
          <img
            ref={imgRef}
            className={`website-card__thumbnail transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={site.thumbnail}
            alt={altText}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
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
