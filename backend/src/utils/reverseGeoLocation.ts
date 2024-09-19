import axios from 'axios';

const reverseGeocode = async (lat: number, lng: number) => {
    const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const formattedAddress = response.data.results[0]?.formatted_address;
    return formattedAddress || 'Address Unknown';
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return 'Error occurred';
  }
};

export default reverseGeocode;
