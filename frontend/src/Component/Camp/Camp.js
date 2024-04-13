import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

function ManageCamp() {
  const [donations, setDonations] = useState([]);
  const [editableDonations, setEditableDonations] = useState({});

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/camp/donations');
      setDonations(response.data);
      // Initialize editableDonations state based on the fetched donations
      const initialEditableState = {};
      response.data.forEach((donation) => {
        initialEditableState[donation.id] = false;
      });
      setEditableDonations(initialEditableState);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };



  const handleUpdateDonation = async (donationId, updatedData) => {
    try {
      // Construct the updated data object
      const updatedDonation = {
        donorName: updatedData.donor_name,
        bloodGroup: updatedData.blood_group,
        donationTime: updatedData.donation_time,
        bloodUnit: updatedData.blood_unit
      };
      await axios.put(`http://localhost:5000/camp/donations/${donationId}`, updatedDonation);
      toast.success('Blood donation updated successfully');
      fetchDonations(); // Refresh donation list
      setEditableDonations({ ...editableDonations, [donationId]: false }); // Exit edit mode
    } catch (error) {
      console.error('Error updating donation:', error);
      toast.error('Failed to update blood donation');
    }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`http://localhost:5000/camp/donations/${donationId}`);
      toast.success('Blood donation deleted successfully');
      fetchDonations(); // Refresh donation list
    } catch (error) {
      console.error('Error deleting donation:', error);
      toast.error('Failed to delete blood donation');
    }
  };

  const handleEditClick = (donationId) => {
    setEditableDonations({ ...editableDonations, [donationId]: true });
  };

  const handleCancelEdit = (donationId) => {
    setEditableDonations({ ...editableDonations, [donationId]: false });
  };

  const handleInputChange = (event, field, donationId) => {
    const updatedData = {
      ...donations.find((donation) => donation.id === donationId),
      [field]: event.target.value,
    };
    setDonations(
      donations.map((donation) =>
        donation.id === donationId ? updatedData : donation
      )
    );
  };

  
   
    return (
      <div className="">
         <ToastContainer />
    <div className="home bg-pro-white flex flex-col flex-grow ">
   <StaffSidebar />
   <div className="flex flex-col flex-grow">
     <StaffNavbar />
     <div className="container mx-auto p-4">
       <div className="flex items-center justify-between mb-4"></div>
   
       <h1 className="text-4xl font-bold mt-5 mb-8 text-center text-red-600">Camp Blood Donations</h1>
   </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {donations.map((donation) => (
            <div key={donation.id} className="border p-6 bg-green rounded-lg shadow-md">
              <p className="mb-4">
                <strong className="text-gray-600">Donor Name:  </strong>
                {editableDonations[donation.id] ? (
                  <input
                    type="text"
                    value={donation.donor_name}
                    onChange={(e) => handleInputChange(e, 'donor_name', donation.id)}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <span className="text-gray-800">{donation.donor_name}</span>
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-600">Blood Group:  </strong>
                {editableDonations[donation.id] ? (
                  <input
                    type="text"
                    value={donation.blood_group}
                    onChange={(e) => handleInputChange(e, 'blood_group', donation.id)}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <span className="text-gray-800">{donation.blood_group}</span>
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-600">Date: </strong>
                {editableDonations[donation.id] ? (
                  <input
                    type="text"
                    value={donation.donation_date}
                    onChange={(e) => handleInputChange(e, 'donation_date', donation.id)}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <span className="text-gray-800">{donation.donation_date}</span>
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-600">Time: </strong>
                {editableDonations[donation.id] ? (
                  <input
                    type="text"
                    value={donation.donation_time}
                    onChange={(e) => handleInputChange(e, 'donation_time', donation.id)}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <span className="text-gray-800">{donation.donation_time}</span>
                )}
              </p>
              <p className="mb-4">
                <strong className="text-gray-600">Unit: </strong>
                {editableDonations[donation.id] ? (
                  <input
                    type="text"
                    value={donation.blood_unit}
                    onChange={(e) => handleInputChange(e, 'blood_unit', donation.id)}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ) : (
                  <span className="text-gray-800">{donation.blood_unit}</span>
                )}
              </p>
              {editableDonations[donation.id] ? (
                <div className="flex items-center justify-end mt-6">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onClick={() =>
                      handleUpdateDonation(
                        donation.id,
                        donations.find((don) => don.id === donation.id)
                      )
                    }
                  >
                    Save
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => handleCancelEdit(donation.id)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-end mt-6">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => handleEditClick(donation.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onClick={() => handleDeleteDonation(donation.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
      </div></div>
    );
              }

export default ManageCamp;
