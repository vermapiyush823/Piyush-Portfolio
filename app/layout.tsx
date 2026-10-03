import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${profile.name} — ${profile.role} at ${profile.company}`,
  description: profile.intro,
  keywords: ["Piyush Verma", "ServiceNow", "Software Engineer", "AI Agents", "LangGraph", "Next.js", "TypeScript"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description: profile.tagline,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.tagline },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable}`}>
      <body className="grain bg-ink text-paper">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
