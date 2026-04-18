import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuoteWidget from '@/components/QuoteWidget';
import Fleet from '@/components/Fleet';
import Routes from '@/components/Routes';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <QuoteWidget />
        <Fleet />
        <Routes />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
