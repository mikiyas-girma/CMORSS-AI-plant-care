import { useState, useEffect, useRef, useContext } from 'react';
import { useJsApiLoader /*, Autocomplete*/ } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import { AuthContext } from '@/contexts/AuthContext';

interface LatLong {
  lat: number;
  lng: number;
}

const libs: Library[] = ['core', 'maps', 'places', 'marker'];

/**
 * Map Component
 * @returns
 */
function Map() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext not provided');
  }
  const { saveLocation } = authContext;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [latlong, setLatlong] = useState<LatLong | null>(null);
  const [autocomplete /*, setAutocomplete*/] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: libs,
  });

  const mapRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);

  // Get user's current location using Geolocation API
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatlong({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set a default location if geolocation fails
          setLatlong({ lat: 1.3521, lng: 103.8198 }); // Singapore as default
        }
      );
    } else {
      // Set a default location if geolocation is not available
      setLatlong({ lat: 1.3521, lng: 103.8198 });
    }
  }, []);

  // Initialize the map once the user's location is available and the map is loaded
  useEffect(() => {
    if (isLoaded && latlong && mapRef.current) {
      const mapOptions = {
        center: { lat: latlong.lat, lng: latlong.lng },
        zoom: 12,
      };
      const gmap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(gmap);

      // Add marker at the user's location
      const gMarker = new google.maps.Marker({
        position: { lat: latlong.lat, lng: latlong.lng },
        map: gmap,
        title: 'Your Location',
      });
      setMarker(gMarker);

      // Add click listener to the map to move the marker when user clicks on the map
      gmap.addListener('click', async (e) => {
        const newLatLong = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        gMarker.setPosition(newLatLong); // Move the marker to the clicked location
        gmap.panTo(newLatLong); // Pan the map to the new marker location

        // Save the new location using saveLocation function from AuthContext
        if (saveLocation) {
          await saveLocation(newLatLong.lat, newLatLong.lng);
        }
      });
    }
  }, [isLoaded, latlong, saveLocation]);

  // Handle place selection from Google Places Autocomplete
  const onPlaceSelected = () => {
    const place = autocomplete?.getPlace();
    if (place?.geometry?.location) {
      const newLatLong = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLatlong(newLatLong);

      // Update map center and marker to the new place
      if (map) {
        map.setCenter(new google.maps.LatLng(newLatLong.lat, newLatLong.lng));
        if (marker) {
          marker.setPosition(newLatLong);
        } else {
          const gMarker = new google.maps.Marker({
            position: newLatLong,
            map: map,
            title: 'Selected Place',
          });
          setMarker(gMarker);
        }

        // Save the new location using saveLocation function from AuthContext
        if (saveLocation) {
          saveLocation(newLatLong.lat, newLatLong.lng);
        }
      }
    }
  };

  return (
    <div className="scrollbar-thin h-full w-full p-3 md:p-8 flex flex-col relative">
      {/* Autocomplete search input is functional, but currently not working due to limited resource from the API */}
      {/* <Autocomplete
        onLoad={(auto) => setAutocomplete(auto)}
        onPlaceChanged={onPlaceSelected}
      >
        <input
          ref={inputRef}
          placeholder="Search for a place"
          type="text"
          className="input-class"
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', width: '300px' }}
        />
      </Autocomplete> */}

      {/* Map container */}
      {isLoaded ? (
        <div
          ref={mapRef}
          style={{ width: '100%', objectFit: 'cover' }}
          className="rounded-lg sm:mt-0 !-mt-8 h-[calc(100dvh-120px)] sm:h-full"
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default Map;
