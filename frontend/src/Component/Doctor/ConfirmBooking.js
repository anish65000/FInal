import React, { useState } from 'react';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from '../Staff/doctorsidebar';

const ConfirmBooking = () => {
  const [formData, setFormData] = useState({
    userId: '',
    slot_time: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/confirm-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to confirm booking');
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage('Internal Server Error');
    }
  };

  return (
    <>
      <StaffNavbar />
     
        <DoctorSidebar />
        <div className="container mx-auto">
  <div className="main-body">
    <div className="flex flex-wrap justify-center">
      {/* Left column for profile */}
      <div className="w-full md:w-2/4 px-2 pt-8 ">
        <div className="card bg-white-gray py-2 px-4 shadow-md rounded-md h-[700px]">
          <h2 className="text-2xl  px-20 mb-4">Confirm Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='py-2 px-4' > {/* Adjusted padding here */}
              <label className="block">User ID:</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div className='py-2 px-4'> {/* Adjusted padding here */}
              <label className="block">Slot Time:</label>
              <input
                type="text"
                name="slot_time"
                value={formData.slot_time}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                style={{ fontSize: '16px' }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-30 mt-6 rounded-md"
            >
              Confirm Booking
            </button>
          </form>
          <p className="mt-4">{message}</p>
        </div>
      </div>
    </div>
  </div>
</div>

      
    </>
  );
};

export default ConfirmBooking;
