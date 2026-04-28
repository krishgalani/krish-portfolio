import WebsitesTabs from './WebsitesTabs';
import { Locale, Dictionary } from '@/types';

export default function Websites({ 
  dict, 
  lang 
}: { 
  dict: Dictionary['websites']; 
  lang: Locale 
}) {
  return (
    <section id="websites" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <WebsitesTabs dict={dict} lang={lang} />
    </section>
  );
}
