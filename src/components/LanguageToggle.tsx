'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/types';

export default function LanguageToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const segments = pathname.split('/');
    segments[1] = lang === 'en' ? 'zh' : 'en';
    const newPathname = segments.join('/');
    router.push(newPathname);
  };

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}
