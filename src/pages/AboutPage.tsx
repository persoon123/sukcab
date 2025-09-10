import Navigation from "@/components/Navigation";
import ContactFooter from "@/components/ContactFooter";
import { Shield, Users, MapPin, Clock, Star, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            About S.U.K Perfect Cab Service
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 px-4 leading-relaxed">
            Your trusted partner for safe, reliable, and comfortable travel across India since 2015.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Our Story</h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                Founded in 2015, S.U.K Perfect Cab Service has been serving customers across India with dedication, 
                professionalism, and a commitment to excellence. What started as a small local service has grown into 
                a trusted nationwide transportation provider.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                We understand that travel is not just about reaching your destination, but about the journey itself. 
                Our mission is to make every ride comfortable, safe, and memorable for our valued customers.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-card">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Why Choose Us?</h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">100% Safe & Secure Travel</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">24/7 Service Available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">Professional Drivers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">All India Coverage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Safe Travel</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                All our vehicles are regularly maintained and drivers are thoroughly verified for your safety.
              </p>
            </div>

            <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Trusted Drivers</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our experienced and courteous drivers ensure a comfortable and pleasant journey.
              </p>
            </div>

            <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Quality Service</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We are committed to providing the highest quality service with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
};

export default AboutPage;