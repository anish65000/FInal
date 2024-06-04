import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bloodDonationImg from '../../../Assest/img/RequestHistory.png';
import Navbar from '../UserNavbar';
import DonorSidebar from './Donorsidebar';

const AvailableSlotsComponent = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffNameFilter, setStaffNameFilter] = useState('');
  const slotsPerPage = 5;

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/availableslots', {
          params: { staff_name: staffNameFilter }
        });
        setAvailableSlots(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch available slots");
      }
    };

    fetchAvailableSlots();
  }, [staffNameFilter]);

  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = availableSlots.slice(indexOfFirstSlot, indexOfLastSlot);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="flex">
        <DonorSidebar />
        <div className="w-full max-w-xl p-4 rounded shadow bg-white mx-auto"> {/* Centered the card */}
          <div className="text-center align-center pb-4">
            <h1 className="font-medium text-3xl text-primary mb-4">Available Blood Donation Slots</h1>
            <img src={bloodDonationImg} alt="Blood Donation" className="mx-auto mb-4 w-64 h-auto" />
            <p className="text-gray text-center mb-0">
              Blood donation is a critical process that saves lives. It allows healthy individuals to voluntarily donate their blood, which is then used for transfusions in patients who need it for various medical conditions.
            </p>
          </div>
          <div className="text-center mb-4">
            <input
              type="text"
              placeholder="Filter by Staff Name"
              className="p-2 border rounded"
              value={staffNameFilter}
              onChange={(e) => setStaffNameFilter(e.target.value)}
            />
          </div>
          <ul className="divide-y divide-gray list-none pl-4">
            {currentSlots.map((slot) => (
              <li key={slot.id} className="py-4 flex items-center hover:bg-gray-100">
                <div className="flex-grow">
                  <strong className="text-gray-800 font-medium">Slot Time:</strong> {slot.slot_time}
                </div>
                <div className="ml-4">
                  <strong className="text-gray-800 font-medium">Staff ID:</strong> {slot.stf_id}
                </div>
                <div className="ml-4">
                  <strong className="text-gray-800 font-medium">Staff Type:</strong> {slot.stf_staff_type}
                </div>
                <div className="ml-4">
                  <strong className="text-gray-800 font-medium">Staff Name:</strong> {slot.staff_name}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(availableSlots.length / slotsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded shadow ${
                  currentPage === index + 1 ? 'bg-primary text-white' : 'bg-lightblue text-gray-800'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AvailableSlotsComponent;
