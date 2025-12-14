import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import { CustomNavbar } from '@/components/landing/custom-navbar';
import { HeroSectionB2C } from '@/components/landing/hero-section-b2c';
import { CredibilityBar } from '@/components/landing/credibility-bar';
import { ValuePropositionB2C } from '@/components/landing/value-proposition-b2c';
import { FeaturesSectionB2C } from '@/components/landing/features-section-b2c';
import { TestimonialsB2C } from '@/components/landing/testimonials-b2c';
import { PricingB2C } from '@/components/landing/pricing-b2c';
import { SecurityTrust } from '@/components/landing/security-trust';
import { FAQB2C } from '@/components/landing/faq-b2c';
import { Footer } from '@/components/landing/footer';

export default async function Home() {
  const session = await auth0.getSession();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-gradient-to-br from-background via-background to-violet-950/10">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-violet-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-violet-400/5 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      <CustomNavbar />
      <main className="flex-1 relative z-10">
        <HeroSectionB2C />
        <CredibilityBar />
        <ValuePropositionB2C />
        <FeaturesSectionB2C />
        <TestimonialsB2C />
        <PricingB2C />
        <SecurityTrust />
        <FAQB2C />
      </main>
      <Footer />
    </div>
  );
}
