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

The largest remaining issue is **language and route consistency**. Locale-aware metadata and canonicals have been improved, but the root layout still hardcodes `lang="en"` and unlocalized routes are still generated.

## Highest Priority Issues

### 1. Multilingual SEO Is Partially Fixed

Fixed in the first SEO pass:

- `i18n.ts` now sets `defaultLocale` to `nl`.
- The main pages now use locale-aware `generateMetadata`.
- `/nl/...` pages get Dutch titles, descriptions, canonicals, Open Graph locale, and alternate language links.
- `/en/...` pages get English titles, descriptions, canonicals, Open Graph locale, and alternate language links.
- Unlocalized pages such as `/cleaning` now canonicalize to the Dutch localized version, for example `/nl/cleaning`.
- `x-default` now consistently points to the Dutch localized URL.

Remaining observations:

- `app/layout.tsx` still hardcodes `<html lang="en">` for all pages. This was intentionally left unchanged for now.
- Unlocalized routes such as `/`, `/about`, `/cleaning`, `/renovations`, `/workforce`, `/premium`, and `/contact` are still generated.
- Because unlocalized routes still exist, they should either redirect to `/nl/...` or keep strong canonical signals to `/nl/...`.
- A full layout restructure would be needed to make `<html lang>` truly dynamic per locale.

Why this matters:

Search engines rely on consistent language, canonical, and alternate signals. If the body content, title, description, `html lang`, canonical URL, and `hreflang` alternates disagree, Google may choose the wrong URL, ignore alternates, or rank the wrong language version.

Recommended remaining direction:

- Keep the Dutch-first strategy: `/nl/...` as primary Dutch pages, `/en/...` as English pages, and Dutch as `x-default`.
- Decide whether unlocalized URLs should redirect to `/nl/...`.
- Eventually set `<html lang>` dynamically or restructure layouts so each locale gets the correct language.
- Keep localized pages self-canonical, with matching `hreflang` alternates for `nl`, `en`, and `x-default`.

### 2. Sitemap Exists, But Placement and URL Strategy Need Fixing

A `sitemap.xml` file has been added at the repository root.

Good parts:

- The XML is well-formed.
- It uses the correct sitemap namespace.
- It includes `xhtml:link` alternate entries for `nl`, `en`, and `x-default`.
- It includes the main localized pages for home, about, renovations, cleaning, workforce, premium, and contact.
- The priority structure is reasonable: homepage highest, commercial service pages high, about/premium medium, contact lower.

Issues to fix:

- The file is currently at the project root as `sitemap.xml`. In this Next.js app, that will not normally be served at `https://plutoprime.nl/sitemap.xml`. It should be placed in `public/sitemap.xml`, implemented as `app/sitemap.xml`, or generated as `app/sitemap.ts`.
- There is still no `robots.txt` or `app/robots.ts` pointing crawlers to the sitemap.
- The sitemap lists only `/nl/...` and `/en/...` URLs, but the app also has live unlocalized routes such as `/`, `/about`, `/cleaning`, `/renovations`, `/workforce`, `/premium`, and `/contact`.
- This is only correct if the unlocalized routes are redirected, canonicalized, or intentionally excluded from indexing. Currently the broader codebase still has canonical and locale signals that conflict with that strategy.
- The sitemap sets `x-default` to the Dutch version. That now matches `defaultLocale: "nl"`, but `app/layout.tsx` still hardcodes `<html lang="en">`.

Recommended direction:

- Move or generate the sitemap from a location that is actually deployed at `/sitemap.xml`.
- Add a robots file that allows crawling and points to `https://plutoprime.nl/sitemap.xml`.
- Decide whether unlocalized URLs should exist as indexable pages.
- If the intended SEO strategy is localized-only indexing, redirect or canonicalize unlocalized routes consistently.
- Keep the sitemap aligned with `defaultLocale`, canonical URLs, and page metadata.
- Fix `<html lang>` later when a layout/i18n restructure is approved.

The current sitemap route set is good if the final strategy is localized URLs only:

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

If unlocalized routes remain public and indexable, they also need a clear sitemap/canonical strategy.

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
- A localized sitemap has been drafted with valid XML and alternate language links.
- Most important pages export metadata.
- Pages are static/exportable.
- Main content is present in the HTML structure, not hidden behind API-only rendering.
- Navigation is straightforward.

### Things To Watch

- `keywords` metadata has very limited SEO value today. It is fine to keep, but title, description, content quality, internal linking, structured data, and local trust signals matter much more.
- Some metadata descriptions have typos or language mismatch, for example `schoonmak`.
- Page metadata now matches the localized route language for `/nl/...` and `/en/...`.
- Links inside localized pages should stay localized. Some CTA links currently point to unlocalized paths.
- The sitemap currently lives at the repo root. Move it to `public/sitemap.xml` or implement it via Next's `app/sitemap.ts`/`app/sitemap.xml` convention so it is actually served.
- Remote Unsplash images are acceptable visually, but original project images would likely improve trust and conversion.

## Recommended Priority Order

1. Finish the remaining locale work: redirects for unlocalized routes and dynamic `<html lang>` when layout changes are approved.
2. Move/generate the sitemap correctly and add robots.
3. Fix missing favicon, manifest, and Open Graph assets.
4. Add structured data.
5. Expand service-page content for local intent.
6. Improve page headings and metadata per language.
7. Add stronger trust signals and real project proof.

The first item is the most important. Until language and canonical signals are consistent, smaller SEO tweaks may have limited impact.
