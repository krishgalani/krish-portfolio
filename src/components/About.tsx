import { Dictionary } from '@/types';

export default function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section id="about" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <div className="about-content">
        <p className="section__text">
          {dict.content}
        </p>
        <div className="skeleton rounded-md overflow-hidden flex-shrink-0">
          <img 
            src="/assets/BU_logo.png" 
            alt="Boston University Logo" 
            className="about__logo"
          />
        </div>
      </div>
    </section>
  );
}
