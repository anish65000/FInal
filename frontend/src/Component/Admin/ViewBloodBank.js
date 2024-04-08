import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BankDetails() {
  const { id } = useParams();
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bloodbank/${id}`);
      setBankDetails(response.data);
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  if (!bankDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mt-5 mb-8 text-center text-red-600">Bank Details</h1>
      <div className="border p-6 bg-green-100 rounded-lg shadow-md">
        <p className="mb-2"><strong>Name:</strong> {bankDetails.name}</p>
        <p className="mb-2"><strong>Category:</strong> {bankDetails.category}</p>
        <p className="mb-2"><strong>Phone:</strong> {bankDetails.phone}</p>
        <p className="mb-2"><strong>District:</strong> {bankDetails.district}</p>
        <p className="mb-2"><strong>Email:</strong> {bankDetails.email}</p>
        <p className="mb-2"><strong>Address:</strong> {bankDetails.address}</p>
        <p className="mb-2"><strong>Latitude:</strong> {bankDetails.latitude}</p>
        <p className="mb-2"><strong>Longitude:</strong> {bankDetails.longitude}</p>
        {/* You can include additional bank details here */}
      </div>
    </div>
  );
}

export default BankDetails;
