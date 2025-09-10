import { Car } from "@/types/car";
import wagonRImg from "@/assets/wagon-r.jpg";
import dzireImg from "@/assets/dzire.jpg";
import etiosImg from "@/assets/etios.jpg";
import amazeImg from "@/assets/amaze.jpg";
import auraImg from "@/assets/aura.jpg";
import ertigaImg from "@/assets/ertiga.jpg";
import vernaImg from "@/assets/verna.jpg";
import innovaCrystaImg from "@/assets/innova-crysta.jpg";
import carensImg from "@/assets/carens.jpg";

export const cars: Car[] = [
  {
    id: "wagon-r",
    name: "Maruti Suzuki WagonR",
    type: "4-Wheeler",
    image: wagonRImg,
    description: "Compact and fuel-efficient ride for city travel",
    pricePerKm: 11,
    capacity: "1-5 passengers",
    features: ["AC", "Professional Driver", "Clean Interior", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire",
    type: "4-Wheeler", 
    image: dzireImg,
    description: "Premium sedan comfort for comfortable journeys",
    pricePerKm: 11,
    capacity: "1-4 passengers",
    features: ["AC", "Professional Driver", "Premium Interior", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "etios",
    name: "Toyota Etios",
    type: "4-Wheeler",
    image: etiosImg,
    description: "Reliable Toyota quality for long distance travel", 
    pricePerKm: 11,
    capacity: "1-4 passengers",
    features: ["AC", "Professional Driver", "Spacious Interior", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "amaze",
    name: "Honda Amaze",
    type: "4-Wheeler",
    image: amazeImg,
    description: "Honda's trusted performance for every journey",
    pricePerKm: 11,
    capacity: "1-4 passengers", 
    features: ["AC", "Professional Driver", "Comfortable Seats", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "aura",
    name: "Hyundai Aura",
    type: "4-Wheeler",
    image: auraImg,
    description: "Modern design with advanced features",
    pricePerKm: 11,
    capacity: "1-4 passengers",
    features: ["AC", "Professional Driver", "Modern Features", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "ertiga",
    name: "Maruti Suzuki Ertiga",
    type: "7-Wheeler",
    image: ertigaImg,
    description: "Perfect 7-seater for family trips and group travel",
    pricePerKm: 13,
    capacity: "1-7 passengers",
    features: ["AC", "Extra Luggage Space", "Professional Driver", "GPS Tracking"],
    wheelType: "7-Wheeler"
  },
  {
    id: "verna",
    name: "Hyundai Verna", 
    type: "4-Wheeler",
    image: vernaImg,
    description: "Premium sedan with luxury features",
    pricePerKm: 13,
    capacity: "1-4 passengers",
    features: ["AC", "Premium Interior", "Professional Driver", "GPS Tracking"],
    wheelType: "4-Wheeler"
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    type: "7-Wheeler",
    image: innovaCrystaImg,
    description: "The gold standard for comfortable group travel",
    pricePerKm: 18,
    capacity: "1-7 passengers",
    features: ["AC", "Premium Comfort", "Professional Driver", "Extra Luggage Space"],
    wheelType: "7-Wheeler"
  },
  {
    id: "carens",
    name: "Kia Carens 7 Seater",
    type: "7-Wheeler",
    image: carensImg,
    description: "Modern 7-seater with advanced technology",
    pricePerKm: 18,
    capacity: "1-7 passengers",
    features: ["AC", "Modern Tech", "Professional Driver", "Premium Interior"],
    wheelType: "7-Wheeler"
  }
];

export const famousRoutes = [
  "Mumbai", "Surat", "Ahmedabad", "Palanpur", "Navsari", "Daman", 
  "Girnar", "Somnath", "Junagadh", "Rajkot", "Jamnagar", "Bhavnagar", 
  "Vadodara", "Mehsana"
];

export const picnicPoints = [
  "Kashmir", "Shimla", "Himachal Pradesh", "Goa", "Mumbai Darshan", 
  "Ooty", "Manali"
];