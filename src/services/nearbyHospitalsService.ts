
import { API_KEYS } from "@/config/apiConfig";
import { toast } from "@/components/ui/sonner";

export interface Hospital {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  openNow?: boolean;
  distance?: string;
}

export const fetchNearbyHospitals = async (
  latitude: number,
  longitude: number,
  condition: string
): Promise<Hospital[]> => {
  try {
    // Add condition as keyword to find more relevant results
    const keyword = `${condition} hospital clinic medical center`;
    
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&keyword=${encodeURIComponent(keyword)}&key=${API_KEYS.GOOGLE_PLACES_API_KEY}`;
    
    // For browser-based applications, you'll need to proxy this request through your backend
    // as the Places API doesn't support CORS for direct browser requests
    // This is a simplified example that won't work directly in the browser
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== "OK") {
      throw new Error(`API Error: ${data.status}`);
    }
    
    return data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      rating: place.rating,
      openNow: place.opening_hours?.open_now,
    })).slice(0, 5); // Return top 5 results
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    toast.error("Failed to fetch nearby hospitals. Please try again.");
    return [];
  }
};

// If you want to test the service without the actual API
export const mockNearbyHospitals = (condition: string): Hospital[] => {
  return [
    {
      id: "1",
      name: `${condition} Specialist Hospital`,
      vicinity: "123 Medical Drive, Cityville",
      rating: 4.5,
      openNow: true,
    },
    {
      id: "2",
      name: "Central Medical Center",
      vicinity: "456 Healthcare Blvd, Townsburg",
      rating: 4.2,
      openNow: true,
    },
    {
      id: "3",
      name: "Community Clinic",
      vicinity: "789 Wellness Way, Villageton",
      rating: 3.9,
      openNow: false,
    },
  ];
};
