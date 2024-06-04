import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../UserNavbar';
import DonorSidebar from './Donorsidebar';

const BookBloodAppointmentForm = () => {
  const [staffName, setStaffName] = useState('');
  const [userName, setUserName] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [staffNames, setStaffNames] = useState([]);

  useEffect(() => {
    const fetchStaffNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/staffnames');
        setStaffNames(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch staff names");
      }
    };
    fetchStaffNames();
  }, []);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/availableslots', {
          params: { staff_name: staffName }
        });
        setAvailableSlots(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch available slots");
      }
    };
    if (staffName) {
      fetchAvailableSlots();
    }
  }, [staffName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSlot = availableSlots.find(slot => slot.slot_time === slotTime);

    if (!selectedSlot) {
      toast.error('Sorry, this slot is not available.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/book-appointment', {
        stf_id: selectedSlot.stf_id,
        user_name: userName,
        slot_time: selectedSlot.slot_time,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success(response.data.message);
    } catch (err) {
      toast.error('An error occurred while booking the appointment.');
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex">
        <DonorSidebar />
        <div className="w-full max-w-md mx-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="staffName" className="block text-gray-700 font-bold mb-2">
                  Staff Name
                </label>
                <select
                  id="staffName"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Staff Name</option>
                  {staffNames.map((staff) => (
                    <option key={staff.staff_name} value={staff.staff_name}>
                      {staff.staff_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter user name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="slotTime" className="block text-gray-700 font-bold mb-2">
                  Slot Time
                </label>
                <select
                  id="slotTime"
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Slot Time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.id} value={slot.slot_time}>
                      {slot.slot_time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookBloodAppointmentForm;
