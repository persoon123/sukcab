import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedIndiaLocationSearch } from "@/components/ui/enhanced-india-location-search";
import { MessageCircle } from "lucide-react";

const BookingForm = () => {
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
    <section id="booking" className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Book Your Ride
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
            Fill in your details and we'll contact you immediately via WhatsApp
          </p>
        </div>

        <Card className="shadow-card mx-4 sm:mx-0">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl text-center">Booking Details</CardTitle>
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
    </section>
  );
};

export default BookingForm;