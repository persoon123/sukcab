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

const indianCities = [
  { value: "mumbai", label: "Mumbai, Maharashtra" },
  { value: "delhi", label: "Delhi, National Capital Territory" },
  { value: "bangalore", label: "Bangalore, Karnataka" },
  { value: "hyderabad", label: "Hyderabad, Telangana" },
  { value: "ahmedabad", label: "Ahmedabad, Gujarat" },
  { value: "chennai", label: "Chennai, Tamil Nadu" },
  { value: "kolkata", label: "Kolkata, West Bengal" },
  { value: "surat", label: "Surat, Gujarat" },
  { value: "pune", label: "Pune, Maharashtra" },
  { value: "jaipur", label: "Jaipur, Rajasthan" },
  { value: "lucknow", label: "Lucknow, Uttar Pradesh" },
  { value: "kanpur", label: "Kanpur, Uttar Pradesh" },
  { value: "nagpur", label: "Nagpur, Maharashtra" },
  { value: "indore", label: "Indore, Madhya Pradesh" },
  { value: "thane", label: "Thane, Maharashtra" },
  { value: "bhopal", label: "Bhopal, Madhya Pradesh" },
  { value: "visakhapatnam", label: "Visakhapatnam, Andhra Pradesh" },
  { value: "pimpri", label: "Pimpri-Chinchwad, Maharashtra" },
  { value: "patna", label: "Patna, Bihar" },
  { value: "vadodara", label: "Vadodara, Gujarat" },
  { value: "ghaziabad", label: "Ghaziabad, Uttar Pradesh" },
  { value: "ludhiana", label: "Ludhiana, Punjab" },
  { value: "agra", label: "Agra, Uttar Pradesh" },
  { value: "nashik", label: "Nashik, Maharashtra" },
  { value: "faridabad", label: "Faridabad, Haryana" },
  { value: "meerut", label: "Meerut, Uttar Pradesh" },
  { value: "rajkot", label: "Rajkot, Gujarat" },
  { value: "kalyan", label: "Kalyan-Dombivali, Maharashtra" },
  { value: "vasai", label: "Vasai-Virar, Maharashtra" },
  { value: "varanasi", label: "Varanasi, Uttar Pradesh" },
  { value: "srinagar", label: "Srinagar, Jammu and Kashmir" },
  { value: "aurangabad", label: "Aurangabad, Maharashtra" },
  { value: "dhanbad", label: "Dhanbad, Jharkhand" },
  { value: "amritsar", label: "Amritsar, Punjab" },
  { value: "navi-mumbai", label: "Navi Mumbai, Maharashtra" },
  { value: "allahabad", label: "Allahabad, Uttar Pradesh" },
  { value: "ranchi", label: "Ranchi, Jharkhand" },
  { value: "howrah", label: "Howrah, West Bengal" },
  { value: "coimbatore", label: "Coimbatore, Tamil Nadu" },
  { value: "jabalpur", label: "Jabalpur, Madhya Pradesh" },
  { value: "gwalior", label: "Gwalior, Madhya Pradesh" },
];

interface LocationSearchProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function LocationSearch({ 
  placeholder = "Search location...", 
  value, 
  onValueChange,
  className 
}: LocationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedValue ? "" : currentValue;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

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
              ? indianCities.find((city) => city.value === selectedValue)?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search cities across India..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {indianCities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}