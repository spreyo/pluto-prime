import { defaultLocale, isLocale, type Locale } from "@/i18n";
import { en } from "./en";
import { nl } from "./nl";

export const dictionaries = {
  en,
  nl,
} as const;

export type Dictionary = typeof en;

export function getDictionary(locale: string | undefined): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export async function getDictionaryFromParams(
  params?: Promise<{ locale?: string }>,
) {
  const resolvedParams = params ? await params : undefined;

  return getDictionary(resolvedParams?.locale);
}

export function getClientDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
