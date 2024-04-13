import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from './UserNavbar';
import DonorSidebar from './Donor/Donorsidebar';
//import DonationsSidebar from './DonationsSidebar'; // Import the DonationsSidebar component

const PremiumDonorRegistration = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  const [donorHealth, setDonorHealth] = useState('');
  const [previousDonation, setPreviousDonation] = useState('');
  const [donorType, setDonorType] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('availabilityTime', availabilityTime);
    formData.append('donorhealth', donorHealth);
    formData.append('previousdontaion', previousDonation);
    formData.append('DonorType', donorType);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:5000/register/premiumdonor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your authentication token
        }
      });

      setMessage(response.data.message);
      // Reset form fields if registration is successful
      if (response.data.premiumDonorId) {
        setLatitude('');
        setLongitude('');
        setAvailabilityTime('');
        setDonorHealth('');
        setPreviousDonation('');
        setDonorType('');
        setProfilePicture(null);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex">
        <DonorSidebar />
       
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm border-gray">
                <div className="card-header bg-light-green text-white text-center">
                  <h2 className="font-large font-['Elephant'] text-pastel-green" >Premium Donor Registration</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="latitude" className="form-label">Latitude</label>
                      <input type="text" className="form-control" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="longitude" className="form-label">Longitude</label>
                      <input type="text" className="form-control" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="availabilityTime" className="form-label">Availability Time</label>
                      <input type="text" className="form-control" id="availabilityTime" value={availabilityTime} onChange={(e) => setAvailabilityTime(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="donorHealth" className="form-label">Donor Health</label>
                      <input type="text" className="form-control" id="donorHealth" value={donorHealth} onChange={(e) => setDonorHealth(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="previousDonation" className="form-label">Previous Donation (if any)</label>
                      <input type="text" className="form-control" id="previousDonation" value={previousDonation} onChange={(e) => setPreviousDonation(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="donorType" className="form-label">Donor Type</label>
                      <input type="text" className="form-control" id="donorType" value={donorType} onChange={(e) => setDonorType(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                      <input type="file" className="form-control" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                  </form>
                  {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumDonorRegistration;
