import Hero from '@/components/Hero';
import About from '@/components/About';
import Websites from '@/components/Websites';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/types';
import { preload } from 'react-dom';
import { PUBLISHED_WEBSITES, TEMPLATES } from '@/lib/data';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  // Phase 2: Implement Header Preloads
  preload('/assets/BU_logo.png', { as: 'image' });
  // Preload first few website thumbnails for better initial load
  PUBLISHED_WEBSITES.slice(0, 2).forEach(site => preload(site.thumbnail, { as: 'image' }));
  TEMPLATES.slice(0, 2).forEach(site => preload(site.thumbnail, { as: 'image' }));

  return (
    <main className="page">
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Websites dict={dict.websites} lang={locale} />
      <Projects dict={dict.projects} />
      <Contact dict={dict.contact} />
    </main>
  );
}
