"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
} from "framer-motion";
import LionMark from "./lion-mark";

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Renovations", href: "/renovations" },
  { label: "Cleaning", href: "/cleaning" },
  { label: "Workforce", href: "/workforce" },
  { label: "Contact", href: "/contact#formular" }];

const mobileNavItems = [
  { label: "Home", href: "/" },
  ...navItems,
];

const menuEase = [0.16, 1, 0.3, 1] as const;

const mobileMenuVariants = {
  closed: {
    y: "-100%",
  },
  open: {
    y: 0,
    transition: {
      duration: 0.68,
      ease: menuEase,
      when: "beforeChildren",
      staggerChildren: 0.075,
      delayChildren: 0.18,
    },
  },
};

const mobileMenuItemVariants = {
  closed: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
  },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease: menuEase,
    },
  },
};

type SiteNavbarProps = {
  ctaHref?: string;
};

export function SiteNavbar({ ctaHref = "/contact" }: SiteNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMenuOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
            isMenuOpen
              ? "border-transparent bg-transparent"
              : "border-b border-white/10 bg-[#171b1c]/95 shadow-[0_2px_8px_rgba(0,0,0,.34)] backdrop-blur"
          }`}
        >
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
            <Link
              href="/"
              className={`flex items-center gap-3 text-[#c88b16] transition-opacity md:opacity-100 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {/* <Image
                className="h-9 w-9"
                src="/logo.svg"
                alt="Pluto Prime lion logo"
                width={36}
                height={36}
                priority
              /> */}
              <LionMark width="32" height="32" />
              <span className="hidden text-sm font-black uppercase tracking-[0.24em] text-white sm:inline">
                Pluto Prime
              </span>
            </Link>
            <div className="hidden items-center gap-7 text-sm font-bold text-white/80 md:flex">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={ctaHref}
              className="hidden rounded-md bg-[#bd7f09] px-4 py-2 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(189,127,9,.32)] transition hover:bg-[#a96f05] md:inline-flex"
            >
              Quick Price Estimate
            </Link>
            <button
              type="button"
              className="relative z-50 grid h-11 w-11 place-items-center text-[#d0a24d] md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              <span className="relative block h-7 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-7 origin-center rounded-full bg-current transition duration-300 ${
                    isMenuOpen
                      ? "translate-y-0 rotate-45"
                      : "-translate-y-2 rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-7 rounded-full bg-current transition duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-7 origin-center rounded-full bg-current transition duration-300 ${
                    isMenuOpen
                      ? "translate-y-0 -rotate-45"
                      : "translate-y-2 rotate-0"
                  }`}
                />
              </span>
            </button>
          </nav>
        </m.header>

        <AnimatePresence>
          {isMenuOpen ? (
            <m.div
              id="mobile-menu"
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.44, ease: [0.7, 0, 0.84, 0] }}
              className="fixed inset-0 z-40 flex min-h-dvh flex-col items-center overflow-y-auto bg-[#171b1c] px-5 py-20 text-[#d0a24d] md:hidden"
            >
              <m.div variants={mobileMenuItemVariants}>
                <Image
                  className="mt-5 h-24 w-24"
                  src="/logo.svg"
                  alt="Pluto Prime lion logo"
                  width={96}
                  height={96}
                  priority
                />
              </m.div>

              <nav className="mt-14 flex flex-col items-center gap-7 text-center">
                {mobileNavItems.map((item) => (
                  <m.div
                    key={`${item.label}-${item.href}`}
                    variants={mobileMenuItemVariants}
                  >
                    <Link
                      href={item.href}
                      className="block text-2xl font-black uppercase tracking-[0.14em] transition-colors duration-300 hover:text-[#f0c86d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </m.div>
                ))}
              </nav>

              <m.div variants={mobileMenuItemVariants}>
                <button
                  type="button"
                  className="mt-10 grid h-12 w-12 place-items-center text-[#d0a24d] transition-colors duration-300 hover:text-[#f0c86d]"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative block h-8 w-8" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-0.5 w-8 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-0 top-1/2 h-0.5 w-8 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </m.div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
