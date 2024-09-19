import axios from 'axios';
import exp from 'constants';

const reverseGeocode = async (lat: number, lng: number) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const formattedAddress = response.data.results[0]?.formatted_address;
    return formattedAddress || 'Address not found';
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return 'Error occurred';
  }
};

export default reverseGeocode;
