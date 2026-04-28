'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import WebsiteCard from './WebsiteCard';

const PUBLISHED_WEBSITES = [
  {
    href: "https://risingelectronics.com",
    thumbnail: "/resources/websites/published/risingelectronics_com_frontpage.png",
    tagEn: "Commerce",
    tagZh: "商業",
    titleEn: "Rising Electronics",
    titleZh: "穗升國際有限公司",
    domain: "risingelectronics.com",
    descriptionEn: "An electronics manufacturer based in Hong Kong.",
    descriptionZh: "一家位於香港的電子產品製造商。",
    category: "published" as const,
  }
];

const TEMPLATES = [
  {
    href: "/pages/event_template/index.html",
    thumbnail: "/resources/websites/templates/event_template_website_frontpage.png",
    tagEn: "Events",
    tagZh: "活動",
    titleEn: "Event Template",
    titleZh: "活動模板",
    descriptionEn: "A flexible template for events and occasions.",
    descriptionZh: "一個適用於活動和場合的靈活模板。",
    category: "templates" as const,
  },
  {
    href: "/pages/dentist_template/index.html",
    thumbnail: "/resources/websites/templates/dentist_template_website_frontpage.png",
    tagEn: "Medical",
    tagZh: "醫療",
    titleEn: "Hong Kong Dental Clinic",
    titleZh: "香港牙科診所",
    descriptionEn: "A bilingual dental clinic template for Hong Kong.",
    descriptionZh: "一個適合香港的雙語牙科診所模板。",
    category: "templates" as const,
  },
  {
    href: "/pages/gym_template/index.html",
    thumbnail: "/resources/websites/templates/gym_template_website_frontpage.png",
    tagEn: "Fitness",
    tagZh: "健身",
    titleEn: "Hong Kong Functional Fitness",
    titleZh: "香港功能性健身",
    descriptionEn: "A bilingual gym template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語健身模板。",
    category: "templates" as const,
  },
  {
    href: "/pages/hair_salon_template/index.html",
    thumbnail: "/resources/websites/templates/hair_salon_template_website_frontpage.png",
    tagEn: "Beauty",
    tagZh: "美容",
    titleEn: "Hong Kong Hair Salon",
    titleZh: "香港髮廊時尚",
    descriptionEn: "A bilingual hair salon template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語髮廊模板。",
    category: "templates" as const,
  },
  {
    href: "/pages/barefoot_shoe_template/index.html",
    thumbnail: "/resources/websites/templates/barefoot_shoe_template_website_frontpage.png",
    tagEn: "Footwear",
    tagZh: "鞋履",
    titleEn: "Hong Kong Barefoot Shoes",
    titleZh: "香港赤足鞋",
    descriptionEn: "A bilingual barefoot shoe store template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語赤足鞋店模板。",
    category: "templates" as const,
  },
  {
    href: "/pages/phone_repair_template/index.html",
    thumbnail: "/resources/websites/templates/phone_repair_template_website_frontpage.png",
    tagEn: "Tech Repair",
    tagZh: "科技維修",
    titleEn: "FIXHUB Phone Repair",
    titleZh: "FIXHUB 手機維修",
    descriptionEn: "A bilingual phone repair template with tech aesthetic.",
    descriptionZh: "一個帶有科技感雙語風格的手機維修模板。",
    category: "templates" as const,
  }
];

export default function Websites() {
  const [category, setCategory] = useState<'published' | 'templates'>('templates');
  const { t } = useLanguage();

  return (
    <section id="websites" className="section">
      <h2 className="section__title">{t('websites', '網站')}</h2>
      
      <div className="websites-toggle" role="tablist">
        <button 
          className={`websites-toggle__btn ${category === 'published' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => setCategory('published')}
          role="tab"
          aria-selected={category === 'published'}
        >
          {t('Client Websites', '客戶網站')}
        </button>
        <button 
          className={`websites-toggle__btn ${category === 'templates' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => setCategory('templates')}
          role="tab"
          aria-selected={category === 'templates'}
        >
          {t('Website Templates', '網站模板')}
        </button>
      </div>

      <div className="websites-grid-container">
        <div 
          className="websites-grid websites-grid--active"
          hidden={category !== 'published'}
        >
          {PUBLISHED_WEBSITES.map((site) => (
            <WebsiteCard key={site.href} {...site} />
          ))}
        </div>

        <div 
          className="websites-grid websites-grid--active"
          hidden={category !== 'templates'}
        >
          {TEMPLATES.map((site) => (
            <WebsiteCard key={site.href} {...site} />
          ))}
        </div>
      </div>
    </section>
  );
}
