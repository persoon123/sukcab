import { Car, Users, MapPin, Clock, Shield, Star } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Car,
      title: "Airport Transfers",
      description: "Reliable pickups and drops for all major airports across India",
      features: ["On-time service", "Flight tracking", "Meet & greet"]
    },
    {
      icon: MapPin,
      title: "Outstation Trips", 
      description: "Comfortable long-distance travel to any destination in India",
      features: ["Multiple day trips", "Tourist packages", "Flexible itinerary"]
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Perfect vehicles for family trips and corporate events",
      features: ["7-seater options", "Luggage space", "Group discounts"]
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service for emergency and urgent travels",
      features: ["Emergency rides", "Night travel", "Quick response"]
    }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "All drivers are verified and vehicles are regularly maintained for your safety"
    },
    {
      icon: Star,
      title: "Professional Service", 
      description: "Experienced chauffeurs with excellent customer service and local knowledge"
    },
    {
      icon: MapPin,
      title: "All India Coverage",
      description: "From metro cities to remote locations, we cover every corner of India"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        
        {/* What Sets Us Apart */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            What Sets S.U.K Apart?
          </h2>
          <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                  <Car className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Clean & Hygienic Cars</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">Sanitized vehicles with regular maintenance</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Transparent Billing</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">No hidden charges, upfront pricing</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Expert Chauffeurs</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">Professional, experienced drivers</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">2000+ Cities</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">Pan-India coverage and service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-3 sm:mb-4 px-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-center text-muted-foreground mb-8 sm:mb-12 px-4">
            Comprehensive transportation solutions for every need
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-elegant transition-smooth group"
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-primary rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <highlight.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4 px-4">
                {highlight.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;