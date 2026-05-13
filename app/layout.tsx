import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/fonts";
import { ScrollSmoother } from "./components/scroll-smoother";
import { SiteFooter } from "./components/site-footer";
import { SiteNavbar } from "./components/site-navbar";

export const metadata: Metadata = {
  title: "Pluto Prime | Renovations, Cleaning, and Workforce",
  description:
    "Pluto Prime provides renovations, professional cleaning, and qualified personnel in the Netherlands since 2000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
