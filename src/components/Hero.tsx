'use client';

import { useLanguage } from './LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <h1 className="hero__title">{t('Krish Galani', '葛杰斯')}</h1>
      <p className="hero__subtitle">{t('Full-stack Engineer', '全棧工程師')}</p>
      
      <nav className="hero__nav">
        <ul className="hero__list">
          <li className="hero__item">
            <a href="#about" className="hero__link">{t('about', '關於')}</a>
          </li>
          <li className="hero__item">
            <a href="#projects" className="hero__link">{t('projects', '項目')}</a>
          </li>
          <li className="hero__item">
            <a href="#websites" className="hero__link">{t('websites', '網站')}</a>
          </li>
          <li className="hero__item">
            <a href="#contact" className="hero__link">{t('contact', '聯絡')}</a>
          </li>
          <li className="hero__item">
            <a 
              href="/resources/Krish_Galani___CV.pdf" 
              className="hero__link" 
              target="_blank" 
              rel="noopener"
            >
              {t('cv', '履歷')}
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
