import { Website, Locale } from '@/types';

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

  return (
    <article className="website-card">
      <a href={site.href} target="_blank" rel="noopener" className="website-card__link">
        <div className="website-card__preview">
          <img
            className="website-card__thumbnail"
            src={site.thumbnail}
            alt={altText}
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
      </a>
    </article>
  );
}
