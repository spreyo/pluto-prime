"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

type AboutStat = {
  target: number;
  suffix?: string;
  label: string;
};

type AboutStatsProps = {
  stats: AboutStat[];
  className?: string;
};

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function AboutStats({ stats, className = "" }: AboutStatsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [values, setValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const animationFrame = window.requestAnimationFrame(() => {
        setValues(stats.map((stat) => stat.target));
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }

    const duration = 1550;
    let animationFrame = 0;
    let startTime: number | undefined;

    const tick = (timestamp: number) => {
      startTime ??= timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setValues(
        stats.map((stat) =>
          progress === 1
            ? stat.target
            : Math.floor(stat.target * easedProgress),
        ),
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hasStarted, stats]);

  return (
    <div
      ref={rootRef}
      className={`mt-9 grid w-full max-w-md grid-cols-2 gap-8 px-5 sm:gap-10 ${className}`}
    >
      {stats.map((stat, index) => (
        <m.div
          key={stat.label}
          initial={{ opacity: 0, y: 26, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.62,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-[#171b1c] p-5 text-center shadow-[0_8px_10px_rgba(0,0,0,.28)]"
        >
          <p className="text-3xl font-extrabold leading-none text-[#d4a33e]">
            {values[index]}
            {stat.suffix}
          </p>
          <p className="mt-1 text-base font-extrabold leading-none text-white">
            {stat.label}
          </p>
        </m.div>
      ))}
    </div>
  );
}
