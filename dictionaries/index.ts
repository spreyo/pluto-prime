import { defaultLocale, isLocale, type Locale } from "@/i18n";
import { en } from "./en";
import { nl } from "./nl";

export const dictionaries = {
  en,
  nl,
} satisfies Record<Locale, Dictionary>;

type WidenDictionary<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenDictionary<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenDictionary<T[Key]> }
      : T;

export type Dictionary = WidenDictionary<typeof en>;

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
