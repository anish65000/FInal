import React, { useState } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import timeslotImage from '../../Assest/img/time.png';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from './DoctorSidebar';

const AvailableSlotsForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [existingSlots, setExistingSlots] = useState([]);

  const handleAddSlot = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!selectedDateTime) {
        toast.error('Please select a date and time for the slot.');
        return;
      }

      const addResponse = await axios.post(
        'http://localhost:5000/stf/availableslots',
        { slot_times: [selectedDateTime] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if response contains newSlots and update state accordingly
      if (addResponse.data.success) {
        toast.success(addResponse.data.message);
        setExistingSlots([...existingSlots, selectedDateTime]);
      } else {
        toast.error('Failed to add slot.');
      }

    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred while adding the slot.');
      }
    }
  };

  const handleChange = (moment) => {
    setSelectedDateTime(moment.format());
  };

  return (
    <>
      <StaffNavbar />
      <DoctorSidebar />
      <div className="flex justify-center">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4">Add Available Slots</h1>
          <div className="flex justify-center mb-4">
            <img src={timeslotImage} alt="timeslotImage" className="w-50 h-50" />
          </div>
          <div className="bg-lightblue rounded shadow overflow-hidden p-4 mb-4">
            <p className="text-gray text-center">
              A time slot typically refers to a specific period of time allocated for a particular activity, event, or task. In various contexts, time slots can be used to schedule appointments, meetings, reservations, or any other time-bound activities.
            </p>
          </div>
          <Datetime
            inputProps={{
              placeholder: 'Select date and time',
              className:
                'block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500',
            }}
            onChange={handleChange}
          />
          <button
            onClick={handleAddSlot}
            className="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm mt-4"
          >
            Add Slots
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AvailableSlotsForm;
