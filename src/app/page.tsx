import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { CitiesSection } from '@/components/landing/cities-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { Footer } from '@/components/landing/footer';
import { Navigation } from '@/components/landing/navigation';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CitiesSection />
      </main>
      <Footer />
    </div>
  );
}