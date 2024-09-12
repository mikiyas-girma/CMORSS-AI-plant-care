import { useState, useEffect } from 'react';

type LocationState = {
  latitude: number | null;
  longitude: number | null;
};

const useGeolocation = (): LocationState => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(`Error: ${error.message}`);
      alert(`Error: ${error.message}`);
      setLocation({ latitude: null, longitude: null });
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return error ? { latitude: null, longitude: null } : location;
};

export default useGeolocation;
