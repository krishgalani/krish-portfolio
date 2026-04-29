'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import WebsiteCard from './WebsiteCard';
import { Website, Locale, Dictionary } from '@/types';
import { PUBLISHED_WEBSITES, TEMPLATES } from '@/lib/data';

function WebsitesTabsContent({ 
  dict, 
  lang 
}: { 
  dict: Dictionary['websites']; 
  lang: Locale 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize state directly from searchParams to avoid flicker
  const [category, setCategory] = useState<'published' | 'templates'>(() => {
    const tab = searchParams.get('tab');
    return (tab === 'published' || tab === 'templates') ? tab : 'templates';
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'published' || tab === 'templates') {
      setCategory(tab as 'published' | 'templates');
    }
  }, [searchParams]);

  const handleTabChange = (newCategory: 'published' | 'templates') => {
    setCategory(newCategory);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newCategory);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="websites-toggle" role="tablist">
        <button 
          className={`websites-toggle__btn ${category === 'published' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => handleTabChange('published')}
          role="tab"
          aria-selected={category === 'published'}
        >
          {dict.clientWebsites}
        </button>
        <button 
          className={`websites-toggle__btn ${category === 'templates' ? 'websites-toggle__btn--active' : ''}`}
          onClick={() => handleTabChange('templates')}
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

export default function WebsitesTabs(props: { 
  dict: Dictionary['websites']; 
  lang: Locale 
}) {
  return (
    <Suspense fallback={<div className="websites-grid-container"><div className="websites-grid websites-grid--active">Loading...</div></div>}>
      <WebsitesTabsContent {...props} />
    </Suspense>
  );
}
