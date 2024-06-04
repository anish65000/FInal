import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStaff } from '../Staff/StaffContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from '../Staff/StaffNavbar';
import StaffSidebar from '../Staff/StaffSidebar';

const ViewDonation = () => {
  const { state } = useStaff();
  const { stfStaffType, isLoggedIn } = state;
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 10;

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

  // Calculate pagination details
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <StaffNavbar />
      <StaffSidebar />
      <div className="flex justify-center w-full max-w-4xl bg-green rounded-lg shadow-md p-6 mx-auto mt-8">
        <h2 className="text-center text-4xl font-bold mb-8 text-blue-800">Manage Donations</h2>
      </div>

      {isLoggedIn && (stfStaffType === 'Staff' || stfStaffType === 'Admin') ? (
        <div className="flex flex-col w-full max-w-4xl mx-auto mt-4">
          <div className="bg-green py-4 px-6 rounded-lg mb-4 text-white shadow-md">
            <h3 className="text-2xl font-medium mb-2">Donate Blood - Save Lives!</h3>
            <p className="text-lg">
              We're currently in need of blood donations of all types. Please consider
              donating if you're eligible. Visit our{' '}
              <a href="#" className="text-blue-300 hover:text-blue-400 font-medium">
                donation page
              </a>{' '}
              for more information and to schedule an appointment.
            </p>
          </div>

          <ul className="mt-4 space-y-4">
            {currentDonations.map((donation) => (
              <li key={donation.id}>
                <div className="grid grid-cols-2 bg-white rounded-lg shadow-md p-4">
                  <div className="col-span-1">
                    <strong className="text-blue-800 text-lg">{donation.name}</strong>
                    <div className="text-gray-600 mt-2 flex flex-wrap">
                      <span className="mr-6 mb-2">
                        <strong>Age:</strong> {donation.age}
                      </span>
                      <span className="mr-6 mb-2">
                        <strong>Gender:</strong> {donation.gender}
                      </span>
                      <span className="mr-6 mb-2">
                        <strong>Blood Group:</strong> {donation.blood_group}
                      </span>
                      <span className="mb-2">
                        <strong>Units:</strong> {donation.units}
                      </span>
                    </div>
                    <div className="text-gray-600 mt-2 flex flex-wrap">
                      <span className="mr-6 mb-2">
                        <strong>Disease:</strong> {donation.disease || 'N/A'}
                      </span>
                      <span className="mr-6 mb-2">
                        <strong>Reason:</strong> {donation.reason || 'N/A'}
                      </span>
                      <span className="mb-2">
                        <strong>Date:</strong> {donation.date}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <span
                      className={`font-medium rounded-full px-2 py-1 ${
                        donation.status === 'approved' ? 'bg-green text-white' : 'bg-red text-white'
                      }`}
                    >
                      Donation status {donation.status}
                    </span>
                    <div className="ml-4">
                      <button
                        onClick={() => handleStatusChange(donation.id, 'approved')}
                        className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(donation.id, 'declined')}
                        className="bg-red hover:bg-green text-white font-bold py-2 px-4 rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg mt-8 text-gray-700">
          You do not have permission to view this page.
        </p>
      )}
    </>
  );
};

export default ViewDonation;
