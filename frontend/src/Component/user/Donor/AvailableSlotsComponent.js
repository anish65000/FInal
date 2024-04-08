import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bloodDonationImg from '../../../Assest/img/RequestHistory.png';
import Navbar from '../UserNavbar';
import DonorSidebar from './Donorsidebar';

const AvailableSlotsComponent = () => {
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/availableslots');
        setAvailableSlots(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
        toast.error("Failed to fetch available slots");
      }
    };

    // Call fetchAvailableSlots only if availableSlots is empty
    if (availableSlots.length === 0) {
      fetchAvailableSlots();
    }
  }, [availableSlots]); // Add availableSlots as a dependency

  return (
    <>
      <Navbar />
      <div className="flex">
        <DonorSidebar />
        <div className="w-full max-w-xl mx-auto"> {/* Adjust max-w-xl for a bigger center div */}
          <div className="text-center">
            <h1 className="font-medium text-3xl text-primary mb-4">
              Available Blood Donation Slots
            </h1>
            <img
              src={bloodDonationImg}
              alt="Blood Donation"
              className="mx-auto mb-4 w-64 h-auto"
            />
            <div className="bg-lightblue rounded shadow p-4 mb-4">
              <p className="text-gray text-center mb-0">
                Blood donation is a critical process that saves lives. It allows healthy individuals to voluntarily donate their blood, which is then used for transfusions in patients who need it for various medical conditions.
              </p>
            </div>
          </div>
          <ul className="divide-y divide-gray bg-pastel-green">
            {availableSlots.map((slot) => (
              <li key={slot.id} className="py-8">
                <div className="flex items-center bg-paleturquoise">
                  <div className="flex-grow">
                    <strong className="text-gray-800 font-medium">Slot Time:</strong> {slot.slot_time}
                  </div>
                  <div className="ml-4">
                    <strong className="text-gray-800 font-medium">Staff ID:</strong> {slot.stf_id}
                  </div>
                  <div className="ml-4">
                    <strong className="text-gray-800 font-medium">Staff Type:</strong> {slot.stf_staff_type}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AvailableSlotsComponent;
