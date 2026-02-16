import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { LocalBusinessSchema, OrganizationSchema } from "@/components/seo/structured-data";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

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

const siteUrl = 'https://gymandbox.at';
const fallbackOgImage = '/og-image.jpg';

export async function generateMetadata(): Promise<Metadata> {
  let ogImageUrl = `${siteUrl}${fallbackOgImage}`;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const settings: SiteSettings | null = await client.fetch(siteSettingsQuery);
      if (settings?.ogImage?.asset?.url) {
        ogImageUrl = settings.ogImage.asset.url;
      }
    }
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity:", error);
  }

  return {
    metadataBase: new URL(siteUrl),
    title: "GYM & BOX — Die Gesundheit ist unser wertvollstes Gut | Weiden am See",
    description: "GYM & BOX – Dein Gym und CrossFit Box in Weiden am See. Über 500 m² für Training, Ernährung, Regeneration und Reflexion.",
    keywords: ['Gym Weiden am See', 'CrossFit Box Burgenland', 'Personal Training', 'Ernährungscoaching', 'Fitness Neusiedlersee', 'Krafttraining', 'Gesundheit'],
    authors: [{ name: 'GYM & BOX' }],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'de_AT',
      url: siteUrl,
      siteName: 'GYM & BOX',
      title: 'GYM & BOX — Die Gesundheit ist unser wertvollstes Gut',
      description: 'Dein Gym und CrossFit Box in Weiden am See. Über 500 m² für Training, Ernährung, Regeneration und Reflexion.',
      images: [
        {
          url: ogImageUrl,
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
      images: [ogImageUrl],
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
}

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
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
