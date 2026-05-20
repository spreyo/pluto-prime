import Image from "next/image";
import Link from "next/link";
import { Check, CircleDot, Globe, Phone, Plane } from "lucide-react";
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
import { defaultLocale, isLocale } from "@/i18n";
import { generateLocalizedMetadata } from "../seo-metadata";

export function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  return generateLocalizedMetadata("premium", params);
}

const benefitIcons = [Check, Plane, Phone];

const projectImage =
  "/img/villa.jpg";

const goldText =
  "bg-[linear-gradient(135deg,#A76B0B_0%,#ECC560_100%)] bg-clip-text text-transparent";

const goldStroke = "stroke-[url(#premium-gold-gradient)]";

export default async function PremiumPage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = params ? await params : undefined;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
  const dictionary = await getDictionaryFromParams(params);
  const page = dictionary.premium;

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#1b1f20] pt-16 text-[#e5e0d8]">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <linearGradient
              id="premium-gold-gradient"
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
          <MotionHeroBackground className="absolute inset-0 overflow-hidden">
            <video
              className="h-full w-full object-cover opacity-42"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/img/luxury.mp4" type="video/mp4" />
            </video>
          </MotionHeroBackground>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,25,26,.24)_0%,rgba(22,25,26,.38)_48%,#1b1f20_100%)]" />

          <div className="relative mx-auto max-w-3xl">
            <MotionHeroItem delay={0.08}>
              <LionMark className="mx-auto h-40 w-40 text-[#d49a21] drop-shadow-[0_16px_26px_rgba(0,0,0,.75)] sm:h-52 sm:w-52" />
            </MotionHeroItem>
            <MotionHeroTitle
              delay={0.18}
              className={`mt-4 text-[clamp(1.65rem,8vw,3.65rem)] font-bold uppercase leading-[1.18] tracking-[0.18em] drop-shadow-[0_8px_16px_rgba(0,0,0,.5)] ${space_grotesk.className} ${goldText}`}
            >
              {page.titleLine1}
              <br />
              {page.titleLine2}
            </MotionHeroTitle>
            <MotionHeroItem
              delay={0.28}
              className="mx-auto mt-7 max-w-xl text-[1.45rem] font-extrabold leading-[1.25] tracking-[0.05em] text-white/82 sm:text-3xl"
            >
              {page.subtitle}
            </MotionHeroItem>
            <MotionHeroItem
              delay={0.38}
              className="mx-auto mt-9 max-w-xl space-y-5 text-left text-[1.08rem] font-extrabold leading-[1.22] tracking-[0.02em] text-white/78 sm:text-center sm:text-xl"
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
              <Globe className={`mx-auto h-16 w-16 stroke-[1.8] lg:mx-0 ${goldStroke}`} />
              <p className="mt-8 text-[1.05rem] font-extrabold leading-[1.22] tracking-[0.02em] text-white/74">
                {page.main}
              </p>
            </MotionBlock>

            <MotionBlock
              delay={0.08}
              className="group mx-auto w-full max-w-xl overflow-hidden rounded-lg shadow-[0_0_25px_3px_rgba(167,107,11,.25)]"
            >
              <Image
                src={projectImage}
                alt="Premium international renovation project by the sea"
                width={900}
                height={620}
                loading="lazy"
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[1.45/1] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
            </MotionBlock>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#242829] px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className={`inline-flex items-center gap-3 text-2xl font-extrabold sm:text-3xl ${goldText}`}>
                <CircleDot className={`h-7 w-7 ${goldStroke}`} />
                {page.whyHeading}
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];

                return (
                  <MotionBlock
                    key={benefit.title}
                    delay={index * 0.08}
                    className="rounded-xl bg-[#1b1f20] px-6 py-9 text-center shadow-[0_12px_24px_rgba(0,0,0,.22)]"
                  >
                    <Icon className={`mx-auto h-14 w-14 stroke-[1.8] ${goldStroke}`} />
                    <h3 className="mx-auto mt-5 max-w-40 text-base font-extrabold leading-tight text-white/86">
                      {benefit.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-40 text-sm font-semibold leading-tight text-white/42">
                      {benefit.description}
                    </p>
                  </MotionBlock>
                );
              })}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#fbf8f3] px-6 py-14 text-[#171b1c] sm:px-10 sm:py-20">
          <MotionBlock className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-base font-extrabold uppercase tracking-[0.02em] text-[#bd7f09]">
              {page.ctaEyebrow}
            </p>
            <h2 className="mt-1 text-3xl font-extrabold leading-[1.03] tracking-[0.01em] sm:text-5xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-2 max-w-lg text-base font-bold leading-tight text-[#171b1c] sm:text-lg">
              {page.ctaText}
            </p>
            <Link
              href={`/${locale}/contact`}
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
