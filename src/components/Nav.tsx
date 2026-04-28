import { Dictionary } from '@/types';

export default function Nav({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <nav className="hero__nav">
      <ul className="hero__list">
        <li className="hero__item">
          <a href="#about" className="hero__link">{dict.about}</a>
        </li>
        <li className="hero__item">
          <a href="#websites" className="hero__link">{dict.websites}</a>
        </li>
        <li className="hero__item">
          <a href="#projects" className="hero__link">{dict.projects}</a>
        </li>
        <li className="hero__item">
          <a href="#contact" className="hero__link">{dict.contact}</a>
        </li>
        <li className="hero__item">
          <a 
            href="/assets/Krish_Galani___CV.pdf" 
            className="hero__link" 
            target="_blank" 
            rel="noopener"
          >
            {dict.cv}
          </a>
        </li>
      </ul>
    </nav>
  );
}
