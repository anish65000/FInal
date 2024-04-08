import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from '../Staff/doctorsidebar';

const BloodDonationForm = () => {
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [slotId, setSlotId] = useState('');
  const [unit, setUnit] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setUserId(queryParams.get('userId'));
    setSlotId(queryParams.get('slotId'));
    fetchAvailableSlots(); // Fetch available slots when component mounts
  }, [location.search]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:5000/availableslots');
      setAvailableSlots(response.data);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Failed to fetch available slots');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userId || !slotTime || !slotId || !unit || !bloodGroup) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (unit <= 0) {
      toast.error("Unit must be greater than zero.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/blooddonated',
        {
          userId,
          slot_time: slotTime,
          slot_id: slotId,
          unit,
          blood_group: bloodGroup,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Handle successful submission
      toast.success("Donation successful!");
      // Clear form after successful submission
      setSlotTime('');
      setUnit('');
      setBloodGroup('');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Internal Server Error');
    }
  };

  return (
    <>
      <StaffNavbar />
      <DoctorSidebar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Blood Donation Appointment Form</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6">
          <div className="mb-4">
            <label htmlFor="userId" className="block font-bold mb-2">
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              readOnly
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slotTime" className="block font-bold mb-2">
              Slot Time:
            </label>
            <select
              id="slotTime"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Slot Time</option>
              {availableSlots.map((slot) => (
                <option key={slot.id} value={slot.slot_time}>{slot.slot_time}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="unit" className="block font-bold mb-2">
              Unit:
            </label>
            <input
              type="number"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block font-bold mb-2">
              Blood Group:
            </label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </>
  );
};

export default BloodDonationForm;