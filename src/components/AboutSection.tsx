import { Shield, Users, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 sm:mb-8 px-4">
          About S.U.K Perfect Cab Service
        </h2>
        
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-4">
          S.U.K Perfect Cab Service provides reliable rides across India with trusted drivers, 
          safe travel, and affordable rates. Your comfort and safety are our top priorities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex flex-col items-center p-4 sm:p-6 bg-card rounded-xl shadow-card">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Safe Travel</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
              Verified drivers and well-maintained vehicles for your safety
            </p>
          </div>

          <div className="flex flex-col items-center p-4 sm:p-6 bg-card rounded-xl shadow-card">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Trusted Drivers</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
              Professional and experienced drivers you can rely on
            </p>
          </div>

          <div className="flex flex-col items-center p-4 sm:p-6 bg-card rounded-xl shadow-card">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">All India Service</h3>
            <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
              Wide coverage across India for all your travel needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;