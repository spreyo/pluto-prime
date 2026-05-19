
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
                {page.details.germanyPhone}
              </a>
              <a
                href="tel:+421940535448"
                className="flex items-center justify-center gap-2 transition hover:text-[#ECC560]"
              >
                <Phone className={`h-6 w-6 shrink-0 ${goldStroke}`} />
                {page.details.slovakiaPhone}
              </a>
              <a
                href="https://wa.me/421940535448"
                className="flex items-center justify-center gap-2 transition hover:text-[#ECC560]"
              >
                {/* <MessageCircle className={`h-6 w-6 shrink-0 ${goldStroke}`} /> */}
                <svg className={`h-6 w-6 shrink-0 ${goldStroke}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path
                    id="SVGRepo_iconCarrier"
                    fill="url(#contact-gold-gradient)"
                    fillRule="evenodd"
                    d="M3.5 12a8.5 8.5 0 1 1 8.5 8.5 8.46 8.46 0 0 1-4.542-1.314 1 1 0 0 0-.821-.113l-2.88.859 1.085-2.537a1 1 0 0 0-.07-.92A8.46 8.46 0 0 1 3.5 12M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 1.838.473 3.568 1.305 5.073L1.08 21.107a1 1 0 0 0 1.206 1.351l4.5-1.342A10.46 10.46 0 0 0 12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5m2.293 12.682-1.315.926A9.3 9.3 0 0 1 11 13.585a10.2 10.2 0 0 1-1.624-2.114l.835-.709a1 1 0 0 0 .236-1.232l-1.064-2a1 1 0 0 0-1.54-.283l-.316.275c-.759.662-1.208 1.75-.836 2.852A12.05 12.05 0 0 0 9.586 15c1.813 1.813 3.655 2.528 4.733 2.805.868.223 1.689-.076 2.268-.548l.591-.482a1 1 0 0 0-.12-1.634l-1.678-1a1 1 0 0 0-1.088.041"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {page.details.whatsapp}
              </a>
              <a
                href="mailto:info@plutoprime.nl"
                className="flex items-center justify-center gap-2 transition hover:text-[#ECC560]"
              >
                <Mail className={`h-6 w-6 shrink-0 ${goldStroke}`} />
                {page.details.email}
              </a>
                <a href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B91WJlo7MT%2FCUuWzYUFKUTw%3D%3D" className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]">
                  <svg className={`h-6 w-6 shrink-0 ${goldStroke}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="url(#contact-gold-gradient)" strokeWidth="0.6"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="url(#contact-gold-gradient)"></path> <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="url(#contact-gold-gradient)"></path> <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="url(#contact-gold-gradient)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="url(#contact-gold-gradient)"></path> </g></svg>
                  {page.details.linkedin}
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
