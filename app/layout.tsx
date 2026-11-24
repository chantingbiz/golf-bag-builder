import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { images } from "@/lib/builds";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Golf Bag Builder",
  description:
    "Upload a screenshot of your Amazon cart or paste product links. See your golf setup before you buy.",
  icons: { icon: images.logo },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
