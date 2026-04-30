'use client';

import { useEffect, useRef } from 'react';
import { Dictionary } from '@/types';
import Nav from './Nav';

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  element: HTMLDivElement | null;
}

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>([
    { x: -100, y: -60, vx: 1.5, vy: -1.2, mass: 200, element: null }, 
    { x: 100, y: -60, vx: -1.0, vy: -1.5, mass: 100, element: null },  
    { x: 0, y: 120, vx: -0.8, vy: 2.5, mass: 350, element: null },    
  ]);

  useEffect(() => {
    const bodies = bodiesRef.current;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Stability parameters
    const G = isMobile ? 2.8 : 2.5; 
    const dt = 0.3; // Smaller time step for better stability
    const softening = 2000; // Much higher to prevent extreme "slingshots"
    const centeringForce = 0.01;

    // Boundary limits (px from center)
    const limitX = isMobile ? (window.innerWidth / 2) - 20 : 500;
    const limitY = isMobile ? 350 : 450;

    let animationFrameId: number;

    const update = () => {
      // Calculate forces
      for (let i = 0; i < bodies.length; i++) {
        let fx = 0;
        let fy = 0;
        const a = bodies[i];

        // 1. Gravitational pull between bodies
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const b = bodies[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy + softening;
          const dist = Math.sqrt(distSq);
          const force = (G * a.mass * b.mass) / distSq;

          fx += (force * dx) / dist;
          fy += (force * dy) / dist;
        }

        // 2. Strong restoring force if out of bounds
        const distFromCenterX = Math.abs(a.x);
        const distFromCenterY = Math.abs(a.y);

        if (distFromCenterX > limitX) {
          a.vx -= Math.sign(a.x) * (distFromCenterX - limitX) * 0.1;
          // Dampen velocity when hitting the "wall" to prevent bouncing out
          a.vx *= 0.95; 
        }
        if (distFromCenterY > limitY) {
          a.vy -= Math.sign(a.y) * (distFromCenterY - limitY) * 0.1;
          a.vy *= 0.95;
        }

        // Update velocity
        a.vx += (fx / a.mass) * dt;
        a.vy += (fy / a.mass) * dt;
      }

      // Update positions and DOM
      for (const body of bodies) {
        body.x += body.vx * dt;
        body.y += body.vy * dt;

        if (body.element) {
          body.element.style.transform = `translate(${body.x}px, ${body.y}px)`;
        }
      }

      // Keep the system centered around the text
      let centerX = 0;
      let centerY = 0;
      for (const body of bodies) {
        centerX += body.x;
        centerY += body.y;
      }
      centerX /= bodies.length;
      centerY /= bodies.length;

      for (const body of bodies) {
        body.x -= centerX * centeringForce;
        body.y -= centerY * centeringForce;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="hero">
      <div className="three-body-system" ref={containerRef}>
        <div 
          ref={(el) => { if (bodiesRef.current[0]) bodiesRef.current[0].element = el; }}
          className="sun sun-1"
          style={{ animation: 'none' }}
        ></div>
        <div 
          ref={(el) => { if (bodiesRef.current[1]) bodiesRef.current[1].element = el; }}
          className="sun sun-2"
          style={{ animation: 'none' }}
        ></div>
        <div 
          ref={(el) => { if (bodiesRef.current[2]) bodiesRef.current[2].element = el; }}
          className="sun sun-3"
          style={{ animation: 'none' }}
        ></div>
        <h1 className="hero__title">{dict.title}</h1>
      </div>
      <p className="hero__subtitle">{dict.subtitle}</p>
      <Nav dict={dict} />
    </section>
  );
}
