"use client";

import type { ReactNode } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  type HTMLElements,
  type HTMLMotionProps,
} from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;
const revealViewport = { once: true, amount: 0.24 };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const heroFade = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

type MotionRootProps = {
  children: ReactNode;
};

type TimedProps<T extends keyof HTMLElements> = HTMLMotionProps<T> & {
  delay?: number;
};

export function MotionRoot({ children }: MotionRootProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export function MotionHeader(props: HTMLMotionProps<"header">) {
  return (
    <m.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionHeroBackground(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      initial={{ scale: 1.06, y: 16 }}
      animate={{ scale: 1.01, y: 0 }}
      transition={{ duration: 2.2, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionHeroItem({
  delay = 0,
  ...props
}: TimedProps<"div">) {
  return (
    <m.div
      variants={heroFade}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.72, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionHeroTitle({
  delay = 0,
  ...props
}: TimedProps<"h1">) {
  return (
    <m.h1
      variants={heroFade}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.72, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionRule({ delay = 0, ...props }: TimedProps<"span">) {
  return (
    <m.span
      initial={{ opacity: 0, scaleX: 0.25 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.74, delay, ease: easeOut }}
      style={{ transformOrigin: "center" }}
      {...props}
    />
  );
}

export function MotionServiceItem({
  delay = 0,
  ...props
}: TimedProps<"div">) {
  return (
    <m.div
      variants={heroFade}
      initial="hidden"
      animate="show"
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.68, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionSection({
  delay = 0,
  ...props
}: TimedProps<"section">) {
  return (
    <m.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ duration: 0.72, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionBlock({ delay = 0, ...props }: TimedProps<"div">) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ duration: 0.68, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionArticle({
  delay = 0,
  ...props
}: TimedProps<"article">) {
  return (
    <m.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.68, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionFeatureCard({
  delay = 0,
  ...props
}: TimedProps<"div">) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.62, delay, ease: easeOut }}
      {...props}
    />
  );
}

export function MotionLink({ delay = 0, ...props }: TimedProps<"a">) {
  return (
    <m.a
      variants={heroFade}
      initial="hidden"
      animate="show"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.66, delay, ease: easeOut }}
      {...props}
    />
  );
}
