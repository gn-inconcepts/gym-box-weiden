import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GYM & BOX — Athlet des Lebens | Weiden am See",
  description: "GYM & BOX – Dein Gym und CrossFit Box in Weiden am See. Über 1.000m² für Training, Ernährung, Regeneration und Reflexion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${bebas.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-brand-black text-brand-white selection:bg-brand-green selection:text-brand-black">
        <SmoothScroll>
          {children}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
