import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PainPoints } from "@/components/home/PainPoints";
import { ValueProposition } from "@/components/home/ValueProposition";
import { AboutExcerpt } from "@/components/home/AboutExcerpt";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { MarketingServices } from "@/components/home/MarketingServices";
import { Partners } from "@/components/home/Partners";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <PainPoints />
      <ValueProposition />
      <CTA />
      <Footer />
    </main>
  );
}
