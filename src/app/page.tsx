import Hero from '@/components/Hero';
import About from '@/components/About';
import Websites from '@/components/Websites';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <About />
      <Websites />
      <Projects />
      <Contact />
    </main>
  );
}
