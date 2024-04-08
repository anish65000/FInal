import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStaff } from './StaffContext'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDonation = () => {
  const { state } = useStaff();
  const { stfStaffType, isLoggedIn } = state;
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/donations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast.error('Error fetching donations');
    }
  };

  const handleStatusChange = async (donationId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5000/donation/${donationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to update donation status');
      }

      console.log('Donation Status Update Response:', response.data);

      fetchDonations();
    } catch (error) {
      console.error('Error updating donation status:', error);
      toast.error('Error updating donation status');
    }
  };

  useEffect(() => {
    if (isLoggedIn && (stfStaffType === 'Admin' || stfStaffType === 'Staff')) {
      fetchDonations();
    }
  }, [isLoggedIn, stfStaffType]);

  return (
    <div className="container mx-auto px-4 pb-16">
      <h2 className="text-center text-3xl font-bold mb-8">Manage Donations</h2>

      {isLoggedIn && (stfStaffType === "Staff" || stfStaffType === "Admin") ? (
        <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
          <div className="bg-green py-4 px-6 rounded-lg mb-4">
            <h3 className="text-black font-medium mb-2">Donate Blood - Save Lives!</h3>
            <p className="text-black text-sm">
              We're currently in need of blood donations of all types. Please consider
              donating if you're eligible. Visit our{" "}
              <a href="#" className="text-blue-500">donation page</a> for more information and to schedule an appointment.
            </p>
          </div>

          <ul className="mt-4">
            {donations.map((donation) => (
              <li key={donation.id} className="mb-6">
                <div className="grid grid-cols-2 bg-green">
                  <div className="col-span-1">
                    <strong className="text-primary">Name: {donation.name}</strong>
                    <div className="text-muted mt-1 flex flex-wrap">
                      <span className="mr-20 mb-6">
                        <strong>Age:</strong> {donation.age}
                      </span>
                      <span className="mr-20 mb-2">
                        <strong>Gender:</strong> {donation.gender}
                      </span>
                      <span className="mr-20 mb-2">
                        <strong>Blood Group:</strong> {donation.blood_group}
                      </span>
                      <span className="mb-2">
                        <strong>Units:</strong> {donation.units}
                      </span>
                    </div>
                    <div className="text-muted mt-1 flex flex-wrap">
                      <span className="mr-20 mb-2">
                        <strong>Disease:</strong> {donation.disease || "N/A"}
                      </span>
                      <span className="mr-20 mb-2">
                        <strong>Reason:</strong> {donation.reason || "N/A"}
                      </span>
                      <span className="mb-6">
                        <strong>Date:</strong> {donation.date}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <span className="font-medium bg-red text-dark rounded-full px-2 py-1">
                      Donation status {donation.status}
                    </span>
                    <div className="ml-4">
                      <button
                        onClick={() => handleStatusChange(donation.id, 'approved')}
                        className="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(donation.id, 'declined')}
                        className="bg-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-lg mt-8">
          You do not have permission to view this page.
        </p>
      )}
    </div>
  );
};

export default ViewDonation;
