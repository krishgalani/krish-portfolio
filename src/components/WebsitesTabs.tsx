'use client';

import { useState } from 'react';
import WebsiteCard from './WebsiteCard';
import { Website, Locale, Dictionary } from '@/types';
import { PUBLISHED_WEBSITES, TEMPLATES } from '@/lib/data';

export default function WebsitesTabs({ 
  dict, 
  lang 
}: { 
  dict: Dictionary['websites']; 
  lang: Locale 
}) {
  const [category, setCategory] = useState<'published' | 'templates'>('templates');

  return (
    <>
      <div className="websites-toggle" role="tablist">
        <button 
          className={`websites-toggle__btn ${category === 'published' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => setCategory('published')}
          role="tab"
          aria-selected={category === 'published'}
        >
          {dict.clientWebsites}
        </button>
        <button 
          className={`websites-toggle__btn ${category === 'templates' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => setCategory('templates')}
          role="tab"
          aria-selected={category === 'templates'}
        >
          {dict.websiteTemplates}
        </button>
      </div>

      <div className="websites-grid-container">
        <div 
          className="websites-grid websites-grid--active"
          hidden={category !== 'published'}
        >
          {PUBLISHED_WEBSITES.map((site) => (
            <WebsiteCard key={site.href} site={site as Website} lang={lang} />
          ))}
        </div>

        <div 
          className="websites-grid websites-grid--active"
          hidden={category !== 'templates'}
        >
          {TEMPLATES.map((site) => (
            <WebsiteCard key={site.href} site={site as Website} lang={lang} />
          ))}
        </div>
      </div>
    </>
  );
}
