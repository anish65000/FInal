import React, { useState, useEffect } from 'react';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from './DoctorSidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

const ConfirmBooking = () => {
  const [formData, setFormData] = useState({
    userId: '',
    slot_time: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
    fetchUsersWithAppointments();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/availableslots');
      setAvailableSlots(response.data);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersWithAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/users-with-appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAvailableUsers(response.data.users);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Failed to fetch users with appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.userId) {
      errors.userId = 'Please select a user';
    }
    if (!formData.slot_time) {
      errors.slot_time = 'Please select a slot time';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/confirm-booking', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success(response.data.message);
        setFormData({
          userId: '',
          slot_time: ''
        });
      } catch (err) {
        console.error(err);
        toast.error('Appointment is already booked, please choose another slot.');
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <StaffNavbar />
      <DoctorSidebar />
      <div className="container mx-auto">
        <div className="main-body">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-2/4 px-2 pt-8">
              <div className="card bg-white-gray py-2 px-4 shadow-md rounded-md h-[700px]">
                <h2 className="text-2xl px-20 mb-4">Confirm Booking</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="py-2 px-4">
                    <label htmlFor="userId" className="block font-bold mb-1">
                      User ID
                    </label>
                    <select
                      id="userId"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className={`border p-2 w-full rounded-md ${formErrors.userId ? 'border-red-500' : ''}`}
                      style={{ fontSize: '16px' }}
                    >
                      <option value="">Select User</option>
                      {availableUsers.map((user) => (
                        <option key={user.id} value={user.id}>{user.userName}</option>
                      ))}
                    </select>
                    {formErrors.userId && <p className="text-red-500 text-sm mt-1">{formErrors.userId}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="slotTime" className="block font-bold mb-1">
                      Slot Time
                    </label>
                    <select
                      id="slotTime"
                      name="slot_time"
                      value={formData.slot_time}
                      onChange={handleChange}
                      className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.slot_time ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select Slot Time</option>
                      {availableSlots.map((slot) => (
                        <option key={slot.id} value={slot.slot_time}>{slot.slot_time}</option>
                      ))}
                    </select>
                    {formErrors.slot_time && <p className="text-red-500 text-sm mt-1">{formErrors.slot_time}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-30 mt-6 rounded-md transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin mr-2" />
                        Confirming...
                      </div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ConfirmBooking;
