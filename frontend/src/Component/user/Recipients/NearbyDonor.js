import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserNavbar from '../UserNavbar';
import UserSidebar from './UserSidebar';

import 'leaflet/dist/leaflet.css';

const DonorsMap = () => {
  const [donorsLocations, setDonorsLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch premium donors' locations
    axios
      .get('http://localhost:5000/api/premium-donors/locations')
      .then((response) => {
        setDonorsLocations(response.data);
      })
      .catch((error) => console.error('Error fetching premium donors locations:', error));

    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching user location:', error);
          // If unable to fetch user's location, you can handle it here
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // If geolocation is not supported, you can handle it here
    }
  }, []);

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex flex-col w-full">
        <UserNavbar />
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold mb-4 text-center text-pastel-green">Premium Donors Map</h2>
          <div className="h-64 relative">
            {/* Text about latitude, longitude, and nearby donors */}
            <div className="absolute top-4 left-4 bg-green text-white p-4 rounded-md">
              <p>Latitude and longitude are geographic coordinates used to specify a location on the Earth's surface. They are expressed in degrees, with latitude indicating the north-south position and longitude indicating the east-west position.</p>
              <p>The default latitude and longitude values represent the user's current location, which are fetched using geolocation. If geolocation is not supported or user permission is denied, default values are used.</p>
              <p>The map displays all premium donors, and the user's location is indicated by the map's center point.</p>
            </div>
          </div>
          <br />
          {/* Map Container */}
          {userLocation && (
            <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} style={{ height: '320px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {donorsLocations.map((donor) => (
                <Marker key={donor.id} position={[donor.latitude, donor.longitude]}>
                  <Popup>
                    <strong>{donor.userName}</strong>
                    <br />
                    Phone: {donor.userPhone}
                    <br />
                    <Link to={`/donors/${donor.premium_donor_id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2">View Profile</button>
                    </Link>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorsMap;