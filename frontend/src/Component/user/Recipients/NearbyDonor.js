import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import { Link } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';

function getBounds(props) {
  return L.latLng(props.center).toBounds(props.size);
}

function Square(props) {
  const map = useMap();
  const squareRef = useRef();
  const propsRef = useRef(props);

  useEffect(() => {
    squareRef.current = new L.Rectangle(getBounds(props));
    map.addLayer(squareRef.current);

    return () => {
      map.removeLayer(squareRef.current);
    };
  }, [map, props]);

  useEffect(() => {
    if (
      props.center !== propsRef.current.center ||
      props.size !== propsRef.current.size
    ) {
      squareRef.current.setBounds(getBounds(props));
    }
    propsRef.current = props;
  }, [props.center, props.size]);

  return null;
}

const NearbyDonorsMap = () => {
  const [donorsLocations, setDonorsLocations] = useState([]);
  const defaultLat = 27.678376; // Replace with your actual default latitude
  const defaultLng = 85.451768; // Replace with your actual default longitude

  useEffect(() => {
    axios.get('http://localhost:5000/api/premium-donors/locations')
      .then(response => setDonorsLocations(response.data))
      .catch(error => console.error('Error fetching premium donors locations:', error));
  }, []);

  return (
    <div>
      <h2>Premium Donors Map</h2>
      <MapContainer center={[defaultLat, defaultLng]} zoom={13} style={{ height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {donorsLocations.map(donor => (
          <Marker key={donor.id} position={[donor.latitude, donor.longitude]}>
            <Popup>
              <strong>{donor.userName}</strong><br />
              Phone: {donor.userPhone}
              <Link to={`/donors/${donor.premium_donor_id}`}>
                      <button type="button">View Profile</button>
                    </Link>
            </Popup>
          </Marker>
        ))}
        { <Square center={[defaultLat, defaultLng]} size={1000} /> }
      </MapContainer>
    </div>
  );
};

export default NearbyDonorsMap;
