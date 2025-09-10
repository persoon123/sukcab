import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, X, ChevronDown, Star } from "lucide-react";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

interface IndiaLocationSearchProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

// Famous Indian cities and towns
const famousCities = [
  "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad",
  "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore", "Thane",
  "Bhopal", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Coimbatore",
  "Agra", "Madurai", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
  "Allahabad", "Ranchi", "Howrah", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Raipur",
  "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Mysore", "Tiruchirappalli",
  "Bareilly", "Aligarh", "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar", "Salem",
  "Mira-Bhayandar", "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner",
  "Amravati", "Noida", "Jamshedpur", "Bhilai Nagar", "Cuttack", "Firozabad", "Kochi",
  "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur",
  "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi",
  "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", "Belgaum", "Mangalore",
  "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala",
  "Palanpur", "Navsari", "Daman", "Girnar", "Somnath", "Junagadh", "Mehsana", "Anand"
];

export const IndiaLocationSearch = ({ 
  placeholder = "Search any location in India", 
  value, 
  onValueChange,
  className = ""
}: IndiaLocationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFamousCities, setShowFamousCities] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter famous cities based on query
  const filteredFamousCities = famousCities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(query);
    }, 300); // Faster response

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const searchLocation = async (searchQuery: string) => {
    setLoading(true);
    try {
      // OpenStreetMap Nominatim API with India specific search
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=in&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      // Filter and format results for India locations
      const filteredResults = data.filter((location: any) => 
        location.display_name && 
        (location.display_name.toLowerCase().includes('india') || 
         location.display_name.toLowerCase().includes('gujarat') ||
         location.display_name.toLowerCase().includes('maharashtra') ||
         location.display_name.toLowerCase().includes('rajasthan'))
      );
      
      setResults(filteredResults);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching location:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (locationName: string) => {
    setQuery(locationName);
    onValueChange(locationName);
    setShowResults(false);
    setShowFamousCities(false);
  };

  const handleSelectAPILocation = (location: Location) => {
    const locationName = location.display_name.split(',')[0]; // Get main location name
    handleSelectLocation(locationName);
  };

  const handleClear = () => {
    setQuery("");
    onValueChange("");
    setResults([]);
    setShowResults(false);
    setShowFamousCities(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (!newQuery) {
      onValueChange("");
      setShowFamousCities(false);
    }
  };

  const handleInputFocus = () => {
    if (!query) {
      setShowFamousCities(true);
    }
  };

  const handleInputClick = () => {
    if (!query) {
      setShowFamousCities(true);
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
        setShowFamousCities(false);
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

      {/* Famous Cities Dropdown */}
      {showFamousCities && !query && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Popular Cities</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 p-2">
            {famousCities.slice(0, 20).map((city) => (
              <button
                key={city}
                onClick={() => handleSelectLocation(city)}
                className="text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-sm transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Famous Cities */}
      {query && filteredFamousCities.length > 0 && !showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Popular Matches</span>
            </div>
          </div>
          {filteredFamousCities.slice(0, 8).map((city) => (
            <button
              key={city}
              onClick={() => handleSelectLocation(city)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-2 border-b border-border last:border-b-0"
            >
              <Star className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-medium text-foreground">{city}</span>
            </button>
          ))}
        </div>
      )}

      {/* API Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Search Results</span>
            </div>
          </div>
          {results.map((location) => (
            <button
              key={location.place_id}
              onClick={() => handleSelectAPILocation(location)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground flex items-start gap-2 border-b border-border last:border-b-0"
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

      {showResults && results.length === 0 && !loading && query.length >= 2 && filteredFamousCities.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg p-3">
          <div className="text-sm text-muted-foreground text-center">
            No locations found. Try searching for cities, towns, or landmarks in India.
          </div>
        </div>
      )}
    </div>
  );
};