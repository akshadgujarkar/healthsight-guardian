import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hospital, fetchNearbyHospitals, searchHospitalsByAddress, mockNearbyHospitals } from '@/services/nearbyHospitalsService';
import { MapPin, Star, Clock, Search, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NearbyHospitalsProps {
  condition: string;
  symptoms?: string[];
}

const NearbyHospitals: React.FC<NearbyHospitalsProps> = ({ condition, symptoms = [] }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [useLocation, setUseLocation] = useState(true);

  useEffect(() => {
    if (useLocation) {
      getLocationAndFetchHospitals();
    }
  }, [condition, useLocation]);

  const getLocationAndFetchHospitals = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const results = await fetchNearbyHospitals(
              position.coords.latitude,
              position.coords.longitude,
              condition
            );
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
          setError("Location access denied. Please enable location services or search by address.");
          // Fallback to mock data
          setHospitals(mockNearbyHospitals(condition));
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please try another browser or search by address.");
      // Fallback to mock data
      setHospitals(mockNearbyHospitals(condition));
      setLoading(false);
    }
  };

  const handleAddressSearch = async () => {
    if (!address.trim()) {
      toast.error("Please enter an address to search");
      return;
    }

    setLoading(true);
    setUseLocation(false);
    try {
      const results = await searchHospitalsByAddress(address, condition);
      setHospitals(results);
      setError(null);
    } catch (err) {
      console.error("Error searching by address:", err);
      setError("Failed to search hospitals by address. Please try again.");
      // Fallback to mock data
      setHospitals(mockNearbyHospitals(condition));
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    setUseLocation(true);
  };

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
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Input 
                placeholder="Enter your address to find nearby hospitals" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleAddressSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={handleUseMyLocation} className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Use My Location
            </Button>
          </div>
        </div>

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
                    {hospital.distance && (
                      <div className="flex items-center text-blue-600">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hospital.distance}</span>
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
              <p className="text-center text-gray-500">No medical facilities found for this condition. Try a different address or condition.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyHospitals;
