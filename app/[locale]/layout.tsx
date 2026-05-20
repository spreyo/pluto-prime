import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n";

function buildSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://plutoprime.nl/#business",
    name: "Pluto Prime",
    url: "https://plutoprime.nl",
    logo: "https://plutoprime.nl/logo.svg",
    image: "https://plutoprime.nl/img/bannerbg.jpg",
    description:
      locale === "nl"
        ? "Vakkundige renovaties, professionele schoonmaak en gekwalificeerd personeel in Amsterdam, Alkmaar en Groningen."
        : "Expert renovations, professional cleaning, and qualified workforce in Amsterdam, Alkmaar, and Groningen.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressRegion: "NH",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.370216,
      longitude: 4.895168,
    },
    telephone: "+491745803567",
    email: "info@plutoprime.nl",
    areaServed: ["Amsterdam", "Alkmaar", "Groningen"],
    foundingDate: "2000",
    priceRange: "€€",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(locale)) }}
      />
      {children}
    </>
  );
}
