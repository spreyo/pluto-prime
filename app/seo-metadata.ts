import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/i18n";

type SeoPage =
  | "home"
  | "about"
  | "renovations"
  | "cleaning"
  | "workforce"
  | "premium"
  | "contact";

type PageSeo = {
  path: string;
  ogImage?: string;
  content: Record<
    Locale,
    {
      title: string;
      description: string;
      keywords?: string[];
      openGraphTitle?: string;
      openGraphDescription?: string;
    }
  >;
};

type MetadataParams = {
  params?: Promise<{ locale?: string }>;
};

const pageSeo: Record<SeoPage, PageSeo> = {
  home: {
    path: "",
    ogImage: "/img/bannerbg.jpg",
    content: {
      nl: {
        title: "Pluto Prime - Renovaties, schoonmaak en personeel sinds 2000",
        description:
          "Vakkundige badkamerrenovaties, complete verbouwingen, professionele schoonmaak en gekwalificeerd personeel in Amsterdam, Alkmaar en Groningen.",
        keywords: [
          "renovatie Amsterdam",
          "badkamer renoveren",
          "verbouwing",
          "schoonmaakbedrijf",
          "aannemer",
          "Pluto Prime",
        ],
      },
      en: {
        title: "Pluto Prime - Renovations, Cleaning, and Workforce",
        description:
          "Pluto Prime provides renovations, professional cleaning, and qualified personnel in Amsterdam, Alkmaar, Groningen, and across the Netherlands.",
        keywords: [
          "renovations Netherlands",
          "bathroom renovation Amsterdam",
          "cleaning company Amsterdam",
          "qualified workforce Netherlands",
          "Pluto Prime",
        ],
      },
    },
  },
  about: {
    path: "/about",
    ogImage: "/img/bannerbg.jpg",
    content: {
      nl: {
        title: "Over Pluto Prime - Ervaring sinds 2000 in 5 Europese landen",
        description:
          "Sinds 2000 realiseren wij renovaties en verbouwingen in Nederland, Belgie, Frankrijk, Duitsland en Slowakije.",
      },
      en: {
        title: "About Pluto Prime - Renovation Experience Since 2000",
        description:
          "Learn about Pluto Prime, our renovation experience since 2000, and our work across the Netherlands, Belgium, France, Germany, and Slovakia.",
      },
    },
  },
  renovations: {
    path: "/renovations",
    ogImage: "/img/renovations.jpg",
    content: {
      nl: {
        title: "Renovaties en badkamerrenovatie | Pluto Prime",
        description:
          "Complete renovaties van appartementen, woningen en badkamers in Amsterdam, Alkmaar, Groningen en omgeving.",
        keywords: [
          "badkamer renovatie Amsterdam",
          "renovatie Alkmaar",
          "verbouwing Groningen",
          "huis renoveren Nederland",
        ],
      },
      en: {
        title: "Renovations and Bathroom Remodeling | Pluto Prime",
        description:
          "Complete apartment, home, and bathroom renovations in Amsterdam, Alkmaar, Groningen, and surrounding areas.",
        keywords: [
          "bathroom renovation Amsterdam",
          "home renovation Netherlands",
          "apartment renovation Groningen",
          "remodeling Alkmaar",
        ],
      },
    },
  },
  cleaning: {
    path: "/cleaning",
    ogImage: "/img/cleaning.jpg",
    content: {
      nl: {
        title: "Schoonmaakbedrijf Amsterdam, Alkmaar & Groningen | Pluto Prime",
        description:
          "Professionele schoonmaak voor woningen, kantoren, hotels en industriele ruimtes. Vaste schoonmakers, flexibele planning en betrouwbare service.",
        keywords: [
          "schoonmaakbedrijf Amsterdam",
          "schoonmaak Alkmaar",
          "hotelreiniging",
          "kantoorschoonmaak",
          "industriele schoonmaak",
        ],
      },
      en: {
        title: "Cleaning Company in Amsterdam, Alkmaar & Groningen | Pluto Prime",
        description:
          "Professional cleaning for homes, offices, hotels, and industrial spaces with reliable teams and flexible planning.",
        keywords: [
          "cleaning company Amsterdam",
          "office cleaning Groningen",
          "hotel cleaning Netherlands",
          "industrial cleaning Alkmaar",
        ],
      },
    },
  },
  workforce: {
    path: "/workforce",
    ogImage: "/img/workforce.jpg",
    content: {
      nl: {
        title: "Gekwalificeerd personeel inhuren - Bouw & techniek | Pluto Prime",
        description:
          "Tijdelijk of langdurig personeel voor bouw, techniek en algemene werkzaamheden in Amsterdam, Alkmaar, Groningen en heel Nederland.",
        keywords: [
          "personeel bouw",
          "uitzendbureau bouw",
          "tijdelijk personeel",
          "gekwalificeerd personeel",
          "bouwvakkers inhuren",
        ],
      },
      en: {
        title: "Qualified Workforce for Construction and Technical Projects | Pluto Prime",
        description:
          "Temporary and long-term personnel for construction, technical work, and general projects in Amsterdam, Alkmaar, Groningen, and across the Netherlands.",
        keywords: [
          "construction workforce Netherlands",
          "temporary construction staff",
          "qualified personnel Amsterdam",
          "technical workers Netherlands",
        ],
      },
    },
  },
  premium: {
    path: "/premium",
    ogImage: "/img/villa.jpg",
    content: {
      nl: {
        title: "Premium internationale renovaties - Nederlandse kwaliteit wereldwijd",
        description:
          "Uw Nederlandse standaard, waar ook ter wereld. Premium renovaties voor villas, appartementen en internationale projecten.",
        keywords: [
          "internationale renovaties",
          "luxe villa renovatie",
          "Nederlandse aannemer buitenland",
          "premium renovatie Europa",
        ],
      },
      en: {
        title: "Premium International Renovations - Dutch Quality Abroad",
        description:
          "Your Dutch standard, anywhere in the world. Premium renovation services for luxury villas, apartments, and international projects.",
        keywords: [
          "international renovations",
          "luxury villa renovation",
          "Dutch contractor abroad",
          "premium renovation Europe",
        ],
      },
    },
  },
  contact: {
    path: "/contact",
    ogImage: "/img/bannerbg.jpg",
    content: {
      nl: {
        title: "Contact & offerte aanvragen | Pluto Prime",
        description:
          "Vraag een vrijblijvende offerte aan voor uw renovatie, schoonmaak of personeelsbehoefte. Neem contact op met Pluto Prime.",
      },
      en: {
        title: "Contact and Request a Quote | Pluto Prime",
        description:
          "Request a quote for renovation, cleaning, or workforce services. Contact Pluto Prime for your project in the Netherlands.",
      },
    },
  },
};

function localizedPath(path: string, locale: Locale) {
  return path ? `/${locale}${path}` : `/${locale}`;
}

async function resolveLocale(params?: MetadataParams["params"]) {
  const resolvedParams = params ? await params : undefined;

  return isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
}

export async function generateLocalizedMetadata(
  page: SeoPage,
  params?: MetadataParams["params"],
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = pageSeo[page];
  const content = seo.content[locale];
  const canonical = localizedPath(seo.path, locale);
  const languages = {
    nl: localizedPath(seo.path, "nl"),
    en: localizedPath(seo.path, "en"),
    "x-default": localizedPath(seo.path, "nl"),
  };

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      url: canonical,
      title: content.openGraphTitle ?? content.title,
      description: content.openGraphDescription ?? content.description,
      siteName: "Pluto Prime",
      images: [
        {
          url: `https://plutoprime.nl${seo.ogImage ?? "/img/bannerbg.jpg"}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [`https://plutoprime.nl${seo.ogImage ?? "/img/bannerbg.jpg"}`],
    },
  };
}
