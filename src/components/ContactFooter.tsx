import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

const ContactFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">S.U.K Perfect Cab Service</h3>
            <p className="text-sm sm:text-base text-primary-foreground/80 mb-4 sm:mb-6 leading-relaxed">
              Your trusted partner for safe, reliable, and affordable travel across India. 
              Professional drivers, clean vehicles, and transparent pricing. Available 24/7 for all your transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 shadow-md text-sm sm:text-base w-full sm:w-auto"
                onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                WhatsApp Booking
              </Button>
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 shadow-md text-sm sm:text-base w-full sm:w-auto"
                onClick={() => window.location.href = 'tel:+919974076482'}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Information</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <a 
                  href="tel:+919974076482" 
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +91 99740 76482
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <a 
                  href="https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  WhatsApp Booking
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <span className="text-sm sm:text-base text-primary-foreground/80">All India Service</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-primary-foreground/80">
              <li>• Airport Transfers</li>
              <li>• City Tours</li>
              <li>• Outstation Trips</li>
              <li>• Wedding Transportation</li>
              <li>• Corporate Travel</li>
              <li>• Emergency Rides</li>
              <li>• Pilgrimage Tours</li>
              <li>• Group Travel</li>
            </ul>
          </div>
        </div>

        {/* Famous Routes & Destinations */}
        <div className="border-t border-primary-foreground/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-secondary">Popular Routes</h4>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary-foreground/80">
                <span>Mumbai • Surat</span>
                <span>Ahmedabad • Rajkot</span>
                <span>Vadodara • Palanpur</span>
                <span>Navsari • Daman</span>
                <span>Jamnagar • Bhavnagar</span>
                <span>Somnath • Junagadh</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-primary-foreground">Tourist Destinations</h4>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary-foreground/80">
                <span>Kashmir • Shimla</span>
                <span>Goa • Manali</span>
                <span>Ooty • Mumbai</span>
                <span>Himachal Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-primary-foreground/60 px-4">
            © 2025 S.U.K Perfect Cab Service. All rights reserved. | Safe • Reliable • Professional • Available 24/7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;