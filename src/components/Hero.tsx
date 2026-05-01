'use client';

import { Dictionary } from '@/types';
import Nav from './Nav';

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section className="hero">
      <div className="hero__container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero__content">
          <h1 className="hero__title">{dict.title}</h1>
          <p className="hero__subtitle">{dict.subtitle}</p>
        </div>
        <Nav dict={dict} />
      </div>
    </section>
  );
}
