import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonorLocationPage = () => {
  const { donorId } = useParams();
  const [donorLocation, setDonorLocation] = useState(null);
  const [showStartRideForm, setShowStartRideForm] = useState(false);
  const [showEndRideForm, setShowEndRideForm] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [rideInProgress, setRideInProgress] = useState(false);

  useEffect(() => {
    const fetchDonorLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ride-details/${donorId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { latitude, longitude, userName, rideStatus } = response.data.rideDetails;
        setDonorLocation({ latitude, longitude, userName });
        if (rideStatus === 'started') {
          setRideInProgress(true);
        }
      } catch (error) {
        console.error('Error fetching donor location:', error);
        toast.error('Error fetching donor location');
      }
    };

    fetchDonorLocation();
  }, [donorId]);

  const handleStartRide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/start-ride/${donorId}`, {
        location: startLocation,
        startTime,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        toast.success('Ride started successfully');
        setShowStartRideForm(false);
        setRideInProgress(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Ride already in progress') {
        toast.error(error.response.data.message);
      } else {
        console.error('Error starting ride:', error);
        toast.error('Error starting ride');
      }
    }
  };

  const handleEndRide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/end-ride/${donorId}`, {
        location: endLocation,
        endTime,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        toast.success('Ride ended successfully');
        setShowEndRideForm(false);
        setRideInProgress(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error ending ride:', error);
      toast.error('Error ending ride');
    }
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Donor Location</h2>
      {donorLocation && (
        <>
          <MapContainer center={[donorLocation.latitude, donorLocation.longitude]} zoom={13} style={{ height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[donorLocation.latitude, donorLocation.longitude]}>
              <Popup className="p-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                  <span className="font-bold">{donorLocation.userName}</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          <div className="flex justify-end mt-4">
            {!rideInProgress && !showStartRideForm && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => setShowStartRideForm(true)}
              >
                Start Ride
              </button>
            )}
            {!showEndRideForm && rideInProgress && (
              <div className="text-red-500 font-semibold">Ride in progress</div>
            )}
            {!showEndRideForm && !rideInProgress && (
              <button
                className="bg-red  hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowEndRideForm(true)}
              >
                End Ride
              </button>
            )}
          </div>
          {showStartRideForm && (
            <form className="mt-4 bg-white p-4 rounded-lg shadow-md" onSubmit={handleStartRide}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="startLocation">
                  Start Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="startLocation"
                  type="text"
                  placeholder="Start Location"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">
                  Start Time
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Confirm Start Ride
              </button>
            </form>
          )}
          {showEndRideForm && (
            <form className="mt-4 bg-white p-4 rounded-lg shadow-md" onSubmit={handleEndRide}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="endLocation">
                  End Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="endLocation"
                  type="text"
                  placeholder="End Location"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">
                  End Time
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-red  hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Confirm End Ride
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default DonorLocationPage;
