import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cars } from "@/data/cars";
import { Car, BookIcon, ArrowRight, ArrowLeft, Star, Shield, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import ContactFooter from "@/components/ContactFooter";

const CarsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Enhanced Header Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 px-4 bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground overflow-hidden">
        {/* Background Pattern */}
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
        
        <div className="relative max-w-6xl mx-auto text-center">
          <Button 
            variant="outline" 
            size="sm"
            className="mb-6 sm:mb-8 border-secondary text-secondary hover:bg-secondary hover:text-primary text-sm backdrop-blur-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary font-medium text-sm">
              🚗 Premium Fleet Collection
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary-foreground to-secondary bg-clip-text text-transparent">
                Our Complete
              </span>
              <br />
              <span className="text-secondary drop-shadow-lg">Fleet</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 font-medium max-w-3xl mx-auto px-4">
              Choose from {cars.length} professional vehicles for your perfect journey
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="group flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">100% Safe</span>
              </div>
              <div className="group flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">5★ Rated</span>
              </div>
              <div className="group flex flex-col items-center p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-center">24/7 Service</span>
              </div>
            </div>
            
            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">{cars.length}</div>
                  <div className="text-sm sm:text-base text-primary-foreground/80">Premium Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">₹11+</div>
                  <div className="text-sm sm:text-base text-primary-foreground/80">Starting Rate/km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore Our Premium Fleet
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              All {cars.length} vehicles are professionally maintained and driven by experienced chauffeurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cars.map((car) => (
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
                    {car.features.map((feature, index) => (
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
        </div>
      </section>

      <ContactFooter />
    </div>
  );
};

export default CarsPage;