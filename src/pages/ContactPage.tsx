import Navigation from "@/components/Navigation";
import ContactFooter from "@/components/ContactFooter";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 px-4 leading-relaxed">
            Get in touch for bookings, inquiries, or any assistance. We're here to serve you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            
            {/* Quick Contact */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center lg:text-left">Quick Contact</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 pb-3 sm:pb-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-lg mr-0 sm:mr-4 mb-2 sm:mb-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="text-center sm:text-left">
                      <CardTitle className="text-base sm:text-lg">Call Us Now</CardTitle>
                      <p className="text-sm sm:text-base text-muted-foreground">Available 24/7 for immediate assistance</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full text-sm sm:text-base"
                      onClick={() => window.location.href = 'tel:+919974076482'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +91 99740 76482
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 pb-3 sm:pb-4">
                    <div className="bg-green-100 p-2 sm:p-3 rounded-lg mr-0 sm:mr-4 mb-2 sm:mb-0">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="text-center sm:text-left">
                      <CardTitle className="text-base sm:text-lg">WhatsApp Booking</CardTitle>
                      <p className="text-sm sm:text-base text-muted-foreground">Quick booking via WhatsApp</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant="secondary"
                      className="w-full text-sm sm:text-base"
                      onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Service Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Service Information</h2>
              
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Service Area</h3>
                      <p className="text-muted-foreground">All India Coverage</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    We provide cab services across all major cities and towns in India. 
                    From metropolitan areas to remote destinations, we've got you covered.
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Operating Hours</h3>
                      <p className="text-muted-foreground">24/7 Service Available</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Our service is available round the clock, 365 days a year. 
                    Whether it's an early morning flight or late-night emergency, we're here to help.
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Popular Routes</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span>• Mumbai ↔ Surat</span>
                    <span>• Ahmedabad ↔ Rajkot</span>
                    <span>• Vadodara ↔ Palanpur</span>
                    <span>• Navsari ↔ Daman</span>
                    <span>• Jamnagar ↔ Bhavnagar</span>
                    <span>• Somnath ↔ Junagadh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Book?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us now for instant booking and get the best rates for your travel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = 'tel:+919974076482'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
};

export default ContactPage;