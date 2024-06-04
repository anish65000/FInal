import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

function ManageCamp() {
  const [donations, setDonations] = useState([]);
  const [editableDonations, setEditableDonations] = useState({});
  const [searchParams, setSearchParams] = useState({
    camp_name: '',
    donor_name: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 9;

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/camp/donations', { params: searchParams });

      setDonations(response.data);
      const cleanedDate = response.data.date.substring(0, 10);
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

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/camp/donations/search', {
        campName: searchParams.camp_name,
        donor_name: searchParams.donor_name
      });
      setDonations(response.data);
      if (response.data.length === 0) {
        toast.info('No donations found');
      }
    } catch (error) {
      console.error('Error searching for donations:', error);
      toast.error('Error searching for donations');
    }
  };

  // Handle update, delete, edit click, and input change functions
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

  // Pagination functions
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

            {/* Search Inputs */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <input
                type="text"
                placeholder="Camp Name"
                value={searchParams.camp_name}
                onChange={(e) => setSearchParams({ ...searchParams, camp_name: e.target.value })}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Donor Name"
                value={searchParams.donor_name}
                onChange={(e) => setSearchParams({ ...searchParams, donor_name: e.target.value })}
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Search
              </button>
            </div>

            {/* Donations List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentDonations.map((donation) => (
                <div key={donation.id} className="border p-6 bg-green rounded-lg shadow-md">
                  <p className="mb-4">
                    <strong className="text-gray-600">Camp Name: </strong>
                    {editableDonations[donation.id] ? (
                      <input
                        type="text"
                        value={donation.campName}
                        onChange={(e) => handleInputChange(e, 'campName', donation.id)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    ) : (
                      <span className="text-gray-800">{donation.campName}</span>
                    )}
                  </p>
                  <p className="mb-4">
                    <strong className="text-gray-600">Donor Name: </strong>
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
                    <strong className="text-gray-600">Blood Group: </strong>
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
                    <strong className="text-gray-600">Donation Time: </strong>
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
                    <strong className="text-gray-600">Blood Unit: </strong>
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
                  <div className="flex justify-end">
                    {editableDonations[donation.id] ? (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleUpdateDonation(donation.id, donation)}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleCancelEdit(donation.id)}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditClick(donation.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDonation(donation.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav aria-label="Pagination">
                <ul className="list-style-none flex">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <li key={page} className={`mx-1 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-md`}>
                      <button onClick={() => paginate(page)}>{page}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCamp;
