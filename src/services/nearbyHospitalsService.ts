
import { toast } from "sonner";

export interface Hospital {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  openNow?: boolean;
  distance?: string;
}

interface OverpassDoctor {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    'addr:full'?: string;
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?: string;
  };
}

// Haversine formula to calculate distance between two coordinates in kilometers
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Convert degrees to radians
  const toRad = (value: number) => value * Math.PI / 180;
  const rlat1 = toRad(lat1);
  const rlon1 = toRad(lon1);
  const rlat2 = toRad(lat2);
  const rlon2 = toRad(lon2);
  
  // Haversine formula
  const dlat = rlat2 - rlat1;
  const dlon = rlon2 - rlon1;
  const a = Math.sin(dlat/2)**2 + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(dlon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const r = 6371;  // Earth's radius in kilometers
  return r * c;
};

// Function to geocode an address using Nominatim
const geocodeAddress = async (address: string): Promise<{lat: number, lon: number} | null> => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

export const fetchNearbyHospitals = async (
  latitude: number,
  longitude: number,
  condition: string
): Promise<Hospital[]> => {
  try {
    // Query Overpass API for hospitals and doctors related to the condition
    const radius = 10000; // 10 km in meters
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    
    // Create a query that looks for hospitals, clinics, doctors that might relate to the condition
    const amenities = ["hospital", "clinic", "doctors"];
    const tags = amenities.map(amenity => `node["amenity"="${amenity}"](around:${radius},${latitude},${longitude});`).join("");
    
    const overpassQuery = `
    [out:json];
    (
      ${tags}
      node["healthcare"](around:${radius},${latitude},${longitude});
    );
    out body;
    `;
    
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(overpassQuery)}`
    });
    
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const facilities = data.elements as OverpassDoctor[];
    
    if (!facilities || facilities.length === 0) {
      return mockNearbyHospitals(condition);
    }
    
    // Calculate distances and format results
    const hospitalList = facilities.map((facility) => {
      const distance = haversine(latitude, longitude, facility.lat, facility.lon);
      
      // Format the address from available tags
      let vicinity = facility.tags['addr:full'] || '';
      if (!vicinity && facility.tags['addr:street']) {
        vicinity = `${facility.tags['addr:housenumber'] || ''} ${facility.tags['addr:street']}${facility.tags['addr:city'] ? `, ${facility.tags['addr:city']}` : ''}`;
      }
      
      return {
        id: facility.id.toString(),
        name: facility.tags.name || 'Medical Facility',
        vicinity: vicinity || 'Address not available',
        distance: distance.toFixed(2) + ' km'
      };
    });
    
    // Sort by distance and take top 5
    hospitalList.sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!));
    return hospitalList.slice(0, 5);
    
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    toast.error("Failed to fetch nearby hospitals. Using mock data.");
    return mockNearbyHospitals(condition);
  }
};

// Function to search for hospitals by address and condition
export const searchHospitalsByAddress = async (
  address: string,
  condition: string
): Promise<Hospital[]> => {
  try {
    // First geocode the address to get coordinates
    const location = await geocodeAddress(address);
    
    if (!location) {
      toast.error("Could not find the provided address. Using mock data.");
      return mockNearbyHospitals(condition);
    }
    
    // Then search for hospitals near those coordinates
    return fetchNearbyHospitals(location.lat, location.lon, condition);
  } catch (error) {
    console.error("Error searching hospitals by address:", error);
    toast.error("Failed to search hospitals. Using mock data.");
    return mockNearbyHospitals(condition);
  }
};

// Mock data in case the API fails
export const mockNearbyHospitals = (condition: string): Hospital[] => {
  return [
    {
      id: "1",
      name: `${condition} Specialist Hospital`,
      vicinity: "123 Medical Drive, Cityville",
      rating: 4.5,
      openNow: true,
      distance: "0.8 km"
    },
    {
      id: "2",
      name: "Central Medical Center",
      vicinity: "456 Healthcare Blvd, Townsburg",
      rating: 4.2,
      openNow: true,
      distance: "1.5 km"
    },
    {
      id: "3",
      name: "Community Clinic",
      vicinity: "789 Wellness Way, Villageton",
      rating: 3.9,
      openNow: false,
      distance: "2.3 km"
    },
    {
      id: "4",
      name: "Family Medicine Practice",
      vicinity: "101 Health Street, Medicaltown",
      rating: 4.7,
      openNow: true,
      distance: "3.1 km"
    },
    {
      id: "5",
      name: "Urgent Care Center",
      vicinity: "202 Emergency Road, Careville",
      rating: 4.0,
      openNow: true,
      distance: "4.2 km"
    }
  ];
};
