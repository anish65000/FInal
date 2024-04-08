import React, { useState } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useStaff } from '../Staff/StaffContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from '../Staff/doctorsidebar';
import timeslotImage from '../../Assest/img/time.png';

const AvailableSlotsForm = () => {
  const { state, logout } = useStaff();
  const { stfStaffType } = state;
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleAddSlot = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!selectedDateTime) {
        toast.error('Please select a date and time for the slot.');
        return;
      }
  
      if (stfStaffType !== 'Doctor') {
        toast.error('Invalid STF Staff Type. Only "doctor" is allowed.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:5000/stf/availableslots',
        { slot_times: [selectedDateTime] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(response.data);
  
      toast.success('Slots added successfully');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Invalid STF Staff Type. Only "doctor" is allowed.'
      ) {
        toast.error('Invalid STF Staff Type. Only "doctor" is allowed.');
      } else {
        console.error(error);
        toast.error('An error occurred. Please try again later.');
      }
    }
  };
  

  const handleChange = (moment) => {
    setSelectedDateTime(moment.format());
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
    <StaffNavbar />
      <DoctorSidebar />
    <div className="flex">
      <div className="flex flex-col flex-grow">
        
      </div>
      
      <div className="flex justify-center">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4">Add Available Slots</h1>
          <div className="flex justify-center mb-4">
            <img src={timeslotImage} alt="timeslotImage" className="w-50 h-50" />
          </div>
          <div className="bg-lightblue rounded shadow overflow-hidden p-17 mb-4">
            <p className="text-gray text-center">
              A time slot typically refers to a specific period of time allocated for a particular activity, event, or
              task. In various contexts, time slots can be used to schedule appointments, meetings, reservations, or
              any other time-bound activities..
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
    </div>
    </>
  );
};

export default AvailableSlotsForm;
