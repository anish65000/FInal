import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserNavbar from '../UserNavbar';
import UserSidebar from './UserSidebar';

import 'leaflet/dist/leaflet.css';

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
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex flex-col w-full">
        <UserNavbar />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold mb-4 text-center text-pastel-green  ">Premium Donors Map</h2>
          <div className="h-64 relative"> {/* Adjusted height for smaller map */}
            {/* Text about latitude, longitude, and nearby donors */}
            <div className="absolute top-4 left-4 bg-green text-white p-4 rounded-md ">
              <p>Latitude and longitude are geographic coordinates used to specify a location on the Earth's surface. They are expressed in degrees, with latitude indicating the north-south position and longitude indicating the east-west position.</p>
              <p>In the provided code, defaultLat and defaultLng represent the default latitude and longitude values, which are used to center the map when it loads. These values determine the initial view of the map.</p>
              <p>The "Nearby Donors" section in the map provides some information about the latitude and longitude being displayed on the map. Additionally, it mentions that the markers on the map represent premium donors who are nearby. This information helps users understand what the map is showing and provides context for the displayed markers.</p>
            </div>
          </div>
          <br></br>
          {/* Map Container */}
          <MapContainer center={[defaultLat, defaultLng]} zoom={13} style={{ height: '320px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {donorsLocations.map(donor => (
              <Marker key={donor.id} position={[donor.latitude, donor.longitude]}>
                <Popup>
                  <strong>{donor.userName}</strong><br />
                  Phone: {donor.userPhone}
                  <br />
                  <Link to={`/donors/${donor.premium_donor_id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2">View Profile</button>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default NearbyDonorsMap;
