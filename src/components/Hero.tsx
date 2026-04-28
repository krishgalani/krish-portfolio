import { Dictionary } from '@/types';
import Nav from './Nav';

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section className="hero">
      <h1 className="hero__title">{dict.title}</h1>
      <p className="hero__subtitle">{dict.subtitle}</p>
      <Nav dict={dict} />
    </section>
  );
}
