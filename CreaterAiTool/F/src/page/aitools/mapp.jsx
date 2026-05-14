import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.6139, // default (Delhi)
  lng: 77.209,
};

const Mapp = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries: ["places"], // important for Places API
  });

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMarker(location);
    map.panTo(location);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search place..."
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default Mapp;
