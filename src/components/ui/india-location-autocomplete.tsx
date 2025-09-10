import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, X, Search } from "lucide-react";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
  type: string;
}

interface IndiaLocationAutocompleteProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

// Popular Indian cities, airports, and locations for quick selection
const popularCities = [
  // Major Cities
  "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad",
  "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", "Vadodara",
  "Coimbatore", "Agra", "Madurai", "Nashik", "Faridabad", "Rajkot", "Varanasi",
  "Amritsar", "Jodhpur", "Raipur", "Kota", "Guwahati", "Chandigarh", "Mysore",
  
  // States
  "Maharashtra", "Gujarat", "Rajasthan", "Karnataka", "Tamil Nadu", "West Bengal", 
  "Uttar Pradesh", "Madhya Pradesh", "Telangana", "Kerala", "Punjab", "Haryana",
  "Bihar", "Odisha", "Assam", "Jharkhand", "Himachal Pradesh", "Uttarakhand",
  
  // Gujarat Cities
  "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Palanpur", "Navsari", 
  "Mehsana", "Anand", "Morbi", "Surendranagar", "Vapi", "Bharuch", "Godhra",
  
  // Major Airports
  "Chhatrapati Shivaji International Airport Mumbai", "Indira Gandhi International Airport Delhi", 
  "Kempegowda International Airport Bangalore", "Chennai International Airport", 
  "Rajiv Gandhi International Airport Hyderabad", "Pune Airport", "Sardar Vallabhbhai Patel International Airport Ahmedabad",
  "Surat Airport", "Jaipur International Airport", "Netaji Subhas Chandra Bose International Airport Kolkata",
  
  // Tourist Places
  "Goa", "Shimla", "Manali", "Ooty", "Darjeeling", "Mussoorie", "Nainital", "Mount Abu",
  "Kodaikanal", "Munnar", "Coorg", "Kasauli", "Dharamshala", "Rishikesh", "Haridwar"
];

