export const locales = ["en", "nl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];

  return isLocale(segment) ? segment : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/");
  const locale = segments[1];

  if (!isLocale(locale)) {
    return pathname || "/";
  }

  const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

  return pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, "");
}

export function localizePathname(pathname: string, locale: Locale) {
  const pathWithoutLocale = stripLocaleFromPathname(pathname);

  return pathWithoutLocale === "/"
    ? `/${locale}`
    : `/${locale}${pathWithoutLocale}`;
}

export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const pathname = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const localizedPathname = localizePathname(pathname || "/", locale);

  return `${localizedPathname}${hash}`;
}
