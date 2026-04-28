'use client';

import { useLanguage } from './LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      className="lang-toggle"
      onClick={toggleLanguage}
      aria-label={t('Switch to Chinese', '切換到英文')}
    >
      {language === 'en' ? 'EN/中' : '中/EN'}
    </button>
  );
}
