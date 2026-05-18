import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  BriefcaseBusiness,
  BrushCleaning,
  Check,
  CircleDot,
  Factory,
  House,
  RefreshCw,
  Wrench,
} from "lucide-react";
import { space_grotesk } from "@/fonts";
import LionMark from "../components/lion-mark";
import {
  MotionBlock,
  MotionHeroBackground,
  MotionHeroItem,
  MotionHeroTitle,
  MotionRoot,
  MotionSection,
} from "../home-motion";
import { getDictionaryFromParams } from "@/dictionaries";

export const metadata: Metadata = {
  title: "Upratovanie | Pluto Prime",
  description:
    "Profesionálne upratovacie služby pre domácnosti, firmy, hotely a priemyselné objekty v Holandsku.",
};

const serviceIcons = [
  House,
  BriefcaseBusiness,
  BedDouble,
  Factory,
  RefreshCw,
];

const heroImage =
  "/img/cleaning.jpg";

const cleaningImage =
  "/img/cleaning-section.jpg";

const goldText =
  "bg-[linear-gradient(135deg,#A76B0B_0%,#ECC560_100%)] bg-clip-text text-transparent";

const goldStroke = "stroke-[url(#cleaning-gold-gradient)]";

export default async function CleaningPage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const dictionary = await getDictionaryFromParams(params);
  const page = dictionary.cleaning;

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#1b1f20] pt-16 text-[#e5e0d8]">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <linearGradient
              id="cleaning-gold-gradient"
              x1="0"
              y1="0"
              x2="24"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#A76B0B" />
              <stop offset="100%" stopColor="#ECC560" />
            </linearGradient>
          </defs>
        </svg>

        <section className="relative overflow-hidden px-6 pb-12 pt-24 text-center sm:px-10 sm:pt-28 lg:pb-20">
          <MotionHeroBackground className="absolute inset-0">
            <Image
              src={heroImage}
              preload={true}
              alt="Profesionálne upratovanie interiéru"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
              
            />
          </MotionHeroBackground>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,25,26,.18)_0%,rgba(22,25,26,.32)_48%,#1b1f20_100%)]" />

          <div className="relative mx-auto max-w-3xl">
            <MotionHeroItem delay={0.08}>
              <LionMark className="mx-auto h-40 w-40 text-[#d49a21] drop-shadow-[0_16px_26px_rgba(0,0,0,.75)] sm:h-52 sm:w-52" />
            </MotionHeroItem>
            <MotionHeroTitle
              delay={0.18}
              className={`mt-4 text-[clamp(1.7rem,8vw,3.7rem)] font-bold uppercase leading-none tracking-[0.18em] drop-shadow-[0_8px_16px_rgba(0,0,0,.5)] ${space_grotesk.className} ${goldText}`}
            >
              {page.title}
            </MotionHeroTitle>
            <MotionHeroItem
              delay={0.3}
              className="mx-auto mt-7 max-w-xl space-y-5 text-left text-[1.08rem] font-extrabold leading-[1.22] tracking-[0.02em] text-white/78 sm:text-center sm:text-xl"
            >
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </MotionHeroItem>
          </div>
        </section>

        <MotionSection className="px-6 pb-12 pt-8 sm:px-10 lg:pb-20">
          <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <MotionBlock className="mx-auto max-w-xl text-left lg:pt-8">
              <BrushCleaning className={`mx-auto h-16 w-16 stroke-[1.8] lg:mx-0 ${goldStroke}`} />
              <p className="mt-8 text-[1.05rem] font-extrabold leading-[1.22] tracking-[0.02em] text-white/74">
                {page.main}
              </p>
            </MotionBlock>

            <MotionBlock
              delay={0.08}
              className="group mx-auto w-full max-w-xl overflow-hidden rounded-lg shadow-[0_0_25px_3px_rgba(167,107,11,.25)]"
            >
              <Image
                src={cleaningImage}
                alt="Upratovacie vybavenie pripravené na prácu"
                width={900}
                height={620}
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[1.45/1] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
            </MotionBlock>
          </div>

          <MotionBlock
            delay={0.1}
            className="mx-auto mt-12 max-w-5xl text-center"
          >
            <h2 className={`inline-flex items-center gap-3 text-xl font-extrabold ${goldText}`}>
              <Wrench className={`h-6 w-6 ${goldStroke}`} />
              {dictionary.servicePage.servicesHeading}
            </h2>
            <ul className="mx-auto mt-6 grid max-w-4xl gap-x-10 gap-y-4 text-left text-[1rem] font-extrabold leading-tight tracking-[0.02em] text-white/72 sm:grid-cols-2 lg:grid-cols-3">
              {page.services.map((service, index) => {
                const Icon = serviceIcons[index];

                return (
                  <li
                  key={service}
                  className="flex min-w-0 items-start gap-3"
                >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 stroke-[2.1] ${goldStroke}`} />
                    <span>{service}</span>
                  </li>
                );
              })}
            </ul>
          </MotionBlock>
        </MotionSection>

        <MotionSection className="grid place-items-center bg-[#242829] px-6 py-20 sm:px-10">
          <div className="flex w-fit max-w-full flex-col items-center">
            <h2 className={`inline-flex items-center gap-3 text-xl font-extrabold ${goldText}`}>
              <CircleDot className={`h-6 w-6 ${goldStroke}`} />
              {dictionary.servicePage.whyHeading}
            </h2>
            <ul className="mx-auto mt-7 w-fit max-w-full space-y-4 text-left text-[1.05rem] font-extrabold leading-tight tracking-[0.02em] text-white/74">
              {page.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <Check className={`mt-0.5 h-5 w-5 shrink-0 stroke-[2.4] ${goldStroke}`} />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#fbf8f3] px-6 py-14 text-[#171b1c] sm:px-10 sm:py-20">
          <MotionBlock className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-base font-extrabold uppercase tracking-[0.02em] text-[#bd7f09]">
              {dictionary.servicePage.offerEyebrow}
            </p>
            <h2 className="mt-1 text-3xl font-extrabold leading-[1.03] tracking-[0.01em] sm:text-5xl">
              {dictionary.servicePage.projectStart}
            </h2>
            <p className="mt-2 max-w-lg text-base font-bold leading-tight text-[#171b1c] sm:text-lg">
              {page.ctaText}
            </p>
            <Link
              href="mailto:info@plutoprime.nl?subject=Cenova%20ponuka%20-%20upratovanie"
              className="mt-9 inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-md bg-[#c9963d] px-7 text-base font-extrabold text-white shadow-[0_8px_10px_rgba(0,0,0,.3)] transition hover:bg-[#ad7a21]"
            >
              {dictionary.servicePage.contactButton}
            </Link>
          </MotionBlock>
        </MotionSection>
      </main>
    </MotionRoot>
  );
}
