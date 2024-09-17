import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';

interface LatLong {
  lat: number;
  lng: number;
}

interface MapProps {
  latlong: LatLong | null;
  setLatlong: React.Dispatch<React.SetStateAction<LatLong | null>>;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// Define libraries array as a constant
const libraries : Library[] = ['places'];

const Map: React.FC<MapProps> = ({ latlong, setLatlong }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries, // Use the constant here
  });

  const [currentLocation, setCurrentLocation] = useState<LatLong | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLong | null>(latlong);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(userLocation);
          if (mapRef.current) {
            mapRef.current.panTo(userLocation);
          }
        },
        () => {
          console.error("Unable to retrieve your location");
        }
      );
    }
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    const newLatLng = {
      lat: event.latLng?.lat() ?? 0,
      lng: event.latLng?.lng() ?? 0,
    };
    setLatlong(newLatLng);
    setMarkerPosition(newLatLng);
  }, [setLatlong, setMarkerPosition]);

  useEffect(() => {
    if (latlong && mapRef.current) {
      mapRef.current.panTo(latlong);
    }
  }, [latlong]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const newLatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLatlong(newLatLng);
      setMarkerPosition(newLatLng);
      if (mapRef.current) {
        mapRef.current.panTo(newLatLng);
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Autocomplete
        onLoad={onAutocompleteLoad}
        onPlaceChanged={handlePlaceSelect}
        options={{ types: ['geocode'] }}
      >
        <input
          type="text"
          placeholder="Search for a place"
          ref={inputRef}
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}
          className='p-1 px-4 rounded-md'
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation || latlong || { lat: -34.397, lng: 150.644 }}
        zoom={10}
        options={options}
        onClick={onMapClick}
        onLoad={onLoad}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            animation={google.maps.Animation.DROP}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
