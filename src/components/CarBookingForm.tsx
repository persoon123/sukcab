import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedIndiaLocationSearch } from "@/components/ui/enhanced-india-location-search";
import { MessageCircle } from "lucide-react";
import { Car } from "@/types/car";

interface CarBookingFormProps {
  car: Car;
}

const CarBookingForm = ({ car }: CarBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationChange = (field: 'pickupLocation' | 'dropLocation') => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `🚖 New Cab Booking Request
Name: ${formData.fullName}
Phone: ${formData.phoneNumber}
Pickup: ${formData.pickupLocation}
Drop: ${formData.dropLocation}
Date: ${formData.date}
Time: ${formData.time}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919974076482?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Car Details */}
          <div className="order-2 xl:order-1">
            <Card className="shadow-card">
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4 sm:mb-6">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{car.name}</h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">{car.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm sm:text-base">Vehicle Type:</span>
                    <span className="text-primary font-semibold text-sm sm:text-base">{car.wheelType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm sm:text-base">Capacity:</span>
                    <span className="text-sm sm:text-base">{car.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm sm:text-base">Price per KM:</span>
                    <span className="text-xl sm:text-2xl font-bold text-primary">₹{car.pricePerKm}</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="order-1 xl:order-2">
            <Card className="shadow-card">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl">Book {car.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm sm:text-base">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-sm sm:text-base">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number"
                        className="h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Pickup Location</Label>
                    <EnhancedIndiaLocationSearch
                      placeholder="Search pickup location in India"
                      value={formData.pickupLocation}
                      onValueChange={handleLocationChange('pickupLocation')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Drop Location</Label>
                    <EnhancedIndiaLocationSearch
                      placeholder="Search drop location in India"
                      value={formData.dropLocation}
                      onValueChange={handleLocationChange('dropLocation')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm sm:text-base">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm sm:text-base">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="h-11 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="whatsapp" 
                    size="lg" 
                    className="w-full text-base sm:text-lg py-4 sm:py-6 h-12 sm:h-auto"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarBookingForm;