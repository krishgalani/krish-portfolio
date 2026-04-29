'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Locale } from '@/types';

function LanguageToggleContent({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleLanguage = () => {
    const segments = pathname.split('/');
    segments[1] = lang === 'en' ? 'zh' : 'en';
    const newPathname = segments.join('/');
    
    // Preserve search params
    const params = searchParams.toString();
    const queryString = params ? `?${params}` : '';
    
    // Preserve hash if it exists
    const hash = window.location.hash;
    
    router.push(`${newPathname}${queryString}${hash}`, { scroll: false });
  };

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}

export default function LanguageToggle({ lang }: { lang: Locale }) {
  return (
    <Suspense fallback={<button className="language-toggle">{lang === 'en' ? '中文' : 'EN'}</button>}>
      <LanguageToggleContent lang={lang} />
    </Suspense>
  );
}
