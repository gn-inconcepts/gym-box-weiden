import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { BrandCards } from "@/components/home/brand-cards";
import { Philosophy } from "@/components/home/philosophy";
import { PhilosophyDetail } from "@/components/home/philosophy-detail";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { StatsBar } from "@/components/home/stats-bar";
import { Reviews } from "@/components/home/reviews";
import { SocialWall } from "@/components/home/social-wall";
import { VideoWalkthrough } from "@/components/home/video-walkthrough";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        <Hero />
        <VideoWalkthrough />
        <StatsBar />
        <BrandCards />
        <Philosophy />
        <PhilosophyDetail />
        <ServicesShowcase />
        <Reviews />
        <SocialWall />

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-brand-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center bg-brand-dark p-12 md:p-20 rounded-3xl border border-brand-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-green/5 group-hover:bg-brand-green/10 transition-colors duration-500" />

              <h2 className="font-display text-4xl md:text-6xl mb-6 relative z-10">BEREIT FÜR DEINEN <span className="text-brand-green">ERFOLG?</span></h2>
              <p className="text-xl text-brand-gray-light font-light mb-10 max-w-2xl mx-auto relative z-10">
                Starte jetzt deine Reise zum Athleten des Lebens. Vereinbare ein kostenloses Erstgespräch.
              </p>
              <a
                href="/kontakt"
                className="relative z-10 inline-block px-10 py-4 bg-brand-green text-brand-black font-bold text-lg rounded-lg hover:bg-brand-green/90 transition-transform hover:scale-105"
              >
                KOSTENLOSE ERSTBERATUNG
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
