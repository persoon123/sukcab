import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, X, ChevronDown, Star, Navigation } from "lucide-react";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

interface EnhancedIndiaLocationSearchProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

// Comprehensive Indian cities, towns, and locations organized by states
const popularCities = [
  // Major Metro Cities
  { name: "Mumbai", category: "Metro Cities", state: "Maharashtra" },
  { name: "Delhi", category: "Metro Cities", state: "Delhi" },
  { name: "Bangalore", category: "Metro Cities", state: "Karnataka" },
  { name: "Kolkata", category: "Metro Cities", state: "West Bengal" },
  { name: "Chennai", category: "Metro Cities", state: "Tamil Nadu" },
  { name: "Hyderabad", category: "Metro Cities", state: "Telangana" },
  { name: "Pune", category: "Metro Cities", state: "Maharashtra" },
  { name: "Ahmedabad", category: "Metro Cities", state: "Gujarat" },

  // Gujarat Cities (All major and minor)
  { name: "Surat", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Vadodara", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Rajkot", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Bhavnagar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Jamnagar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Palanpur", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Navsari", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Mehsana", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Gandhinagar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Anand", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Bharuch", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Vapi", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Morbi", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Surendranagar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Godhra", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Porbandar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Veraval", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Amreli", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Botad", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Dahod", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Junagadh", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Kalol", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Khambhat", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Patan", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Savarkundla", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Unjha", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Visnagar", category: "Gujarat Cities", state: "Gujarat" },
  { name: "Wankaner", category: "Gujarat Cities", state: "Gujarat" },

  // Rajasthan Cities
  { name: "Jaipur", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Udaipur", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Jodhpur", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Kota", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Bikaner", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Ajmer", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Bhilwara", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Alwar", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Bharatpur", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Sikar", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Pali", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Tonk", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Kishangarh", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Beawar", category: "Rajasthan Cities", state: "Rajasthan" },
  { name: "Hanumangarh", category: "Rajasthan Cities", state: "Rajasthan" },

  // Maharashtra Cities
  { name: "Nagpur", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Nashik", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Aurangabad", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Solapur", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Kolhapur", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Sangli", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Akola", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Latur", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Dhule", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Ahmednagar", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Chandrapur", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Parbhani", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Jalgaon", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Bhiwandi", category: "Maharashtra Cities", state: "Maharashtra" },
  { name: "Amravati", category: "Maharashtra Cities", state: "Maharashtra" },

  // Uttar Pradesh Cities
  { name: "Lucknow", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Kanpur", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Agra", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Varanasi", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Meerut", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Allahabad", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Bareilly", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Aligarh", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Moradabad", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Saharanpur", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Gorakhpur", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Noida", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Firozabad", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Jhansi", category: "UP Cities", state: "Uttar Pradesh" },
  { name: "Muzaffarnagar", category: "UP Cities", state: "Uttar Pradesh" },

  // Karnataka Cities
  { name: "Mysore", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Hubli", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Mangalore", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Belgaum", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Davangere", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Bellary", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Bijapur", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Shimoga", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Tumkur", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Raichur", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Bidar", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Hospet", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Gadag", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Udupi", category: "Karnataka Cities", state: "Karnataka" },
  { name: "Karwar", category: "Karnataka Cities", state: "Karnataka" },

  // Tamil Nadu Cities
  { name: "Coimbatore", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Madurai", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Tiruchirappalli", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Salem", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Tirunelveli", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Tiruppur", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Vellore", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Erode", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Thoothukudi", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Dindigul", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Thanjavur", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Ranipet", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Sivakasi", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Karur", category: "Tamil Nadu Cities", state: "Tamil Nadu" },
  { name: "Udhagamandalam", category: "Tamil Nadu Cities", state: "Tamil Nadu" },

  // West Bengal Cities
  { name: "Howrah", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Durgapur", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Asansol", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Siliguri", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Malda", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Bardhaman", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Krishnanagar", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Nabadwip", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Kharagpur", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Haldia", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Raiganj", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Medinipur", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Purulia", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Balurghat", category: "West Bengal Cities", state: "West Bengal" },
  { name: "Cooch Behar", category: "West Bengal Cities", state: "West Bengal" },

  // Major Indian Airports
  { name: "Indira Gandhi International Airport (Delhi)", category: "Major Airports", state: "Delhi" },
  { name: "Chhatrapati Shivaji Maharaj International Airport (Mumbai)", category: "Major Airports", state: "Maharashtra" },
  { name: "Kempegowda International Airport (Bangalore)", category: "Major Airports", state: "Karnataka" },
  { name: "Chennai International Airport", category: "Major Airports", state: "Tamil Nadu" },
  { name: "Netaji Subhas Chandra Bose International Airport (Kolkata)", category: "Major Airports", state: "West Bengal" },
  { name: "Rajiv Gandhi International Airport (Hyderabad)", category: "Major Airports", state: "Telangana" },
  { name: "Pune Airport", category: "Major Airports", state: "Maharashtra" },
  { name: "Sardar Vallabhbhai Patel International Airport (Ahmedabad)", category: "Major Airports", state: "Gujarat" },
  { name: "Cochin International Airport (Kochi)", category: "Major Airports", state: "Kerala" },
  { name: "Goa Airport (Dabolim)", category: "Major Airports", state: "Goa" },
  { name: "Jaipur International Airport", category: "Major Airports", state: "Rajasthan" },
  { name: "Trivandrum International Airport", category: "Major Airports", state: "Kerala" },
  { name: "Calicut International Airport", category: "Major Airports", state: "Kerala" },
  { name: "Visakhapatnam Airport", category: "Major Airports", state: "Andhra Pradesh" },
  { name: "Bhubaneswar Airport", category: "Major Airports", state: "Odisha" },
  { name: "Guwahati Airport", category: "Major Airports", state: "Assam" },
  { name: "Chandigarh Airport", category: "Major Airports", state: "Chandigarh" },
  { name: "Lucknow Airport", category: "Major Airports", state: "Uttar Pradesh" },
  { name: "Indore Airport", category: "Major Airports", state: "Madhya Pradesh" },
  { name: "Nagpur Airport", category: "Major Airports", state: "Maharashtra" },
  { name: "Coimbatore Airport", category: "Major Airports", state: "Tamil Nadu" },
  { name: "Madurai Airport", category: "Major Airports", state: "Tamil Nadu" },
  { name: "Mangalore Airport", category: "Major Airports", state: "Karnataka" },
  { name: "Hubli Airport", category: "Major Airports", state: "Karnataka" },
  { name: "Surat Airport", category: "Major Airports", state: "Gujarat" },
  { name: "Vadodara Airport", category: "Major Airports", state: "Gujarat" },
  { name: "Rajkot Airport", category: "Major Airports", state: "Gujarat" },
  { name: "Bhavnagar Airport", category: "Major Airports", state: "Gujarat" },
  { name: "Udaipur Airport", category: "Major Airports", state: "Rajasthan" },
  { name: "Jodhpur Airport", category: "Major Airports", state: "Rajasthan" },

  // Popular Tourist Destinations
  { name: "Goa", category: "Tourist Places", state: "Goa" },
  { name: "Shimla", category: "Tourist Places", state: "Himachal Pradesh" },
  { name: "Manali", category: "Tourist Places", state: "Himachal Pradesh" },
  { name: "Darjeeling", category: "Tourist Places", state: "West Bengal" },
  { name: "Ooty", category: "Tourist Places", state: "Tamil Nadu" },
  { name: "Kodaikanal", category: "Tourist Places", state: "Tamil Nadu" },
  { name: "Munnar", category: "Tourist Places", state: "Kerala" },
  { name: "Coorg", category: "Tourist Places", state: "Karnataka" },
  { name: "Mount Abu", category: "Tourist Places", state: "Rajasthan" },
  { name: "Rishikesh", category: "Tourist Places", state: "Uttarakhand" },
  { name: "Haridwar", category: "Tourist Places", state: "Uttarakhand" },
  { name: "Mussoorie", category: "Tourist Places", state: "Uttarakhand" },
  { name: "Nainital", category: "Tourist Places", state: "Uttarakhand" },
  { name: "Kasauli", category: "Tourist Places", state: "Himachal Pradesh" },
  { name: "Dharamshala", category: "Tourist Places", state: "Himachal Pradesh" },
  { name: "Somnath", category: "Tourist Places", state: "Gujarat" },
  { name: "Dwarka", category: "Tourist Places", state: "Gujarat" },
  { name: "Daman", category: "Tourist Places", state: "Daman and Diu" },
  { name: "Diu", category: "Tourist Places", state: "Daman and Diu" },
  { name: "Rann of Kutch", category: "Tourist Places", state: "Gujarat" },

  // More Major Cities
  { name: "Indore", category: "Major Cities", state: "Madhya Pradesh" },
  { name: "Bhopal", category: "Major Cities", state: "Madhya Pradesh" },
  { name: "Patna", category: "Major Cities", state: "Bihar" },
  { name: "Ranchi", category: "Major Cities", state: "Jharkhand" },
  { name: "Bhubaneswar", category: "Major Cities", state: "Odisha" },
  { name: "Guwahati", category: "Major Cities", state: "Assam" },
  { name: "Chandigarh", category: "Major Cities", state: "Chandigarh" },
  { name: "Kochi", category: "Major Cities", state: "Kerala" },
  { name: "Thiruvananthapuram", category: "Major Cities", state: "Kerala" },
  { name: "Kozhikode", category: "Major Cities", state: "Kerala" },
  { name: "Visakhapatnam", category: "Major Cities", state: "Andhra Pradesh" },
  { name: "Vijayawada", category: "Major Cities", state: "Andhra Pradesh" },
  { name: "Guntur", category: "Major Cities", state: "Andhra Pradesh" },
  { name: "Warangal", category: "Major Cities", state: "Telangana" },
  { name: "Nizamabad", category: "Major Cities", state: "Telangana" },

  // Gujarat Villages
  { name: "Ambaji", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Siddhpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Deesa", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Tharad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vav", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dhanera", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kankrej", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Harij", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Chanasma", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kheralu", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vadgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Danta", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Amirgadh", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bhiloda", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Idar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Himmatnagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Modasa", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dhansura", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Malpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bayad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Prantij", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Talod", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vijaynagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Himatnagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kadi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mahesana", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Visnagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Unjha", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sidhpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Diyodar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Radhanpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Santalpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Chandrasan", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sami", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Lakhani", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bhabhar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vadali", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dholka", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bavla", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Ranpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Viramgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mandal", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Detroj", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kalol", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mansa", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kherva", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dehgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sanand", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Daskroi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Adalaj", category: "Gujarat Villages", state: "Gujarat" },

  // Rajasthan Villages
  { name: "Pushkar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Nathdwara", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Kankroli", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Rajsamand", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Chittorgarh", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Dungarpur", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Banswara", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Pratapgarh", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Jhalawar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Baran", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Sawai Madhopur", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Karauli", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Dausa", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Makrana", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Degana", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Merta", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Didwana", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Ladnun", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Sujangarh", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Pilani", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Churu", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Ratangarh", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Sardarshahar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Taranagar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Suratgarh", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Padampur", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Ghansali", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Rawatsar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Nohar", category: "Rajasthan Villages", state: "Rajasthan" },
  { name: "Bhadra", category: "Rajasthan Villages", state: "Rajasthan" },

  // Maharashtra Villages
  { name: "Shirdi", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Trimbak", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Ozar", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Ranjangaon", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Morgaon", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Theur", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Mahad", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Pali", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Wai", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Mahabaleshwar", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Panchgani", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Lonavala", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Khandala", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Karjat", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Matheran", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Alibaug", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Murud", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Kashid", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Diveagar", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Harihareshwar", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Ganpatipule", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Tarkarli", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Malvan", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Sindhudurg", category: "Maharashtra Villages", state: "Maharashtra" },
  { name: "Sawantwadi", category: "Maharashtra Villages", state: "Maharashtra" },

  // Uttar Pradesh Villages
  { name: "Vrindavan", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Mathura", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Govardhan", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Barsana", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Nandgaon", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Gokul", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Baldeo", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Kosikalan", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Ayodhya", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Chitrakoot", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Allahabad", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Mirzapur", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Chunar", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Vindhyachal", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Bhadohi", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Jaunpur", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Azamgarh", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Mau", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Ballia", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Ghazipur", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Deoria", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Kushinagar", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Padrauna", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Pharenda", category: "UP Villages", state: "Uttar Pradesh" },
  { name: "Nautanwa", category: "UP Villages", state: "Uttar Pradesh" },

  // West Bengal Villages
  { name: "Shantiniketan", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Bolpur", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Tarapith", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Mayurbhanj", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Bishnupur", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Bankura", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Purulia", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Kalimpong", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Kurseong", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Mirik", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Jalpaiguri", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Alipurduar", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Cooch Behar", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Mathabhanga", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Tufanganj", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Falakata", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Mainaguri", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Birpara", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Madarihat", category: "West Bengal Villages", state: "West Bengal" },
  { name: "Hasimara", category: "West Bengal Villages", state: "West Bengal" },

  // Himachal Pradesh Villages
  { name: "Kasol", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Tosh", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Malana", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Kheerganga", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Pulga", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Kalga", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Chalal", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Rasol", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Bhuntar", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Kullu", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Naggar", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Solang", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Gulaba", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Kothi", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Palchan", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Vashisht", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Jogini", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Burua", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Sethan", category: "Himachal Villages", state: "Himachal Pradesh" },
  { name: "Hamta", category: "Himachal Villages", state: "Himachal Pradesh" },

  // Kerala Villages
  { name: "Alleppey", category: "Kerala Villages", state: "Kerala" },
  { name: "Kumarakom", category: "Kerala Villages", state: "Kerala" },
  { name: "Varkala", category: "Kerala Villages", state: "Kerala" },
  { name: "Kovalam", category: "Kerala Villages", state: "Kerala" },
  { name: "Ponmudi", category: "Kerala Villages", state: "Kerala" },
  { name: "Poovar", category: "Kerala Villages", state: "Kerala" },
  { name: "Kollam", category: "Kerala Villages", state: "Kerala" },
  { name: "Quilon", category: "Kerala Villages", state: "Kerala" },
  { name: "Kumily", category: "Kerala Villages", state: "Kerala" },
  { name: "Thekkady", category: "Kerala Villages", state: "Kerala" },
  { name: "Periyar", category: "Kerala Villages", state: "Kerala" },
  { name: "Vagamon", category: "Kerala Villages", state: "Kerala" },
  { name: "Idukki", category: "Kerala Villages", state: "Kerala" },
  { name: "Devikulam", category: "Kerala Villages", state: "Kerala" },
  { name: "Mattupetty", category: "Kerala Villages", state: "Kerala" },
  { name: "Top Station", category: "Kerala Villages", state: "Kerala" },
  { name: "Eravikulam", category: "Kerala Villages", state: "Kerala" },
  { name: "Rajamalai", category: "Kerala Villages", state: "Kerala" },
  { name: "Anamudi", category: "Kerala Villages", state: "Kerala" },
  { name: "Chinnar", category: "Kerala Villages", state: "Kerala" },

  // More Gujarat Villages
  { name: "Chanasma", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Harij", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kheralu", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vadgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dantiwada", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Amirgadh", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bhiloda", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Idar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Himatnagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Modasa", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dhansura", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Malpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bayad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Prantij", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Talod", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vijaynagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kadi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mahesana", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Visnagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Unjha", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sidhpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Diyodar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Radhanpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Santalpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Chandrasan", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sami", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Lakhani", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bhabhar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vadali", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dholka", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bavla", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Ranpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Viramgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mandal", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Detroj", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kalol", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mansa", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kherva", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dehgam", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sanand", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Daskroi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Adalaj", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Khambhalia", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Lalpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Okha", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bet Dwarka", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kalyanpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Khambhat", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Umreth", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Petlad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sojitra", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Borsad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Tarapur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Karamsad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vallabh Vidyanagar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Bakrol", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Nadiad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mahemdabad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kheda", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kapadvanj", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kathlal", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Balasinor", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dakor", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Thasra", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Ankleshwar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Olpad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mangrol", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Una", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kodinar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sutrapada", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Veraval", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Mendarda", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Keshod", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Maliya", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Upleta", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Jetpur", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Gondal", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dhoraji", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Jasdan", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Paddhari", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Lodhika", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Kotda Sangani", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vinchhiya", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Tankara", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Morbi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Halvad", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dhrangadhra", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Dasada", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Patdi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Limbdi", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Wadhwan", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Chotila", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Sayla", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Chuda", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Muli", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Jhagadia", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Netrang", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Hansot", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Amod", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Vagra", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Jambusar", category: "Gujarat Villages", state: "Gujarat" },
  { name: "Panoli", category: "Gujarat Villages", state: "Gujarat" },

  // Punjab Villages
  { name: "Kapurthala", category: "Punjab Villages", state: "Punjab" },
  { name: "Jalandhar", category: "Punjab Villages", state: "Punjab" },
  { name: "Hoshiarpur", category: "Punjab Villages", state: "Punjab" },
  { name: "Nawanshahr", category: "Punjab Villages", state: "Punjab" },
  { name: "Ropar", category: "Punjab Villages", state: "Punjab" },
  { name: "Mohali", category: "Punjab Villages", state: "Punjab" },
  { name: "Patiala", category: "Punjab Villages", state: "Punjab" },
  { name: "Rajpura", category: "Punjab Villages", state: "Punjab" },
  { name: "Samana", category: "Punjab Villages", state: "Punjab" },
  { name: "Patran", category: "Punjab Villages", state: "Punjab" },
  { name: "Dudu Majra", category: "Punjab Villages", state: "Punjab" },
  { name: "Ghuram", category: "Punjab Villages", state: "Punjab" },
  { name: "Sanaur", category: "Punjab Villages", state: "Punjab" },
  { name: "Dera Bassi", category: "Punjab Villages", state: "Punjab" },
  { name: "Lalru", category: "Punjab Villages", state: "Punjab" },
  { name: "Zirakpur", category: "Punjab Villages", state: "Punjab" },
  { name: "Kharar", category: "Punjab Villages", state: "Punjab" },
  { name: "Kurali", category: "Punjab Villages", state: "Punjab" },
  { name: "Morinda", category: "Punjab Villages", state: "Punjab" },
  { name: "Chamkaur Sahib", category: "Punjab Villages", state: "Punjab" },
  { name: "Anandpur Sahib", category: "Punjab Villages", state: "Punjab" },
  { name: "Nangal", category: "Punjab Villages", state: "Punjab" },
  { name: "Una Sahib", category: "Punjab Villages", state: "Punjab" },
  { name: "Garhshankar", category: "Punjab Villages", state: "Punjab" },
  { name: "Banga", category: "Punjab Villages", state: "Punjab" },
  { name: "Nakodar", category: "Punjab Villages", state: "Punjab" },
  { name: "Shahkot", category: "Punjab Villages", state: "Punjab" },
  { name: "Phillaur", category: "Punjab Villages", state: "Punjab" },
  { name: "Goraya", category: "Punjab Villages", state: "Punjab" },
  { name: "Kartarpur", category: "Punjab Villages", state: "Punjab" },
  { name: "Sultanpur Lodhi", category: "Punjab Villages", state: "Punjab" },

  // Haryana Villages
  { name: "Kurukshetra", category: "Haryana Villages", state: "Haryana" },
  { name: "Thanesar", category: "Haryana Villages", state: "Haryana" },
  { name: "Pehowa", category: "Haryana Villages", state: "Haryana" },
  { name: "Ladwa", category: "Haryana Villages", state: "Haryana" },
  { name: "Shahabad", category: "Haryana Villages", state: "Haryana" },
  { name: "Ismailabad", category: "Haryana Villages", state: "Haryana" },
  { name: "Pipli", category: "Haryana Villages", state: "Haryana" },
  { name: "Babain", category: "Haryana Villages", state: "Haryana" },
  { name: "Radaur", category: "Haryana Villages", state: "Haryana" },
  { name: "Bilaspur", category: "Haryana Villages", state: "Haryana" },
  { name: "Jagadhri", category: "Haryana Villages", state: "Haryana" },
  { name: "Yamunanagar", category: "Haryana Villages", state: "Haryana" },
  { name: "Mustafabad", category: "Haryana Villages", state: "Haryana" },
  { name: "Sadhaura", category: "Haryana Villages", state: "Haryana" },
  { name: "Chhachhrauli", category: "Haryana Villages", state: "Haryana" },
  { name: "Naraingarh", category: "Haryana Villages", state: "Haryana" },
  { name: "Kalka", category: "Haryana Villages", state: "Haryana" },
  { name: "Pinjore", category: "Haryana Villages", state: "Haryana" },
  { name: "Morni", category: "Haryana Villages", state: "Haryana" },
  { name: "Raipur Rani", category: "Haryana Villages", state: "Haryana" },
  { name: "Barwala", category: "Haryana Villages", state: "Haryana" },
  { name: "Panchkula", category: "Haryana Villages", state: "Haryana" },
  { name: "Ambala", category: "Haryana Villages", state: "Haryana" },
  { name: "Narnaul", category: "Haryana Villages", state: "Haryana" },
  { name: "Mahendragarh", category: "Haryana Villages", state: "Haryana" },
  { name: "Ateli", category: "Haryana Villages", state: "Haryana" },
  { name: "Nangal Chaudhry", category: "Haryana Villages", state: "Haryana" },
  { name: "Kanina", category: "Haryana Villages", state: "Haryana" },
  { name: "Satnali", category: "Haryana Villages", state: "Haryana" },
  { name: "Nizampur", category: "Haryana Villages", state: "Haryana" },

  // Madhya Pradesh Villages
  { name: "Khajuraho", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Orchha", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Shivpuri", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Gwalior", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Datia", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Jhansi", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Tikamgarh", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Chhatarpur", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Panna", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Satna", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Rewa", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Sidhi", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Singrauli", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Shahdol", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Umaria", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Anuppur", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Dindori", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Mandla", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Jabalpur", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Katni", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Murwara", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Maihar", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Amarpatan", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Nagod", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Uchhehara", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Kotar", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Raghogarh", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Guna", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Ashoknagar", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Chanderi", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Lalitpur", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Jalaun", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Orai", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Kalpi", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Konch", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Mahoba", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Hamirpur", category: "MP Villages", state: "Madhya Pradesh" },
  { name: "Banda", category: "MP Villages", state: "Madhya Pradesh" },

  // Bihar Villages
  { name: "Bodh Gaya", category: "Bihar Villages", state: "Bihar" },
  { name: "Gaya", category: "Bihar Villages", state: "Bihar" },
  { name: "Nalanda", category: "Bihar Villages", state: "Bihar" },
  { name: "Rajgir", category: "Bihar Villages", state: "Bihar" },
  { name: "Bihar Sharif", category: "Bihar Villages", state: "Bihar" },
  { name: "Pawapuri", category: "Bihar Villages", state: "Bihar" },
  { name: "Harnaut", category: "Bihar Villages", state: "Bihar" },
  { name: "Islampur", category: "Bihar Villages", state: "Bihar" },
  { name: "Hilsa", category: "Bihar Villages", state: "Bihar" },
  { name: "Ekangarsarai", category: "Bihar Villages", state: "Bihar" },
  { name: "Ben", category: "Bihar Villages", state: "Bihar" },
  { name: "Giriak", category: "Bihar Villages", state: "Bihar" },
  { name: "Tharthari", category: "Bihar Villages", state: "Bihar" },
  { name: "Karamdih", category: "Bihar Villages", state: "Bihar" },
  { name: "Noorsarai", category: "Bihar Villages", state: "Bihar" },
  { name: "Asthawan", category: "Bihar Villages", state: "Bihar" },
  { name: "Wazirganj", category: "Bihar Villages", state: "Bihar" },
  { name: "Jehanabad", category: "Bihar Villages", state: "Bihar" },
  { name: "Ghoshi", category: "Bihar Villages", state: "Bihar" },
  { name: "Makhdumpur", category: "Bihar Villages", state: "Bihar" },
  { name: "Kako", category: "Bihar Villages", state: "Bihar" },
  { name: "Modanganj", category: "Bihar Villages", state: "Bihar" },
  { name: "Hulasganj", category: "Bihar Villages", state: "Bihar" },
  { name: "Barh", category: "Bihar Villages", state: "Bihar" },
  { name: "Athmal Gola", category: "Bihar Villages", state: "Bihar" },
  { name: "Bakhtiarpur", category: "Bihar Villages", state: "Bihar" },
  { name: "Mokameh", category: "Bihar Villages", state: "Bihar" },
  { name: "Fatuha", category: "Bihar Villages", state: "Bihar" },
  { name: "Khusropur", category: "Bihar Villages", state: "Bihar" },
  { name: "Masaurhi", category: "Bihar Villages", state: "Bihar" },

  // Odisha Villages
  { name: "Puri", category: "Odisha Villages", state: "Odisha" },
  { name: "Konark", category: "Odisha Villages", state: "Odisha" },
  { name: "Pipili", category: "Odisha Villages", state: "Odisha" },
  { name: "Sakshigopal", category: "Odisha Villages", state: "Odisha" },
  { name: "Delang", category: "Odisha Villages", state: "Odisha" },
  { name: "Kakatpur", category: "Odisha Villages", state: "Odisha" },
  { name: "Gop", category: "Odisha Villages", state: "Odisha" },
  { name: "Astaranga", category: "Odisha Villages", state: "Odisha" },
  { name: "Nimapara", category: "Odisha Villages", state: "Odisha" },
  { name: "Satyabadi", category: "Odisha Villages", state: "Odisha" },
  { name: "Brahmagiri", category: "Odisha Villages", state: "Odisha" },
  { name: "Krushnaprasad", category: "Odisha Villages", state: "Odisha" },
  { name: "Chandanpur", category: "Odisha Villages", state: "Odisha" },
  { name: "Puri Sadar", category: "Odisha Villages", state: "Odisha" },
  { name: "Kanas", category: "Odisha Villages", state: "Odisha" },
  { name: "Balianta", category: "Odisha Villages", state: "Odisha" },
  { name: "Jatni", category: "Odisha Villages", state: "Odisha" },
  { name: "Khurda", category: "Odisha Villages", state: "Odisha" },
  { name: "Begunia", category: "Odisha Villages", state: "Odisha" },
  { name: "Bolagarh", category: "Odisha Villages", state: "Odisha" },
  { name: "Chilika", category: "Odisha Villages", state: "Odisha" },
  { name: "Tangi", category: "Odisha Villages", state: "Odisha" },
  { name: "Choudwar", category: "Odisha Villages", state: "Odisha" },
  { name: "Cuttack", category: "Odisha Villages", state: "Odisha" },
  { name: "Banki", category: "Odisha Villages", state: "Odisha" },
  { name: "Dampara", category: "Odisha Villages", state: "Odisha" },
  { name: "Tigiria", category: "Odisha Villages", state: "Odisha" },
  { name: "Niali", category: "Odisha Villages", state: "Odisha" },
  { name: "Jagatpur", category: "Odisha Villages", state: "Odisha" },
  { name: "Salepur", category: "Odisha Villages", state: "Odisha" },

  // Assam Villages
  { name: "Majuli", category: "Assam Villages", state: "Assam" },
  { name: "Jorhat", category: "Assam Villages", state: "Assam" },
  { name: "Sivasagar", category: "Assam Villages", state: "Assam" },
  { name: "Dibrugarh", category: "Assam Villages", state: "Assam" },
  { name: "Tinsukia", category: "Assam Villages", state: "Assam" },
  { name: "Margherita", category: "Assam Villages", state: "Assam" },
  { name: "Digboi", category: "Assam Villages", state: "Assam" },
  { name: "Duliajan", category: "Assam Villages", state: "Assam" },
  { name: "Naharkatiya", category: "Assam Villages", state: "Assam" },
  { name: "Moran", category: "Assam Villages", state: "Assam" },
  { name: "Titabar", category: "Assam Villages", state: "Assam" },
  { name: "Mariani", category: "Assam Villages", state: "Assam" },
  { name: "Teok", category: "Assam Villages", state: "Assam" },
  { name: "Pulibor", category: "Assam Villages", state: "Assam" },
  { name: "Majuli", category: "Assam Villages", state: "Assam" },
  { name: "Kamalabari", category: "Assam Villages", state: "Assam" },
  { name: "Garamur", category: "Assam Villages", state: "Assam" },
  { name: "Auniati", category: "Assam Villages", state: "Assam" },
  { name: "Dakhinpat", category: "Assam Villages", state: "Assam" },
  { name: "Samaguri", category: "Assam Villages", state: "Assam" },
  { name: "Nazira", category: "Assam Villages", state: "Assam" },
  { name: "Dergaon", category: "Assam Villages", state: "Assam" },
  { name: "Golaghat", category: "Assam Villages", state: "Assam" },
  { name: "Bokakhat", category: "Assam Villages", state: "Assam" },
  { name: "Sarupathar", category: "Assam Villages", state: "Assam" },
  { name: "Kaliabor", category: "Assam Villages", state: "Assam" },
  { name: "Raha", category: "Assam Villages", state: "Assam" },
  { name: "Jagiroad", category: "Assam Villages", state: "Assam" },
  { name: "Morigaon", category: "Assam Villages", state: "Assam" },
  { name: "Laharighat", category: "Assam Villages", state: "Assam" },

  // Uttarakhand Villages
  { name: "Kedarnath", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Badrinath", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Gangotri", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Yamunotri", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Joshimath", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Auli", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Chopta", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Tungnath", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Chandrashila", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Ukhimath", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Gopeshwar", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Chamoli", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Karnaprayag", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Rudraprayag", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Srinagar", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Pauri", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Lansdowne", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Kotdwar", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Najibabad", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Bijnor", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Roorkee", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Jwalapur", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Laksar", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Manglaur", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Bhagwanpur", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Khanpur", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Landhaura", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Doiwala", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Selaqui", category: "Uttarakhand Villages", state: "Uttarakhand" },
  { name: "Rajpur", category: "Uttarakhand Villages", state: "Uttarakhand" },

  // Telangana Villages
  { name: "Warangal", category: "Telangana Villages", state: "Telangana" },
  { name: "Khammam", category: "Telangana Villages", state: "Telangana" },
  { name: "Karimnagar", category: "Telangana Villages", state: "Telangana" },
  { name: "Nizamabad", category: "Telangana Villages", state: "Telangana" },
  { name: "Adilabad", category: "Telangana Villages", state: "Telangana" },
  { name: "Mahbubnagar", category: "Telangana Villages", state: "Telangana" },
  { name: "Rangareddy", category: "Telangana Villages", state: "Telangana" },
  { name: "Medchal", category: "Telangana Villages", state: "Telangana" },
  { name: "Sangareddy", category: "Telangana Villages", state: "Telangana" },
  { name: "Siddipet", category: "Telangana Villages", state: "Telangana" },
  { name: "Jangaon", category: "Telangana Villages", state: "Telangana" },
  { name: "Jayashankar", category: "Telangana Villages", state: "Telangana" },
  { name: "Mancherial", category: "Telangana Villages", state: "Telangana" },
  { name: "Peddapalli", category: "Telangana Villages", state: "Telangana" },
  { name: "Rajanna", category: "Telangana Villages", state: "Telangana" },
  { name: "Kamareddy", category: "Telangana Villages", state: "Telangana" },
  { name: "Mahabubnagar", category: "Telangana Villages", state: "Telangana" },
  { name: "Nagarkurnool", category: "Telangana Villages", state: "Telangana" },
  { name: "Wanaparthy", category: "Telangana Villages", state: "Telangana" },
  { name: "Jogulamba", category: "Telangana Villages", state: "Telangana" },
  { name: "Gadwal", category: "Telangana Villages", state: "Telangana" },
  { name: "Alampur", category: "Telangana Villages", state: "Telangana" },
  { name: "Kurnool", category: "Telangana Villages", state: "Telangana" },
  { name: "Nandyal", category: "Telangana Villages", state: "Telangana" },
  { name: "Mantralayam", category: "Telangana Villages", state: "Telangana" },
  { name: "Yemmiganur", category: "Telangana Villages", state: "Telangana" },
  { name: "Adoni", category: "Telangana Villages", state: "Telangana" },
  { name: "Alur", category: "Telangana Villages", state: "Telangana" },
  { name: "Aspari", category: "Telangana Villages", state: "Telangana" },
  { name: "Atmakur", category: "Telangana Villages", state: "Telangana" },

  // Andhra Pradesh Villages
  { name: "Tirupati", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Tirumala", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Sriharikota", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Pulicat", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Sullurpeta", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Naidupeta", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Gudur", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Venkatagiri", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Kalahasti", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Nagari", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Puttur", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Renigunta", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Pakala", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "KVB Puram", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Chandragiri", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Chittoor", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Madanapalle", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Hindupur", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Penukonda", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Anantapur", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Rayadurg", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Kalyandurg", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Gooty", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Tadipatri", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Kadiri", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Mudigubba", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Yellanur", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Guntakal", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Uravakonda", category: "AP Villages", state: "Andhra Pradesh" },
  { name: "Singanamala", category: "AP Villages", state: "Andhra Pradesh" }
];

export const EnhancedIndiaLocationSearch = ({ 
  placeholder = "Search any location in India", 
  value, 
  onValueChange,
  className = ""
}: EnhancedIndiaLocationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter popular cities based on query
  const filteredPopularCities = popularCities.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase()) ||
    city.state.toLowerCase().includes(query.toLowerCase())
  );

  // Group filtered cities by category
  const groupedCities = filteredPopularCities.reduce((acc, city) => {
    if (!acc[city.category]) {
      acc[city.category] = [];
    }
    acc[city.category].push(city);
    return acc;
  }, {} as Record<string, typeof popularCities>);

  // Removed API search functionality - only using default dropdown

  // Removed API search function

  const handleSelectLocation = (locationName: string) => {
    // Use exact location name without any cleanup
    
    // Clear any pending search timeout first
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Immediately close all dropdowns and clear states
    setShowResults(false);
    setShowPopular(false);
    setResults([]);
    setLoading(false);
    
    // Set values after closing dropdowns to prevent re-opening
    setTimeout(() => {
      setQuery(locationName);
      onValueChange(locationName);
      
      // Remove focus from input to ensure dropdown stays closed
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 0);
  };

  const handleSelectAPILocation = (location: Location) => {
    const locationName = location.display_name.split(',')[0];
    handleSelectLocation(locationName);
  };

  const handleClear = () => {
    setQuery("");
    onValueChange("");
    setResults([]);
    setShowResults(false);
    setShowPopular(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (!newQuery) {
      onValueChange("");
      setShowPopular(false);
    }
  };

  const handleInputFocus = () => {
    if (!query) {
      setShowPopular(true);
    }
  };

  const handleInputClick = () => {
    if (!query) {
      setShowPopular(true);
      setShowResults(false);
    } else if (filteredPopularCities.length > 0) {
      setShowPopular(true);
      setShowResults(false);
    }
  };

  // Set initial query from value prop
  useEffect(() => {
    if (value && !query) {
      setQuery(value);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowPopular(false);
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {!query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleInputClick}
              className="h-6 w-6 p-0"
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
          )}
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Popular Cities Dropdown */}
      {showPopular && (
        <div className="absolute top-full left-0 right-0 z-[60] mt-1 bg-popover border border-border rounded-md shadow-lg max-h-96 overflow-y-auto backdrop-blur-sm">
          <div className="px-3 py-2 bg-muted/80 border-b border-border sticky top-0 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Popular Destinations</span>
            </div>
          </div>
          
          {Object.entries(groupedCities).map(([category, cities]) => (
            <div key={category}>
              <div className="px-3 py-2 bg-accent/20 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{category}</span>
              </div>
              <div className="grid grid-cols-1 gap-1 p-1">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSelectLocation(`${city.name}, ${city.state}`)}
                    className="text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-sm transition-colors flex items-center gap-2"
                  >
                    <Navigation className="h-3 w-3 text-primary flex-shrink-0" />
                    <span className="font-medium">{city.name}, {city.state}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {!query && (
            <div className="p-3 text-center text-xs text-muted-foreground border-t border-border">
              Start typing to search for any location in India
            </div>
          )}
        </div>
      )}

      {/* API Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-[60] mt-1 bg-popover border border-border rounded-md shadow-lg max-h-80 overflow-y-auto backdrop-blur-sm">
          <div className="px-3 py-2 bg-muted/80 border-b border-border sticky top-0 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Search Results</span>
            </div>
          </div>
          {results.map((location) => (
            <button
              key={location.place_id}
              onClick={() => handleSelectAPILocation(location)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground flex items-start gap-2 border-b border-border/50 last:border-b-0 transition-colors"
            >
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">
                  {location.display_name.split(',')[0]}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {location.display_name}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.length >= 2 && filteredPopularCities.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-[60] mt-1 bg-popover border border-border rounded-md shadow-lg p-4 backdrop-blur-sm">
          <div className="text-sm text-muted-foreground text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            No locations found for "{query}"
            <br />
            <span className="text-xs">Try searching for cities, towns, or landmarks in India</span>
          </div>
        </div>
      )}
    </div>
  );
};
