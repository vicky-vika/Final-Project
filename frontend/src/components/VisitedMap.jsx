import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 55.9533,
  lng: -3.1883,
};

const locations = [
  { name: 'Warsaw', lat: 52.2297, lng: 21.0122 },
  { name: 'Reykjavik', lat: 64.1466, lng: -21.9426 },
  { name: 'Ottawa', lat: 45.4215, lng: -75.6972 },
  { name: 'Edinburgh', lat: 55.9533, lng: -3.1883 },
];

const VisitedMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDMvemlddLMlawu3IUi1eVHWhSLqb2-8As',
  });


  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={3} 
      center={center} 
    >
      {}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          label={location.name}
        />
      ))}
    </GoogleMap>
  );
};

export default VisitedMap;