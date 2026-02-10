import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { LocalBusinessSchema, OrganizationSchema } from "@/components/seo/structured-data";

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
  metadataBase: new URL('https://gymandbox.at'),
  title: "GYM & BOX — Die Gesundheit ist unser wertvollstes Gut | Weiden am See",
  description: "GYM & BOX – Dein Gym und CrossFit Box in Weiden am See. Über 500 m² für Training, Ernährung, Regeneration und Reflexion.",
  keywords: ['Gym Weiden am See', 'CrossFit Box Burgenland', 'Personal Training', 'Ernährungscoaching', 'Fitness Neusiedlersee', 'Krafttraining', 'Gesundheit'],
  authors: [{ name: 'GYM & BOX' }],
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://gymandbox.at',
    siteName: 'GYM & BOX',
    title: 'GYM & BOX — Die Gesundheit ist unser wertvollstes Gut',
    description: 'Dein Gym und CrossFit Box in Weiden am See. Über 500 m² für Training, Ernährung, Regeneration und Reflexion.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GYM & BOX Weiden am See',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GYM & BOX — Die Gesundheit ist unser wertvollstes Gut',
    description: 'Dein Gym und CrossFit Box in Weiden am See',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${bebas.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
        <OrganizationSchema />
      </head>
      <body className="antialiased bg-brand-black text-brand-white selection:bg-brand-green selection:text-brand-black">
        <SkipToContent />
        <SmoothScroll>
          {children}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
