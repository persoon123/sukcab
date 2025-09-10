import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cars, famousRoutes, picnicPoints } from "@/data/cars";
import { Car, BookIcon, ArrowRight, Eye } from "lucide-react";

const CarShowcase = () => {
  // Show only first 6 cars on homepage
  const featuredCars = cars.slice(0, 6);
  
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Choose Your Perfect Ride
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
            Professional vehicles with transparent pricing for every journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-card rounded-xl sm:rounded-2xl shadow-card hover:shadow-elegant transition-smooth overflow-hidden group"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary text-primary-foreground px-2 py-1 sm:px-4 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
                  ₹{car.pricePerKm}/km
                </div>
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-secondary text-secondary-foreground px-2 py-1 sm:px-3 rounded-full text-xs font-medium">
                  {car.wheelType}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Car className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg font-bold text-foreground leading-tight">{car.name}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {car.description}
                </p>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium text-primary">Capacity:</span> 
                  <span className="text-xs sm:text-sm text-muted-foreground">{car.capacity}</span>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs leading-tight"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Link to={`/car/${car.id}`}>
                  <Button variant="default" className="w-full group text-sm sm:text-base">
                    <BookIcon className="h-4 w-4 mr-2" />
                    Book This Car
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Cars Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.location.href = '/cars'}
          >
            <Eye className="w-5 h-5 mr-2" />
            View All Cars
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        
        {/* Popular Routes & Destinations - Modern Design */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Routes & Destinations
            </h3>
            <p className="text-lg text-muted-foreground">
              Discover the most traveled routes and beautiful destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Famous Routes */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-primary">Famous Routes</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {famousRoutes.map((route, index) => (
                  <div 
                    key={index}
                    className="bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group border border-primary/10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse"></div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {route}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tourist Destinations */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl p-8 border border-secondary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary/10 p-3 rounded-xl">
                  <svg className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-foreground">Tourist Destinations</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {picnicPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group border border-secondary/10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full group-hover:animate-pulse"></div>
                      <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                        {point}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h4 className="text-2xl font-bold text-foreground mb-4">
                Ready for Your Journey?
              </h4>
              <p className="text-muted-foreground mb-6">
                Book any of these popular routes or choose your custom destination
              </p>
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Your Ride Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;