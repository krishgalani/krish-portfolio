'use client';

import { useLanguage } from './LanguageContext';

interface WebsiteCardProps {
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

export default function WebsiteCard({
  href,
  thumbnail,
  tagEn,
  tagZh,
  titleEn,
  titleZh,
  domain,
  descriptionEn,
  descriptionZh,
}: WebsiteCardProps) {
  const { t, language } = useLanguage();

  return (
    <article className="website-card">
      <a href={href} target="_blank" rel="noopener" className="website-card__link">
        <div className="website-card__preview">
          <img
            className="website-card__thumbnail"
            src={thumbnail}
            alt={t(`${titleEn} preview`, `${titleZh} 預覽`)}
          />
        </div>
        <div className="website-card__content">
          <span className="website-card__tag">
            {t(tagEn, tagZh)}
          </span>
          <h3 className={`website-card__title ${language === 'zh' ? 'zh-title' : ''}`}>
            {t(titleEn, titleZh)}
          </h3>
          {domain && <p className="website-card__domain">{domain}</p>}
          <p className={`website-card__description ${language === 'zh' ? 'zh-text' : ''}`}>
            {t(descriptionEn, descriptionZh)}
          </p>
        </div>
      </a>
      <style jsx>{`
        .zh-title {
          font-family: 'KaiTi', serif;
          font-size: calc(0.9rem * var(--zh-font-scale));
          white-space: normal;
          overflow: visible;
        }
        .zh-text {
          font-family: 'KaiTi', serif;
          font-size: calc(0.8rem * var(--zh-font-scale));
          -webkit-line-clamp: unset;
        }
      `}</style>
    </article>
  );
}
