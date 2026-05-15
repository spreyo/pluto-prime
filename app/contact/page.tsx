
import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { space_grotesk } from "@/fonts";
import LionMark from "../components/lion-mark";
import { ContactForm } from "./contact-form";
import {
  MotionBlock,
  MotionHeroItem,
  MotionHeroTitle,
  MotionRoot,
  MotionSection,
} from "../home-motion";
import { getDictionaryFromParams } from "@/dictionaries";

export const metadata: Metadata = {
  title: "Kontakt | Pluto Prime",
  description:
    "Kontaktujte Pluto Prime pre rekonštrukcie, upratovanie alebo zabezpečenie pracovníkov v Holandsku.",
};

const goldText =
  "bg-[linear-gradient(135deg,#A76B0B_0%,#ECC560_100%)] bg-clip-text text-transparent";

const goldStroke = "stroke-[url(#contact-gold-gradient)]";

const inputClassName =
  "mt-1.5 min-h-11 w-full rounded-md border border-[#8b651f]/70 bg-[#303333] px-3.5 text-sm font-semibold text-white/88 outline-none transition placeholder:text-white/22 focus:border-[#ECC560] focus:ring-2 focus:ring-[#ECC560]/18";

export default async function ContactPage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const dictionary = await getDictionaryFromParams(params);
  const page = dictionary.contact;

  return (
    <MotionRoot>
      <main className="min-h-screen bg-[#1b1f20] px-6 pb-20 pt-16 text-[#e5e0d8] sm:px-10">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <linearGradient
              id="contact-gold-gradient"
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

        <section className="mx-auto flex w-full max-w-3xl flex-col items-center pb-14 pt-24 text-center sm:pt-28 lg:pb-20">
          <MotionHeroItem delay={0.08}>
            <LionMark className="mx-auto h-40 w-40 text-[#d49a21] drop-shadow-[0_16px_26px_rgba(0,0,0,.75)] sm:h-52 sm:w-52" />
          </MotionHeroItem>

          <MotionHeroTitle
            delay={0.18}
            className={`mt-5 text-[clamp(1.7rem,8vw,3.7rem)] font-bold uppercase leading-none tracking-[0.18em] drop-shadow-[0_8px_16px_rgba(0,0,0,.5)] ${space_grotesk.className} ${goldText}`}
          >
            {page.title}
          </MotionHeroTitle>

          <MotionHeroItem
            delay={0.3}
            className="mt-7 max-w-xl text-[1.1rem] font-extrabold leading-[1.35] tracking-[0.04em] text-white/78 sm:text-xl"
          >
            {page.intro}
          </MotionHeroItem>

          <MotionHeroItem delay={0.4} className="mt-7">
            <h2 className="text-xl font-extrabold uppercase tracking-[0.08em] text-white/82">
              {page.detailsHeading}
            </h2>
            <div className="mt-5 space-y-2 text-xl font-medium leading-tight text-white/86 sm:text-2xl">
              <a
                href="tel:+491745803567"
                className="flex items-center justify-center gap-2 transition hover:text-[#ECC560]"
              >
                <Phone className={`h-6 w-6 shrink-0 ${goldStroke}`} />
                +49 174 5803567
              </a>
              <a
                href="mailto:info@plutoprime.nl"
                className="flex items-center justify-center gap-2 transition hover:text-[#ECC560]"
              >
                <Mail className={`h-6 w-6 shrink-0 ${goldStroke}`} />
                info@plutoprime.nl
              </a>
            </div>
          </MotionHeroItem>
        </section>

        <MotionSection id="formular" className="mx-auto max-w-xl">
          <MotionBlock className="rounded-2xl bg-[#25292a] px-7 py-8 shadow-[0_0_25px_3px_rgba(167,107,11,.10)] sm:px-10 sm:py-10">
            <ContactForm
              form={page.form}
              inputClassName={inputClassName}
            />
          </MotionBlock>
        </MotionSection>
      </main>
    </MotionRoot>
  );
}
