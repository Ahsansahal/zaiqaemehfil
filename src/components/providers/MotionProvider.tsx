"use client";

import { useEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  useScroll,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-hi pointer-events-none"
    />
  );
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (prefersReduced || !isFinePointer) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <ScrollProgressBar />
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
