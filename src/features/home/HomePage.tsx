import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WorkspaceShowcase from './components/WorkspaceShowcase';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WorkspaceShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}