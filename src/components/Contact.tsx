'use client';

import { useLanguage } from './LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section">
      <h2 className="section__title">{t('contact', '聯絡')}</h2>
      <p className="section__text">
        <strong>{t('Email:', '電郵：')}</strong>{' '}
        <a href="mailto:krishdgala@gmail.com" className="section__link">
          krishdgala@gmail.com
        </a>
      </p>
      <p className="section__text">
        <strong>{t('LinkedIn:', 'LinkedIn：')}</strong>{' '}
        <a 
          href="https://linkedin.com/in/krishgalani" 
          target="_blank" 
          rel="noopener" 
          className="section__link"
        >
          linkedin.com/in/krishgalani
        </a>
      </p>
    </section>
  );
}
