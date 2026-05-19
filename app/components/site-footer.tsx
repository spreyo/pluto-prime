"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
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
            <svg className="h-4 w-4 shrink-0 text-[#c98b13]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path
                                id="SVGRepo_iconCarrier"
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M3.5 12a8.5 8.5 0 1 1 8.5 8.5 8.46 8.46 0 0 1-4.542-1.314 1 1 0 0 0-.821-.113l-2.88.859 1.085-2.537a1 1 0 0 0-.07-.92A8.46 8.46 0 0 1 3.5 12M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 1.838.473 3.568 1.305 5.073L1.08 21.107a1 1 0 0 0 1.206 1.351l4.5-1.342A10.46 10.46 0 0 0 12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5m2.293 12.682-1.315.926A9.3 9.3 0 0 1 11 13.585a10.2 10.2 0 0 1-1.624-2.114l.835-.709a1 1 0 0 0 .236-1.232l-1.064-2a1 1 0 0 0-1.54-.283l-.316.275c-.759.662-1.208 1.75-.836 2.852A12.05 12.05 0 0 0 9.586 15c1.813 1.813 3.655 2.528 4.733 2.805.868.223 1.689-.076 2.268-.548l.591-.482a1 1 0 0 0-.12-1.634l-1.678-1a1 1 0 0 0-1.088.041"
                                clipRule="evenodd"
                              ></path>
                            </svg>
            {dictionary.footer.contactItems.whatsapp}
          </a>
          <a
            href="mailto:info@plutoprime.nl"
            className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]"
          >
            <Mail className="h-4 w-4 text-[#c98b13]" />
            {dictionary.footer.contactItems.email}
          </a>
          <a href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B91WJlo7MT%2FCUuWzYUFKUTw%3D%3D" className="flex items-center justify-center gap-2 transition hover:text-[#f0c86d]">
            <svg className="h-4 w-4 text-[#c98b13]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="0.6"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="currentColor"></path> <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="currentColor"></path> <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="currentColor"></path> </g></svg>
            {dictionary.footer.contactItems.linkedin}
          </a>
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
