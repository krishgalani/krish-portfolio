'use client';

import { useLanguage } from './LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <h2 className="section__title">{t('about', '關於')}</h2>
      <div className="about-content">
        <p className="section__text">
          {t(
            "I graduated from Boston University ('24) with a B.A. in Computer Science. I enjoy making websites for small businesses in Hong Kong, I make use modern coding AI assistants with the Next.js framework for fast and flexible deployment. I am capable of integrating third party functionality, including booking, and e-commerce features.",
            "我是波士頓大學計算機科學學士畢業生（'24）。我熱衷於為香港小型企業製作網站，運用現代AI 編程助手配合 Next.js 框架，實現快速靈活的部署。我能整合第三方功能，包括預訂系統和電子商務功能。"
          )}
        </p>
        <img 
          src="/resources/BU_logo.png" 
          alt="Boston University Logo" 
          className="about__logo"
        />
      </div>
    </section>
  );
}
