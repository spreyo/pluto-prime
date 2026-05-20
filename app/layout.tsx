import type { Metadata, Viewport } from "next";
import "./globals.css";
import { manrope } from "@/fonts";
import { ScrollSmoother } from "./components/scroll-smoother";
import { SiteFooter } from "./components/site-footer";
import { SiteNavbar } from "./components/site-navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://plutoprime.nl"),
  title: "Pluto Prime | Renovations, Cleaning, and Workforce",
  description:
    "Pluto Prime provides renovations, professional cleaning, and qualified personnel in the Netherlands since 2000.",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  authors: [{ name: "Pluto Prime" }],
  publisher: "Pluto Prime",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Pluto Prime",
    images: [{ url: "/img/bannerbg.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/img/bannerbg.jpg"],
  },
  other: {
    "geo.region": "NL-NH",
    "geo.placename": "Amsterdam",
    "geo.position": "52.370216;4.895168",
    ICBM: "52.370216, 4.895168",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C9A961",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className="h-full antialiased"
    >
      <body className={`min-h-full ${manrope.className} flex flex-col`}>
        <ScrollSmoother />
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