export const IndiaLocationAutocomplete = ({ 
  placeholder = "Search locations in India", 
  value, 
  onValueChange,
  className = ""
}: IndiaLocationAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [skipSearch, setSkipSearch] = useState(false); // Flag to skip search when selecting from popular cities
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter popular cities based on query and remove duplicates
  const filteredPopularCities = popularCities
    .filter(city => city.toLowerCase().includes(query.toLowerCase()))
    .filter((city, index, arr) => arr.findIndex(c => c.toLowerCase() === city.toLowerCase()) === index);

  useEffect(() => {
    if (value && !query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    // Skip search if we're just selecting from popular cities
    if (skipSearch) {
      setSkipSearch(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(query);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, skipSearch]);

  const searchLocation = async (searchQuery: string) => {
    setLoading(true);
    try {
      // Enhanced search with multiple approaches for better India coverage
      const searches = [
        // Primary search with countrycodes
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=15&countrycodes=in&q=${encodeURIComponent(searchQuery)}`,
        // Secondary search with "India" in query for better coverage
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${encodeURIComponent(searchQuery + ' India')}`
      ];

      let allResults: any[] = [];
      
      for (const searchUrl of searches) {
        try {
          const response = await fetch(searchUrl);
          if (response.ok) {
            const data = await response.json();
            allResults = [...allResults, ...data];
          }
        } catch (err) {
          console.error('Search error for URL:', searchUrl, err);
        }
      }

      if (allResults.length > 0) {
        // Enhanced filtering for Indian locations - accept results from API with countrycodes=in
        const indianResults = allResults.filter((location: any) => {
          if (!location.display_name) return false;
          
          const displayName = location.display_name.toLowerCase();
          
          // Accept if it has India in the name OR if it was from countrycodes=in search
          return displayName.includes('india') || 
                 location.boundingbox || // Has valid coordinates from India search
                 displayName.includes('भारत'); // Hindi name for India
        });

        // Remove duplicates and sort by relevance
        const uniqueResults = indianResults
          .filter((location, index, arr) => {
            const mainName = location.display_name.split(',')[0].toLowerCase().trim();
            return arr.findIndex(l => l.display_name.split(',')[0].toLowerCase().trim() === mainName) === index;
          })
          .sort((a, b) => {
            // Prioritize exact matches and major cities
            const aName = a.display_name.toLowerCase();
            const bName = b.display_name.toLowerCase();
            const queryLower = searchQuery.toLowerCase();
            
            if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
            if (!aName.startsWith(queryLower) && bName.startsWith(queryLower)) return 1;
            
            return 0;
          })
          .slice(0, 15); // Limit results
        
        setResults(uniqueResults);
        setShowDropdown(uniqueResults.length > 0);
        setShowPopular(false);
      }
    } catch (error) {
      console.error('Location search error:', error);
      setResults([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (!newQuery.trim()) {
      onValueChange("");
      setShowDropdown(false);
      setShowPopular(false);
      setResults([]);
    } else {
      // When typing, close popular dropdown and prepare for search results
      setShowPopular(false);
      setShowDropdown(false); // Reset dropdown state for new search
    }
  };

  const handleInputFocus = () => {
    // Only show popular dropdown if input is empty
    // If there's already a value, don't show dropdown on focus
    if (!query.trim()) {
      setShowPopular(true);
      setShowDropdown(false);
    }
    // Don't automatically show dropdown if there are results - let user search
  };

  const handleSelectLocation = (locationName: string) => {
    const cleanName = locationName.split(',')[0].trim();
    
    // Clear any pending search timeout first
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set values and immediately close all dropdowns
    setQuery(cleanName);
    onValueChange(cleanName);
    setShowDropdown(false);
    setShowPopular(false);
    setResults([]);
    setLoading(false);
    
    // Prevent any subsequent search when selecting from popular cities
    setSkipSearch(true);
  };

  const handleSelectAPIResult = (location: Location) => {
    const locationName = location.display_name.split(',')[0];
    handleSelectLocation(locationName);
  };

  const handleClear = () => {
    setQuery("");
    onValueChange("");
    setResults([]);
    setShowDropdown(false);
    setShowPopular(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setShowPopular(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-12"
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {query && !loading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Popular Cities Dropdown */}
      {showPopular && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto backdrop-blur-sm">
          <div className="px-3 py-2 bg-muted/80 border-b border-border sticky top-0 backdrop-blur-sm">
            <span className="text-sm font-medium text-foreground">Popular Cities in India</span>
          </div>
          <div className="p-2">
            {popularCities.slice(0, 20).map((city) => (
              <button
                key={city}
                onClick={() => handleSelectLocation(city)}
                className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-sm flex items-center gap-2 transition-colors"
              >
                <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Popular Cities - Only show when typing and no API results */}
      {query && filteredPopularCities.length > 0 && !showDropdown && !loading && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto backdrop-blur-sm">
          <div className="px-3 py-2 bg-accent/20 border-b border-border/50 sticky top-0 backdrop-blur-sm">
            <span className="text-sm font-medium text-accent-foreground">Popular Matches</span>
          </div>
          {filteredPopularCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelectLocation(city)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-colors"
            >
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-medium">{city}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto backdrop-blur-sm">
          <div className="px-3 py-2 bg-muted/80 border-b border-border sticky top-0 backdrop-blur-sm">
            <span className="text-sm font-medium text-foreground">Search Results</span>
          </div>
          {results.map((location) => (
            <button
              key={location.place_id}
              onClick={() => handleSelectAPIResult(location)}
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

      {/* No Results */}
      {showDropdown && results.length === 0 && !loading && query.length >= 2 && filteredPopularCities.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-popover border border-border rounded-md shadow-lg p-4 backdrop-blur-sm">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <div className="text-sm">No locations found for "{query}"</div>
            <div className="text-xs mt-1">Try searching for cities, towns, or landmarks in India</div>
          </div>
        </div>
      )}
    </div>
  );
};