import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle, Car } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-xl sticky top-0 z-50 border-b border-border/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="block w-full">
              <img 
                src="/lovable-uploads/a20386ff-1c45-4425-abf0-c464a0a43233.png" 
                alt="S.U.K Perfect Cab Service Logo"
                className="h-32 w-full max-w-[350px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <div className="flex items-center space-x-1">
              <Link to="/" className="text-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Home
              </Link>
              <Link to="/cars" className="text-muted-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Our Cars
              </Link>
              <a href="#booking" className="text-muted-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Book Now
              </a>
              <Link to="/about" className="text-muted-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary hover:bg-accent/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary/20 hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.location.href = 'tel:+919974076482'}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button 
              variant="whatsapp" 
              size="sm"
                onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-card">
              <Link to="/" className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link to="/cars" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium">
                Our Cars
              </Link>
              <a href="#booking" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium">
                Book Now
              </a>
              <Link to="/about" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium">
                Contact
              </Link>
              <div className="flex space-x-2 px-3 py-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.location.href = 'tel:+919974076482'}
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button 
                  variant="whatsapp" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.open('https://wa.me/919974076482?text=Hello%2C%20I%20want%20to%20book%20a%20cab%2C%0A%0ACan%20you%20please%20tell%20me%20what%20details%20you%20need%20from%20me%3F', '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;