# SEO Audit Notes

## Overall Assessment

The site has a decent SEO foundation, but it is not fully optimized yet. Current estimate: **5.5/10** for competitive local search.

Strengths:

- Static Next.js pages with crawlable content.
- Dedicated service pages for renovations, cleaning, workforce, premium, about, and contact.
- Page-level metadata exists on most important routes.
- Visible `h1` headings are rendered through `MotionHeroTitle`.
- Internal navigation and footer links connect the main pages.
- Images generally include descriptive `alt` text.
- Content already targets relevant service areas such as Amsterdam, Alkmaar, and Groningen.

The largest issue is **language and canonical consistency**. The site has localized routes, but the default locale, metadata, `lang` attribute, canonical URLs, and actual rendered page language do not always line up.

## Highest Priority Issues

### 1. Multilingual SEO Is Inconsistent

Current observations:

- `i18n.ts` sets `defaultLocale` to `en`.
- `app/layout.tsx` hardcodes `<html lang="en">` for all pages.
- The home page metadata is Dutch and declares `/` as `nl`, `/en/` as English, and `/` as `x-default`.
- Localized pages such as `/en/cleaning` and `/nl/cleaning` reuse metadata from the unlocalized page files.
- Several service pages canonicalize to unlocalized URLs such as `/cleaning` or `/workforce`, even when rendered under a locale route.

Why this matters:

Search engines rely on consistent language, canonical, and alternate signals. If the body content, title, description, `html lang`, canonical URL, and `hreflang` alternates disagree, Google may choose the wrong URL, ignore alternates, or rank the wrong language version.

Recommended direction:

- Decide whether `/` should be Dutch or English.
- For a `.nl` business targeting Dutch customers, make `/` Dutch and `/en` English.
- Set the default locale accordingly.
- Generate locale-specific metadata for every page.
- Set `<html lang>` dynamically or restructure layouts so each locale gets the correct language.
- Give every localized route a self-referencing canonical URL.
- Add correct `hreflang` alternates for `nl`, `en`, and `x-default`.

### 2. Sitemap and Robots Are Missing

No `app/sitemap.ts`, `app/sitemap.xml`, `app/robots.ts`, or `app/robots.txt` was found.

Recommended direction:

- Add a sitemap containing every indexable page.
- Include localized URLs.
- Include useful `lastModified`, `changeFrequency`, and `priority` values.
- Add a robots file that allows crawling and points to the sitemap.

Example routes to include:

- `/`
- `/nl`
- `/nl/about`
- `/nl/renovations`
- `/nl/cleaning`
- `/nl/workforce`
- `/nl/premium`
- `/nl/contact`
- `/en`
- `/en/about`
- `/en/renovations`
- `/en/cleaning`
- `/en/workforce`
- `/en/premium`
- `/en/contact`

The exact list depends on the final locale strategy.

### 3. Metadata References Missing Assets

Current metadata references files that do not appear to exist:

- `/site.webmanifest`
- `/favicon-32x32.png`
- `/favicon-16x16.png`
- `/apple-touch-icon.png`
- `/images/og-home.jpg`

Recommended direction:

- Add the referenced files, or update metadata to point to files that actually exist.
- Add route-level Open Graph images where useful.
- Ensure shared previews look correct for WhatsApp, LinkedIn, Facebook, and search snippets.

### 4. Structured Data Is Missing

No obvious JSON-LD structured data was found.

Recommended direction:

- Add `Organization` structured data.
- Add `LocalBusiness` or a more specific subtype if appropriate.
- Add service-specific structured data for renovations, cleaning, and workforce.
- Include business name, URL, logo, email, phone, service areas, social profiles, and company identifiers if available.
- Add FAQ structured data only if real visible FAQ content is added to the page.

## Content Improvements

### 1. Service Pages Are Useful But Thin

The service pages explain the offer, but they could be stronger for competitive local search.

Recommended additions:

- Service areas section.
- Process section.
- Common project types.
- Before/after examples or case studies.
- FAQs.
- Reviews or proof points.
- More concrete Dutch search language where natural.

Examples:

- `Badkamer renovatie Amsterdam`
- `Badkamer verbouwen Alkmaar`
- `Schoonmaakbedrijf Amsterdam`
- `Kantoorschoonmaak Groningen`
- `Personeel bouw inhuren Nederland`

Avoid keyword stuffing. The wording should stay natural and useful.

### 2. H1 Headings Are Too Generic

Current service headings are broad, for example:

- `Renovations`
- `Cleaning`
- `Workforce`

Recommended direction:

- Make page headings more specific to the service and location.

Possible Dutch examples:

- `Badkamer renovatie en verbouwing in Amsterdam, Alkmaar en Groningen`
- `Schoonmaakbedrijf voor woningen, kantoren en hotels`
- `Gekwalificeerd personeel voor bouw en techniek`

### 3. Trust Signals Could Be Stronger

The site targets the Netherlands, but contact details include Germany and Slovakia phone numbers. That may be operationally correct, but it can weaken local trust if not explained.

Recommended direction:

- Clarify Dutch service coverage.
- Add company registration details if available.
- Add a real public LinkedIn/company profile URL.
- Add testimonials, project examples, or client references.
- Add clear business identity details in the footer/contact page.

## Technical SEO Notes

### Good Current Signals

- Next.js metadata API is already being used.
- Most important pages export metadata.
- Pages are static/exportable.
- Main content is present in the HTML structure, not hidden behind API-only rendering.
- Navigation is straightforward.

### Things To Watch

- `keywords` metadata has very limited SEO value today. It is fine to keep, but title, description, content quality, internal linking, structured data, and local trust signals matter much more.
- Some metadata descriptions have typos or language mismatch, for example `schoonmak`.
- Page metadata should match the rendered page language.
- Links inside localized pages should stay localized. Some CTA links currently point to unlocalized paths.
- Remote Unsplash images are acceptable visually, but original project images would likely improve trust and conversion.

## Recommended Priority Order

1. Fix locale strategy, canonical URLs, `hreflang`, and `<html lang>`.
2. Add sitemap and robots.
3. Fix missing favicon, manifest, and Open Graph assets.
4. Add structured data.
5. Expand service-page content for local intent.
6. Improve page headings and metadata per language.
7. Add stronger trust signals and real project proof.

The first item is the most important. Until language and canonical signals are consistent, smaller SEO tweaks may have limited impact.
