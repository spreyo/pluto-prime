
import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { space_grotesk } from "@/fonts";
import LionMark from "../components/lion-mark";
import { Resend } from "resend";
import {
  MotionBlock,
  MotionHeroItem,
  MotionHeroTitle,
  MotionRoot,
  MotionSection,
} from "../home-motion";

export const metadata: Metadata = {
  title: "Kontakt | Pluto Prime",
  description:
    "Kontaktujte Pluto Prime pre rekonštrukcie, upratovanie alebo zabezpečenie pracovníkov v Holandsku.",
};


const resend = new Resend("re_eftZaWc4_Nhc3CLxiZrBWtihFb5dZxA1T");

type ContactEmailData = {
  meno: string;
  email: string;
  telefon: string;
  sprava: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sendEmail({ meno, email, telefon, sprava }: ContactEmailData){
    const html = '<table width:"100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a1a1a;max-width: 560px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;"><tr><td align="center" style="padding:36px 40px 24px;"><img src="https://plutoprime.tiiny.site/logo.svg" width="120" height="118" alt="PLUTO Prime logo" style="display:block;margin:0 auto 20px;"><div style="font-size:22px;font-weight:700;color:#ECC560;letter-spacing:4px;">PLUTO PRIME</div><div style="font-size:11px;color:#888888;letter-spacing:3px;margin-top:8px;">NOVÝ DOPYT Z WEBU</div></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td style="padding:28px 40px 8px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">MENO</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{meno}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">E-MAIL</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><a href="mailto:{{email}}" style="font-size:14px;color:#ECC560;text-decoration:none;">{{email}}</a></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">TELEFÓN</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:12px 14px;"><span style="font-size:14px;color:#ffffff;">{{telefon}}</span></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;"><tr><td style="font-size:11px;color:#ECC560;letter-spacing:1px;padding-bottom:6px;">SPRÁVA</td></tr><tr><td style="background-color:#252525;border-radius:4px;padding:14px 14px;"><span style="font-size:14px;color:#cccccc;line-height:1.6;">{{sprava}}</span></td></tr></table></td></tr><tr><td align="center" style="padding:0 40px 36px;"><a href="mailto:{{email}}" style="display:inline-block;background-color:#ECC560;color:#1a1a1a;font-size:13px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:4px;letter-spacing:1px;">ODPOVEDAŤ ZÁUJEMCOVI</a></td></tr><tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #2e2e2e;"></td></tr></table></td></tr><tr><td align="center" style="padding:20px 40px;"><span style="font-size:11px;color:#555555;">© 2025 PLUTO Prime &nbsp;·&nbsp; plutoprime.nl</span></td></tr></table>'
      .replaceAll("{{meno}}", escapeHtml(meno))
      .replaceAll("{{email}}", escapeHtml(email))
      .replaceAll("{{telefon}}", escapeHtml(telefon))
      .replaceAll("{{sprava}}", escapeHtml(sprava));

    return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'spreyyo@gmail.com',
    subject: "Pluto Prime contact form email",
    html
});

}
const goldText =
  "bg-[linear-gradient(135deg,#A76B0B_0%,#ECC560_100%)] bg-clip-text text-transparent";

const goldStroke = "stroke-[url(#contact-gold-gradient)]";

const inputClassName =
  "mt-1.5 min-h-11 w-full rounded-md border border-[#8b651f]/70 bg-[#303333] px-3.5 text-sm font-semibold text-white/88 outline-none transition placeholder:text-white/22 focus:border-[#ECC560] focus:ring-2 focus:ring-[#ECC560]/18";

const recentSubmissions = new Map<string, number>();
const submissionCooldownMs = 60_000;

