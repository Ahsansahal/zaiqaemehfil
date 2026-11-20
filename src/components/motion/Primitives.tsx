"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type HTMLMotionProps,
} from "framer-motion";

export const LUX_EASE = [0.32, 0.72, 0, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.8,
  className,
  ...rest
}: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: LUX_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

interface StaggerGridProps extends HTMLMotionProps<"div"> {
  stagger?: number;
}

export function StaggerGrid({
  children,
  stagger = 0.09,
  className,
  ...rest
}: StaggerGridProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.75, ease: LUX_EASE },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function MotionCard({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <m.div
      whileHover={{ y: -6, transition: { duration: 0.4, ease: LUX_EASE } }}
      whileTap={{ scale: 0.985 }}
      className={className}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function ScrollLine({ className = "bg-bone-line" }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: LUX_EASE }}
      className={`flex-1 h-px origin-left self-center ${className}`}
    />
  );
}

export function ParallaxWrap({
  children,
  offset = 42,
  scaleRange,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  scaleRange?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange ? [scaleRange[0], scaleRange[1]] : [1, 1]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <m.div style={{ y, scale }} className="w-full h-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}

export function ScrollVelocityMarquee({ items }: { items: readonly string[] }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef(1);
  const pausedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return;
    let moveBy = directionFactor.current * -0.022 * (delta / 16.67);

    const vf = velocityFactor.get();
    if (vf < 0) {
      directionFactor.current = -1;
    } else if (vf > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.min(Math.abs(vf), 4);
    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      className="border-y border-[rgba(240,234,222,0.06)] overflow-hidden py-4 bg-ink select-none"
    >
      <m.div style={{ x }} className="flex w-max will-change-transform">
        {[...items, ...items].map((dish, idx) => (
          <span
            key={`${dish}-${idx}`}
            className="font-serif text-[1.28rem] text-muted whitespace-nowrap flex items-center gap-12 pr-12 after:content-['◆'] after:text-[0.5rem] after:text-gold-deep"
          >
            {dish}
          </span>
        ))}
      </m.div>
    </div>
  );
}

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value.toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const duration = 950;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value.toFixed(decimals));
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix && <small className="text-[0.55em] ml-0.5">{suffix}</small>}
    </span>
  );
}
