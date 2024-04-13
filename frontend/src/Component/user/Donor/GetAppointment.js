import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../UserNavbar'; // Assuming Navbar component exists in a parent directory
import Sidebar from './Donorsidebar'; // Assuming Sidebar component exists in a parent directory
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Validate token existence before making the API call
        if (!token) {
          console.error('Missing authentication token');
          toast.error('You are not authorized to view appointments.');
          return; // Exit early if token is missing
        }

        const response = await axios.get('http://localhost:5000/appointments/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('An error occurred while fetching appointments.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full justify-center py-8"> {/* Applying justify-center class here */}
          <div className="w-1/2">
            {appointments.length > 0 ? (
              <div className="bg-white rounded shadow overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-800 py-4 px-6 bg-gradient-to-r from-red to-green border-b border-gray-200">
                  Appointments List
                </h2>
                <ul className="divide-y divide-gray bg-lightblue">
                  {appointments.map((appointment, index) => (
                    <li key={index} className="py-4 px-6 hover:bg-green transition duration-200 ease-in-out">
                      <div className="flex justify-between items-center ">
                        <p className="text-lg font-medium text-gray">Doctor: {appointment.doctor_name}</p>
                        <p className="text-base text-gray">Time: {new Date(appointment.time).toLocaleString()}</p>
                        <p className="text-base text-gray">Appointment_id: {appointment.blood_appointment_id}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-red">{error || 'No appointments found'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
