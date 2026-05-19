import type { Metadata } from "next";
import Link from "next/link";
import { gyre_adventor } from "@/fonts";
import {
  MotionBlock,
  MotionHeroItem,
  MotionHeroTitle,
  MotionRoot,
  MotionRule,
} from "../home-motion";
import { AboutStats } from "./about-stats";
import LionMark from "../components/lion-mark";
import { getDictionaryFromParams } from "@/dictionaries";

export const metadata: Metadata = {
  metadataBase: new URL("https://plutoprime.nl"),
  title: "Over Pluto Prime — Ervaring sinds 2000 in 5 Europese landen",
  description:
    "Sinds 2000 realiseren wij renovaties en verbouwingen in Nederland, België, Frankrijk, Duitsland en Slowakije. Lees over ons team, onze werkwijze en onze waarden.",
  alternates: {
    canonical: "/about",
  },
};

const stats = [
  { target: 25, suffix: "+", label: "years" },
  { target: 5, label: "countries" },
];





export default async function AboutPage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const dictionary = await getDictionaryFromParams(params);
  const page = dictionary.about;

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#fbf8f3] pt-16 text-[#202223]">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-7 pb-12 pt-24 text-center sm:px-10 md:pt-28 lg:pb-16">
          <MotionHeroItem delay={0.08}>
            <LionMark/>
            
          </MotionHeroItem>

          <MotionHeroTitle
            delay={0.18}
            className={`mt-8 text-[clamp(2.05rem,8vw,5.35rem)] font-bold uppercase leading-none tracking-[0.16em] text-[#d4a33e] drop-shadow-[0_8px_8px_rgba(212,163,62,.22)] lg:tracking-[0.2em] ${gyre_adventor.className}`}
          >
            {page.brand}
          </MotionHeroTitle>

          <MotionRule
            delay={0.3}
            className="mt-9 block h-px w-full max-w-xs bg-[#eadbbf]"
          />

          <MotionHeroItem
            delay={0.4}
            className="mt-9 text-lg font-medium uppercase tracking-[0.32em] text-[#d4a33e]"
          >
            {page.storyLabel}
          </MotionHeroItem>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-7 pb-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pb-28">
          <MotionBlock className="text-center lg:sticky lg:top-28 lg:text-left">
            <p className="text-lg font-semibold uppercase tracking-[0.02em] text-[#a86900]">
              {page.eyebrow}
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(2.25rem,7vw,4.6rem)] font-semibold leading-[1.18] tracking-[0.12em] text-[#202223] lg:mx-0 lg:max-w-md lg:text-[4.45rem] lg:tracking-[0.08em]">
              {page.title}
              <br />
              {page.year}
            </h2>

            <AboutStats
              stats={stats}
              className="hidden lg:mx-0 lg:grid lg:max-w-sm lg:px-0"
            />

            <div className="mt-12 hidden w-full lg:block">
              <h2 className="text-3xl font-extrabold tracking-[-0.01em] text-[#202223]">
                {page.ctaTitle}
              </h2>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-[#b87500] px-7 text-base font-extrabold text-white shadow-[0_7px_8px_rgba(0,0,0,.32)] transition hover:bg-[#9f6400]"
              >
                {page.cta}
              </Link>
            </div>
          </MotionBlock>

          <MotionBlock delay={0.12} className="w-full text-left">
            <article className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
              <div className="space-y-6 text-lg font-medium leading-[1.22] tracking-[0.01em] text-[#202223] sm:text-xl sm:leading-[1.36] lg:space-y-7 lg:text-[1.32rem] lg:leading-[1.45]">
                {page.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0
                        ? "lg:text-[1.55rem] lg:font-semibold lg:leading-[1.36]"
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </MotionBlock>

          <AboutStats stats={stats} className="mx-auto lg:hidden" />

          <MotionBlock
            delay={0.08}
            className="w-full text-center lg:hidden"
          >
            <h2 className="text-2xl font-extrabold tracking-[-0.01em] text-[#202223] sm:text-3xl">
              {page.ctaTitle}
            </h2>
            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-[#b87500] px-7 text-base font-extrabold text-white shadow-[0_7px_8px_rgba(0,0,0,.32)] transition hover:bg-[#9f6400]"
            >
              {page.cta}
            </Link>
          </MotionBlock>
        </section>
      </main>
    </MotionRoot>
  );
}