function getFormString(formData: FormData, key: string, maxLength = 1000) {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhonePrefix(value: string) {
  return /^\+\d{1,4}$/.test(value);
}

function isValidPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  return (
    digits.length >= 5 &&
    digits.length <= 14 &&
    /^[\d\s().-]{5,24}$/.test(value)
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const lastSubmissionAt = recentSubmissions.get(key);

  if (lastSubmissionAt && now - lastSubmissionAt < submissionCooldownMs) {
    return true;
  }

  recentSubmissions.set(key, now);
  return false;
}

export default function ContactPage() {
  async function handleContactForm(formData: FormData) {
    "use server";

    const honeypot = getFormString(formData, "company", 200);
    const firstName = getFormString(formData, "firstName", 80);
    const lastName = getFormString(formData, "lastName", 80);
    const email = getFormString(formData, "email", 254);
    const phonePrefix = getFormString(formData, "phonePrefix", 5);
    const phone = getFormString(formData, "phone", 24);
    const message = getFormString(formData, "message", 2000);
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const combinedPhone = `${phonePrefix} ${phone}`.trim();
    const combinedPhoneDigits = combinedPhone.replace(/\D/g, "");

    if (honeypot) {
      return;
    }

    if (
      !fullName ||
      !isValidEmail(email) ||
      !isValidPhonePrefix(phonePrefix) ||
      !isValidPhoneNumber(phone) ||
      combinedPhoneDigits.length < 7 ||
      combinedPhoneDigits.length > 15 ||
      message.length < 10
    ) {
      return;
    }

    const rateLimitKey = `${email.toLowerCase()}|${combinedPhoneDigits}`;

    if (isRateLimited(rateLimitKey)) {
      return;
    }

    await sendEmail({
      meno: fullName,
      email,
      telefon: combinedPhone,
      sprava: message,
    });
  }

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
            Kontakt
          </MotionHeroTitle>

          <MotionHeroItem
            delay={0.3}
            className="mt-7 max-w-xl text-[1.1rem] font-extrabold leading-[1.35] tracking-[0.04em] text-white/78 sm:text-xl"
          >
            Máte otázku alebo projekt? Ozvite sa nám - radi pomôžeme.
          </MotionHeroItem>

          <MotionHeroItem delay={0.4} className="mt-7">
            <h2 className="text-xl font-extrabold uppercase tracking-[0.08em] text-white/82">
              Kontaktné údaje
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
            <form className="space-y-4" action={handleContactForm} id="formular">
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="company">Firma</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
                >
                  Meno
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Vaše meno"
                  required
                  maxLength={80}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
                >
                  Priezvisko
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Vaše priezvisko"
                  maxLength={80}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vas@email.sk"
                  required
                  maxLength={254}
                  className={inputClassName}
                />
              </div>

              <div>
                <p className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]">
                  Telefón
                </p>
                <div className="mt-1.5 grid grid-cols-[6.5rem_1fr] gap-3">
                  <div>
                    <label htmlFor="phonePrefix" className="sr-only">
                      Predvoľba
                    </label>
                    <input
                      id="phonePrefix"
                      name="phonePrefix"
                      type="tel"
                      autoComplete="tel-country-code"
                      placeholder="+31"
                      required
                      maxLength={5}
                      pattern="^\+\d{1,4}$"
                      aria-label="Telefónna predvoľba"
                      className={`${inputClassName} mt-0 text-center`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Telefónne číslo
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="612 345 678"
                      required
                      minLength={5}
                      maxLength={24}
                      pattern="^[\d\s().-]{5,24}$"
                      aria-label="Telefónne číslo bez predvoľby"
                      className={`${inputClassName} mt-0`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
                >
                  Popis projektu
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Povedzte nám viac o vašich požiadavkách"
                  required
                  minLength={10}
                  maxLength={2000}
                  className={`${inputClassName} min-h-32 resize-y py-3`}
                />
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[linear-gradient(135deg,#ECC560_0%,#FFD76A_100%)] px-7 text-base font-black uppercase tracking-[0.14em] text-black shadow-[0_8px_10px_rgba(0,0,0,.3)] transition hover:brightness-105 active:scale-[.99]"
              >
                Odoslať
              </button>
            </form>
          </MotionBlock>
        </MotionSection>
      </main>
    </MotionRoot>
  );
}
