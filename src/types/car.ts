export interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  pricePerKm: number;
  capacity: string;
  features: string[];
  wheelType: string;
}

export interface BookingData {
  fullName: string;
  phoneNumber: string;
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  carType?: string;
  estimatedDistance?: number;
  estimatedPrice?: number;
}