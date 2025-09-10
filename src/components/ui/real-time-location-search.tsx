import * as React from "react";
import { Check, ChevronsUpDown, MapPin, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Extensive Indian locations database with all states, cities, towns, and popular destinations
const indianLocations = [
  // Metro Cities
  { value: "mumbai", label: "Mumbai, Maharashtra", category: "Metro Cities", state: "Maharashtra" },
  { value: "delhi", label: "Delhi, National Capital Territory", category: "Metro Cities", state: "Delhi" },
  { value: "bangalore", label: "Bangalore, Karnataka", category: "Metro Cities", state: "Karnataka" },
  { value: "hyderabad", label: "Hyderabad, Telangana", category: "Metro Cities", state: "Telangana" },
  { value: "chennai", label: "Chennai, Tamil Nadu", category: "Metro Cities", state: "Tamil Nadu" },
  { value: "kolkata", label: "Kolkata, West Bengal", category: "Metro Cities", state: "West Bengal" },
  { value: "pune", label: "Pune, Maharashtra", category: "Metro Cities", state: "Maharashtra" },
  
  // Gujarat Cities (Primary coverage area)
  { value: "ahmedabad", label: "Ahmedabad, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "surat", label: "Surat, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "vadodara", label: "Vadodara, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "rajkot", label: "Rajkot, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "palanpur", label: "Palanpur, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "navsari", label: "Navsari, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "jamnagar", label: "Jamnagar, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "bhavnagar", label: "Bhavnagar, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "mehsana", label: "Mehsana, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "gandhinagar", label: "Gandhinagar, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "anand", label: "Anand, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "bharuch", label: "Bharuch, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "vapi", label: "Vapi, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "morbi", label: "Morbi, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "surendranagar", label: "Surendranagar, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "junagadh", label: "Junagadh, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "godhra", label: "Godhra, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "veraval", label: "Veraval, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "botad", label: "Botad, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "amreli", label: "Amreli, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "patan", label: "Patan, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "porbandar", label: "Porbandar, Gujarat", category: "Gujarat Cities", state: "Gujarat" },
  { value: "daman", label: "Daman, Daman and Diu", category: "Gujarat Cities", state: "Daman and Diu" },
  
  // Rajasthan
  { value: "jaipur", label: "Jaipur, Rajasthan", category: "State Capitals", state: "Rajasthan" },
  { value: "jodhpur", label: "Jodhpur, Rajasthan", category: "Major Cities", state: "Rajasthan" },
  { value: "udaipur", label: "Udaipur, Rajasthan", category: "Tourist Places", state: "Rajasthan" },
  { value: "ajmer", label: "Ajmer, Rajasthan", category: "Cultural Cities", state: "Rajasthan" },
  { value: "bikaner", label: "Bikaner, Rajasthan", category: "Major Cities", state: "Rajasthan" },
  { value: "kota", label: "Kota, Rajasthan", category: "Major Cities", state: "Rajasthan" },
  { value: "pushkar", label: "Pushkar, Rajasthan", category: "Cultural Cities", state: "Rajasthan" },
  { value: "mount-abu", label: "Mount Abu, Rajasthan", category: "Tourist Places", state: "Rajasthan" },
  
  // Maharashtra
  { value: "nashik", label: "Nashik, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "aurangabad", label: "Aurangabad, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "solapur", label: "Solapur, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "kolhapur", label: "Kolhapur, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "thane", label: "Thane, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "nagpur", label: "Nagpur, Maharashtra", category: "Major Cities", state: "Maharashtra" },
  { value: "lonavala", label: "Lonavala, Maharashtra", category: "Tourist Places", state: "Maharashtra" },
  
  // Karnataka
  { value: "mysore", label: "Mysore, Karnataka", category: "Major Cities", state: "Karnataka" },
  { value: "hubli", label: "Hubli, Karnataka", category: "Major Cities", state: "Karnataka" },
  { value: "mangalore", label: "Mangalore, Karnataka", category: "Major Cities", state: "Karnataka" },
  { value: "coorg", label: "Coorg, Karnataka", category: "Tourist Places", state: "Karnataka" },
  { value: "hampi", label: "Hampi, Karnataka", category: "Cultural Cities", state: "Karnataka" },
  
  // Uttar Pradesh
  { value: "lucknow", label: "Lucknow, Uttar Pradesh", category: "State Capitals", state: "Uttar Pradesh" },
  { value: "kanpur", label: "Kanpur, Uttar Pradesh", category: "Major Cities", state: "Uttar Pradesh" },
  { value: "agra", label: "Agra, Uttar Pradesh", category: "Cultural Cities", state: "Uttar Pradesh" },
  { value: "varanasi", label: "Varanasi, Uttar Pradesh", category: "Cultural Cities", state: "Uttar Pradesh" },
  { value: "mathura", label: "Mathura, Uttar Pradesh", category: "Cultural Cities", state: "Uttar Pradesh" },
  { value: "vrindavan", label: "Vrindavan, Uttar Pradesh", category: "Cultural Cities", state: "Uttar Pradesh" },
  { value: "allahabad", label: "Allahabad, Uttar Pradesh", category: "Cultural Cities", state: "Uttar Pradesh" },
  { value: "meerut", label: "Meerut, Uttar Pradesh", category: "Major Cities", state: "Uttar Pradesh" },
  
  // Madhya Pradesh
  { value: "bhopal", label: "Bhopal, Madhya Pradesh", category: "State Capitals", state: "Madhya Pradesh" },
  { value: "indore", label: "Indore, Madhya Pradesh", category: "Major Cities", state: "Madhya Pradesh" },
  { value: "gwalior", label: "Gwalior, Madhya Pradesh", category: "Major Cities", state: "Madhya Pradesh" },
  { value: "jabalpur", label: "Jabalpur, Madhya Pradesh", category: "Major Cities", state: "Madhya Pradesh" },
  { value: "ujjain", label: "Ujjain, Madhya Pradesh", category: "Cultural Cities", state: "Madhya Pradesh" },
  
  // Himachal Pradesh
  { value: "shimla", label: "Shimla, Himachal Pradesh", category: "Tourist Places", state: "Himachal Pradesh" },
  { value: "manali", label: "Manali, Himachal Pradesh", category: "Tourist Places", state: "Himachal Pradesh" },
  { value: "dharamshala", label: "Dharamshala, Himachal Pradesh", category: "Tourist Places", state: "Himachal Pradesh" },
  { value: "kullu", label: "Kullu, Himachal Pradesh", category: "Tourist Places", state: "Himachal Pradesh" },
  { value: "kasauli", label: "Kasauli, Himachal Pradesh", category: "Tourist Places", state: "Himachal Pradesh" },
  
  // Uttarakhand
  { value: "haridwar", label: "Haridwar, Uttarakhand", category: "Cultural Cities", state: "Uttarakhand" },
  { value: "rishikesh", label: "Rishikesh, Uttarakhand", category: "Cultural Cities", state: "Uttarakhand" },
  { value: "dehradun", label: "Dehradun, Uttarakhand", category: "Major Cities", state: "Uttarakhand" },
  { value: "mussoorie", label: "Mussoorie, Uttarakhand", category: "Tourist Places", state: "Uttarakhand" },
  { value: "nainital", label: "Nainital, Uttarakhand", category: "Tourist Places", state: "Uttarakhand" },
  
  // Jammu & Kashmir
  { value: "srinagar", label: "Srinagar, Jammu and Kashmir", category: "Tourist Places", state: "Jammu and Kashmir" },
  { value: "jammu", label: "Jammu, Jammu and Kashmir", category: "Major Cities", state: "Jammu and Kashmir" },
  { value: "gulmarg", label: "Gulmarg, Jammu and Kashmir", category: "Tourist Places", state: "Jammu and Kashmir" },
  { value: "pahalgam", label: "Pahalgam, Jammu and Kashmir", category: "Tourist Places", state: "Jammu and Kashmir" },
  
  // Goa
  { value: "panaji", label: "Panaji, Goa", category: "State Capitals", state: "Goa" },
  { value: "margao", label: "Margao, Goa", category: "Major Cities", state: "Goa" },
  { value: "calangute", label: "Calangute, Goa", category: "Tourist Places", state: "Goa" },
  { value: "baga", label: "Baga, Goa", category: "Tourist Places", state: "Goa" },
  
  // Tamil Nadu
  { value: "madurai", label: "Madurai, Tamil Nadu", category: "Major Cities", state: "Tamil Nadu" },
  { value: "coimbatore", label: "Coimbatore, Tamil Nadu", category: "Major Cities", state: "Tamil Nadu" },
  { value: "trichy", label: "Trichy, Tamil Nadu", category: "Major Cities", state: "Tamil Nadu" },
  { value: "ooty", label: "Ooty, Tamil Nadu", category: "Tourist Places", state: "Tamil Nadu" },
  { value: "kodaikanal", label: "Kodaikanal, Tamil Nadu", category: "Tourist Places", state: "Tamil Nadu" },
  { value: "kanyakumari", label: "Kanyakumari, Tamil Nadu", category: "Tourist Places", state: "Tamil Nadu" },
  
  // Kerala
  { value: "kochi", label: "Kochi, Kerala", category: "Major Cities", state: "Kerala" },
  { value: "thiruvananthapuram", label: "Thiruvananthapuram, Kerala", category: "State Capitals", state: "Kerala" },
  { value: "munnar", label: "Munnar, Kerala", category: "Tourist Places", state: "Kerala" },
  { value: "alleppey", label: "Alleppey, Kerala", category: "Tourist Places", state: "Kerala" },
  { value: "kovalam", label: "Kovalam, Kerala", category: "Tourist Places", state: "Kerala" },
  
  // West Bengal
  { value: "siliguri", label: "Siliguri, West Bengal", category: "Major Cities", state: "West Bengal" },
  { value: "darjeeling", label: "Darjeeling, West Bengal", category: "Tourist Places", state: "West Bengal" },
  { value: "durgapur", label: "Durgapur, West Bengal", category: "Major Cities", state: "West Bengal" },
  
  // Punjab
  { value: "ludhiana", label: "Ludhiana, Punjab", category: "Major Cities", state: "Punjab" },
  { value: "amritsar", label: "Amritsar, Punjab", category: "Cultural Cities", state: "Punjab" },
  { value: "jalandhar", label: "Jalandhar, Punjab", category: "Major Cities", state: "Punjab" },
  
  // Haryana
  { value: "gurgaon", label: "Gurgaon, Haryana", category: "Major Cities", state: "Haryana" },
  { value: "faridabad", label: "Faridabad, Haryana", category: "Major Cities", state: "Haryana" },
  { value: "panipat", label: "Panipat, Haryana", category: "Major Cities", state: "Haryana" },
  
  // Andhra Pradesh & Telangana
  { value: "visakhapatnam", label: "Visakhapatnam, Andhra Pradesh", category: "Major Cities", state: "Andhra Pradesh" },
  { value: "vijayawada", label: "Vijayawada, Andhra Pradesh", category: "Major Cities", state: "Andhra Pradesh" },
  { value: "tirupati", label: "Tirupati, Andhra Pradesh", category: "Cultural Cities", state: "Andhra Pradesh" },
  
  // Other Tourist Destinations
  { value: "somnath", label: "Somnath, Gujarat", category: "Cultural Cities", state: "Gujarat" },
  { value: "dwarka", label: "Dwarka, Gujarat", category: "Cultural Cities", state: "Gujarat" },
  { value: "girnar", label: "Girnar, Gujarat", category: "Cultural Cities", state: "Gujarat" },
  { value: "khajuraho", label: "Khajuraho, Madhya Pradesh", category: "Cultural Cities", state: "Madhya Pradesh" },
  { value: "ajanta-ellora", label: "Ajanta Ellora, Maharashtra", category: "Cultural Cities", state: "Maharashtra" },
];

interface RealTimeLocationSearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RealTimeLocationSearch({ 
  placeholder = "Search any city, town, or village in India...", 
  value, 
  onValueChange,
  className 
}: RealTimeLocationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? "" : currentValue;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  // Filter locations based on search query
  const filteredLocations = React.useMemo(() => {
    if (!searchQuery) return indianLocations.slice(0, 50); // Show top 50 by default
    
    setIsSearching(true);
    const filtered = indianLocations.filter(location => 
      location.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setTimeout(() => setIsSearching(false), 300);
    return filtered.slice(0, 100); // Limit to 100 results for performance
  }, [searchQuery]);

  // Group locations by category for better organization
  const groupedLocations = React.useMemo(() => {
    return filteredLocations.reduce((acc, location) => {
      const category = location.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(location);
      return acc;
    }, {} as Record<string, typeof filteredLocations>);
  }, [filteredLocations]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-12", className)}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {selectedValue
                ? indianLocations.find((location) => location.value === selectedValue)?.label
                : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-96" align="start">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Type to search across all India..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isSearching && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </div>
          <CommandList>
            <CommandEmpty>
              <div className="py-6 text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No location found.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for cities, states, or tourist places
                </p>
              </div>
            </CommandEmpty>
            
            {!searchQuery && (
              <CommandGroup heading="🔥 Popular Destinations">
                {indianLocations.slice(0, 8).map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === location.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-medium">{location.label.split(',')[0]}</span>
                      <span className="text-xs text-muted-foreground">{location.state}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {Object.entries(groupedLocations).map(([category, locations]) => (
              <CommandGroup key={category} heading={`${category} (${locations.length})`}>
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === location.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <MapPin className="mr-2 h-4 w-4 text-secondary" />
                    <div className="flex flex-col flex-1">
                      <span className="font-medium">{location.label.split(',')[0]}</span>
                      <span className="text-xs text-muted-foreground">{location.state}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
