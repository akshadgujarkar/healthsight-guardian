
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hospital, fetchNearbyHospitals, mockNearbyHospitals } from '@/services/nearbyHospitalsService';
import { MapPin, Star, Clock } from 'lucide-react';
import { API_KEYS } from '@/config/apiConfig';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NearbyHospitalsProps {
  condition: string;
}

const NearbyHospitals: React.FC<NearbyHospitalsProps> = ({ condition }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              let results: Hospital[];
              
              // Check if we have a valid API key
              if (API_KEYS.GOOGLE_PLACES_API_KEY && 
                  API_KEYS.GOOGLE_PLACES_API_KEY !== "YOUR_GOOGLE_PLACES_API_KEY") {
                results = await fetchNearbyHospitals(
                  position.coords.latitude,
                  position.coords.longitude,
                  condition
                );
              } else {
                // Use mock data if no API key is provided
                results = mockNearbyHospitals(condition);
                setError("Using mock data. Add a valid Google Places API key for real results.");
              }
              
              setHospitals(results);
            } catch (err) {
              console.error("Error fetching hospitals:", err);
              setError("Failed to fetch nearby hospitals. Please try again later.");
              // Fallback to mock data
              setHospitals(mockNearbyHospitals(condition));
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            console.error("Error getting location:", err);
            setError("Location access denied. Please enable location services to see nearby hospitals.");
            // Fallback to mock data
            setHospitals(mockNearbyHospitals(condition));
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser. Please try another browser.");
        // Fallback to mock data
        setHospitals(mockNearbyHospitals(condition));
        setLoading(false);
      }
    };

    getLocation();
  }, [condition]);

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-red-500" />
          Nearby Medical Facilities
        </CardTitle>
        <CardDescription>
          Based on your diagnosis, here are medical facilities near you that may help
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <div key={hospital.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.vicinity}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {hospital.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{hospital.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {hospital.openNow !== undefined && (
                      <div className={`flex items-center ${hospital.openNow ? 'text-green-600' : 'text-red-600'}`}>
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hospital.openNow ? 'Open now' : 'Closed'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No medical facilities found for this condition.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyHospitals;
