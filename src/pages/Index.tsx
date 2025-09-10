import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CarShowcase from "@/components/CarShowcase";
import BookingForm from "@/components/BookingForm";
import AboutSection from "@/components/AboutSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CarShowcase />
      <BookingForm />
      <AboutSection />
      <ContactFooter />
    </main>
  );
};

export default Index;