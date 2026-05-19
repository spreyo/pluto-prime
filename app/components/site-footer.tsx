"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Contact, Mail, MessageCircle, Phone } from "lucide-react";
import LionMark from "./lion-mark";
import { space_grotesk } from "@/fonts";
import { getLocaleFromPathname, localizeHref } from "@/i18n";
import { getClientDictionary } from "@/dictionaries";

const footerLinks = [
  { key: "about", href: "/about" },
  { key: "renovations", href: "/renovations" },
  { key: "cleaning", href: "/cleaning" },
  { key: "workforce", href: "/workforce" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteFooter() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const dictionary = getClientDictionary(currentLocale);

  return (
    <footer className="bg-[#171b1c] px-5 pb-9 pt-10 text-center">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <LionMark className="h-20 w-20 text-[#d0a24d]" />
        <p className={`mt-2 whitespace-nowrap bg-[linear-gradient(135deg,#A76B0B_0%,#ECC560_100%)] bg-clip-text text-2xl font-black ${space_grotesk.className} uppercase leading-none tracking-[0.08em] text-transparent`}>
          Pluto Prime
        </p>

        <div className="mt-5 space-y-1 text-sm font-semibold leading-tight text-white/62">
          <a
            href="tel:+491745803567"
            className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]"
          >
            <Phone className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.germanyPhone}
          </a>
          <a
            href="tel:+421940535448"
            className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]"
          >
            <Phone className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.slovakiaPhone}
          </a>
          <a
            href="https://wa.me/421940535448"
            className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]"
          >
            <MessageCircle className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.whatsapp}
          </a>
          <a
            href="mailto:info@plutoprime.nl"
            className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]"
          >
            <Mail className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.email}
          </a>
          <span className="flex items-center justify-center gap-2">
            <Contact className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.linkedin}
          </span>
        </div>

        <nav className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4 text-xs font-bold text-white/34 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8">
          {footerLinks.map((link) => (
            <Link
              key={link.key}
              href={localizeHref(link.href, currentLocale)}
              className="transition hover:text-[#f0c86d]"
            >
              {dictionary.footer[link.key]}
            </Link>
          ))}
        </nav>
      </div>

      <p className="mt-9 text-sm font-semibold leading-tight tracking-[0.02em] text-white/22">
        2000 - 2026 PLUTO PRIME.
        <br />
        {dictionary.footer.rights}
      </p>
    </footer>
  );
}
