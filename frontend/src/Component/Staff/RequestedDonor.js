import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DonorDetails() {
  const [donorDetails, setDonorDetails] = useState(null);
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonorDetails();
  }, []);

  const fetchDonorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/donordetails/${requestId}`);
      setDonorDetails(response.data.donorDetails[0]); // Access the first element of the array
    } catch (error) {
      console.error('Error fetching donor details:', error);
    }
  };

  const handleViewLocation = () => {
    // Navigate to the page displaying the donor's location map
    navigate(`/donors/location/${requestId}`);
  };

  if (!donorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Donor Details</h2>
      <p>Latitude: {donorDetails.latitude}</p>
      <p>Longitude: {donorDetails.longitude}</p>
      <p>Availability Time: {donorDetails.availability_time}</p>
      <p>Donor Type: {donorDetails.donor_type}</p>
      <p>Donor Health: {donorDetails.donor_health}</p>
      <p>Previous Donation: {donorDetails.previous_donation}</p>
      <p>User Name: {donorDetails.userName}</p>
      <p>User Phone: {donorDetails.userPhone}</p>
      <p>User Address: {donorDetails.userAddress}</p>
      {/* Add more details as needed */}
      <button onClick={handleViewLocation}> View Location </button>
    </div>
  );
}

export default DonorDetails;
