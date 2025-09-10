import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, X } from "lucide-react";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

interface OpenStreetMapSearchProps {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const OpenStreetMapSearch = ({ 
  placeholder = "Search any location in India", 
  value, 
  onValueChange,
  className = ""
}: OpenStreetMapSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

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
    }, 500);

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
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&countrycodes=in&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      // Filter and format results for India locations
      const filteredResults = data.filter((location: any) => 
        location.display_name && 
        location.display_name.toLowerCase().includes('india')
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

  const handleSelectLocation = (location: Location) => {
    const locationName = location.display_name.split(',')[0]; // Get main location name
    setQuery(locationName);
    onValueChange(locationName);
    setShowResults(false);
  };

  const handleClear = () => {
    setQuery("");
    onValueChange("");
    setResults([]);
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (!newQuery) {
      onValueChange("");
    }
  };

  // Set initial query from value prop
  useEffect(() => {
    if (value && !query) {
      setQuery(value);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
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

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-y-auto">
          {results.map((location) => (
            <button
              key={location.place_id}
              onClick={() => handleSelectLocation(location)}
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

      {showResults && results.length === 0 && !loading && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-md p-3">
          <div className="text-sm text-muted-foreground text-center">
            No locations found. Try searching for cities, towns, or landmarks in India.
          </div>
        </div>
      )}
    </div>
  );
};