import { useState, useCallback } from 'react';

const useLocation = () => {
  const [userLocation, setUserLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const getUserLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);
    
    try {
      // Get coordinates
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      
      // Use reverse geocoding to get readable address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      
      // Extract city and country from the response
      const locationString = data.address.city || data.address.town;
      setUserLocation(locationString || 'Location not found');
    } catch (error) {
      setLocationError(error.message);
      setUserLocation('Location access denied');
      console.error('Error getting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  return {
    userLocation,
    isLoadingLocation,
    locationError,
    getUserLocation
  };
};

export default useLocation;