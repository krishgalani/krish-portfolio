import { Dictionary } from '@/types';

export default function Contact({ dict }: { dict: Dictionary['contact'] }) {
  return (
    <section id="contact" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <p className="section__text">
        <strong>{dict.email}</strong>{' '}
        <a href="mailto:krishdgala@gmail.com" className="section__link">
          krishdgala@gmail.com
        </a>
      </p>
      <p className="section__text">
        <strong>{dict.linkedin}</strong>{' '}
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
