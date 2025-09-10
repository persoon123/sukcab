import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

// Comprehensive list of Indian cities and towns for all-India coverage
const indianLocations = [
  // Metro Cities
  { value: "mumbai", label: "Mumbai, Maharashtra", category: "Metro" },
  { value: "delhi", label: "Delhi, National Capital Territory", category: "Metro" },
  { value: "bangalore", label: "Bangalore, Karnataka", category: "Metro" },
  { value: "hyderabad", label: "Hyderabad, Telangana", category: "Metro" },
  { value: "chennai", label: "Chennai, Tamil Nadu", category: "Metro" },
  { value: "kolkata", label: "Kolkata, West Bengal", category: "Metro" },
  
  // Tier 1 Cities
  { value: "ahmedabad", label: "Ahmedabad, Gujarat", category: "Major Cities" },
  { value: "pune", label: "Pune, Maharashtra", category: "Major Cities" },
  { value: "surat", label: "Surat, Gujarat", category: "Major Cities" },
  { value: "jaipur", label: "Jaipur, Rajasthan", category: "Major Cities" },
  { value: "lucknow", label: "Lucknow, Uttar Pradesh", category: "Major Cities" },
  { value: "kanpur", label: "Kanpur, Uttar Pradesh", category: "Major Cities" },
  { value: "nagpur", label: "Nagpur, Maharashtra", category: "Major Cities" },
  { value: "indore", label: "Indore, Madhya Pradesh", category: "Major Cities" },
  { value: "thane", label: "Thane, Maharashtra", category: "Major Cities" },
  { value: "bhopal", label: "Bhopal, Madhya Pradesh", category: "Major Cities" },
  { value: "visakhapatnam", label: "Visakhapatnam, Andhra Pradesh", category: "Major Cities" },
  { value: "vadodara", label: "Vadodara, Gujarat", category: "Major Cities" },
  { value: "rajkot", label: "Rajkot, Gujarat", category: "Major Cities" },
  
  // Gujarat Cities (Client's focus area)
  { value: "palanpur", label: "Palanpur, Gujarat", category: "Gujarat" },
  { value: "navsari", label: "Navsari, Gujarat", category: "Gujarat" },
  { value: "jamnagar", label: "Jamnagar, Gujarat", category: "Gujarat" },
  { value: "bhavnagar", label: "Bhavnagar, Gujarat", category: "Gujarat" },
  { value: "mehsana", label: "Mehsana, Gujarat", category: "Gujarat" },
  { value: "gandhinagar", label: "Gandhinagar, Gujarat", category: "Gujarat" },
  { value: "anand", label: "Anand, Gujarat", category: "Gujarat" },
  { value: "bharuch", label: "Bharuch, Gujarat", category: "Gujarat" },
  { value: "vapi", label: "Vapi, Gujarat", category: "Gujarat" },
  
  // Tourist Destinations
  { value: "goa", label: "Goa", category: "Tourist Places" },
  { value: "daman", label: "Daman, Daman and Diu", category: "Tourist Places" },
  { value: "somnath", label: "Somnath, Gujarat", category: "Tourist Places" },
  { value: "girnar", label: "Girnar, Gujarat", category: "Tourist Places" },
  { value: "junagadh", label: "Junagadh, Gujarat", category: "Tourist Places" },
  { value: "shimla", label: "Shimla, Himachal Pradesh", category: "Tourist Places" },
  { value: "manali", label: "Manali, Himachal Pradesh", category: "Tourist Places" },
  { value: "ooty", label: "Ooty, Tamil Nadu", category: "Tourist Places" },
  { value: "kashmir", label: "Kashmir, Jammu and Kashmir", category: "Tourist Places" },
  
  // Major State Capitals
  { value: "patna", label: "Patna, Bihar", category: "State Capitals" },
  { value: "raipur", label: "Raipur, Chhattisgarh", category: "State Capitals" },
  { value: "ranchi", label: "Ranchi, Jharkhand", category: "State Capitals" },
  { value: "bhubaneswar", label: "Bhubaneswar, Odisha", category: "State Capitals" },
  { value: "thiruvananthapuram", label: "Thiruvananthapuram, Kerala", category: "State Capitals" },
  { value: "panaji", label: "Panaji, Goa", category: "State Capitals" },
  
  // Important Commercial Cities
  { value: "faridabad", label: "Faridabad, Haryana", category: "Commercial Cities" },
  { value: "ghaziabad", label: "Ghaziabad, Uttar Pradesh", category: "Commercial Cities" },
  { value: "ludhiana", label: "Ludhiana, Punjab", category: "Commercial Cities" },
  { value: "agra", label: "Agra, Uttar Pradesh", category: "Commercial Cities" },
  { value: "nashik", label: "Nashik, Maharashtra", category: "Commercial Cities" },
  { value: "meerut", label: "Meerut, Uttar Pradesh", category: "Commercial Cities" },
  { value: "aurangabad", label: "Aurangabad, Maharashtra", category: "Commercial Cities" },
  { value: "amritsar", label: "Amritsar, Punjab", category: "Commercial Cities" },
  { value: "coimbatore", label: "Coimbatore, Tamil Nadu", category: "Commercial Cities" },
  { value: "jabalpur", label: "Jabalpur, Madhya Pradesh", category: "Commercial Cities" },
  { value: "gwalior", label: "Gwalior, Madhya Pradesh", category: "Commercial Cities" },
  
  // Additional Important Cities
  { value: "varanasi", label: "Varanasi, Uttar Pradesh", category: "Cultural Cities" },
  { value: "haridwar", label: "Haridwar, Uttarakhand", category: "Cultural Cities" },
  { value: "rishikesh", label: "Rishikesh, Uttarakhand", category: "Cultural Cities" },
  { value: "mathura", label: "Mathura, Uttar Pradesh", category: "Cultural Cities" },
  { value: "vrindavan", label: "Vrindavan, Uttar Pradesh", category: "Cultural Cities" },
  { value: "pushkar", label: "Pushkar, Rajasthan", category: "Cultural Cities" },
  { value: "udaipur", label: "Udaipur, Rajasthan", category: "Cultural Cities" },
  { value: "jodhpur", label: "Jodhpur, Rajasthan", category: "Cultural Cities" },
];

interface EnhancedLocationSearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function EnhancedLocationSearch({ 
  placeholder = "Search location across India...", 
  value, 
  onValueChange,
  className 
}: EnhancedLocationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? "" : currentValue;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  // Group locations by category
  const groupedLocations = indianLocations.reduce((acc, location) => {
    const category = location.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(location);
    return acc;
  }, {} as Record<string, typeof indianLocations>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {selectedValue
              ? indianLocations.find((location) => location.value === selectedValue)?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-96">
        <Command>
          <CommandInput placeholder="Search cities, towns, tourist places..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            {Object.entries(groupedLocations).map(([category, locations]) => (
              <CommandGroup key={category} heading={category}>
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
                    {location.label}
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