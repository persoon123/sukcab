import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight, Star, Shield, Clock, MapPin, Car, Users, Route } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center px-3 py-2 sm:px-4 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary font-medium text-xs sm:text-sm">
                🚗 Professional Cab Service
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-primary-foreground to-secondary bg-clip-text text-transparent">
                  S.U.K Perfect
                </span>
                <br />
                <span className="text-secondary drop-shadow-lg">Cab Service</span>
              </h1>
              
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 font-medium px-4 sm:px-0">
                🌍 Premium All India Rides • Safe • Reliable • 24/7 Available
              </h2>
            </div>
            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <div className="group flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-secondary mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">100% Safe</span>
              </div>
              <div className="group flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-secondary mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">5★ Rated</span>
              </div>
              <div className="group flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-secondary mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">24/7 Service</span>
              </div>
              <div className="group flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-secondary mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">All India</span>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-0">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-7 shadow-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold w-full"
                onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Book on WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-7 border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary shadow-2xl hover:shadow-xl transition-all duration-500 backdrop-blur-sm font-semibold w-full"
                onClick={() => window.location.href = 'tel:+919974076482'}
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Call Now: 99740 76482</span>
                <span className="sm:hidden">Call Now</span>
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mx-4 sm:mx-0">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  <span className="font-semibold text-sm sm:text-base">+91 99740 76482</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                <div className="text-secondary font-medium text-sm sm:text-base">Available 24/7</div>
              </div>
            </div>
          </div>
          {/* Visual Section */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Hero Icon */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl sm:rounded-3xl w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center shadow-2xl">
                    <Car className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Ready to Travel?</h3>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4 sm:mb-8 leading-relaxed px-2">
                  Professional drivers, clean vehicles, and transparent pricing across India. 
                  Your comfort and safety is our priority.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                    <div className="font-semibold text-secondary text-xs sm:text-sm">Starting Rate</div>
                    <div className="text-lg sm:text-2xl font-bold text-primary-foreground">₹11<span className="text-xs sm:text-sm">/km</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                    <div className="font-semibold text-secondary text-xs sm:text-sm">Experience</div>
                    <div className="text-lg sm:text-2xl font-bold text-primary-foreground">10+ <span className="text-xs sm:text-sm">Years</span></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                    <div className="font-semibold text-secondary text-xs sm:text-sm">Happy Customers</div>
                    <div className="text-lg sm:text-2xl font-bold text-primary-foreground">5000+</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20">
                    <div className="font-semibold text-secondary text-xs sm:text-sm">Cities Covered</div>
                    <div className="text-lg sm:text-2xl font-bold text-primary-foreground">500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;