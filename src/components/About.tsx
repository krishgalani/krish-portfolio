'use client';

import { Dictionary } from '@/types';
import SkeletonImage from './SkeletonImage';

export default function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section id="about" className="section">
      <h2 className="section__title">{dict.title}</h2>
      <div className="about-content">
        <p className="section__text">
          {dict.content}
        </p>
        <SkeletonImage 
          src="/assets/BU_logo.png" 
          alt="Boston University Logo" 
          className="about__logo"
          containerClassName="rounded-md overflow-hidden flex-shrink-0"
        />
      </div>
    </section>
  );
}
