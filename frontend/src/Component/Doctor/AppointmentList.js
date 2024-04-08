import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from '../Staff/doctorsidebar';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-appointments');
        setAppointments(response.data.appointments);
      } catch (err) {
        setError('No appointments found');
      }
    };
    fetchAppointments();
  }, []);

  return (
    <>
    <StaffNavbar />
      <DoctorSidebar />
      <div className="flex justify-center">
        <div className="w-1/2">
      {appointments.length > 0 ? (
        <div className="bg-white rounded shadow overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 py-4 px-6 bg-gradient-to-r from-red to-green border-b border-gray-200">
            Appointments List
          </h2>
          <ul className="divide-y divide-gray  bg-lightblue">
            {appointments.map((appointment, index) => (
              <li key={index} className="py-4 px-6 hover:bg-green transition duration-200 ease-in-out">
                <div className="flex justify-between items-center ">
                  <p className="text-lg font-medium text-gray">{appointment.user_name}</p>
                  <p className="text-base text-gray-600">Slot: {new Date(appointment.slot_time).toLocaleString()}</p>
                </div>
                <div className="mt-2 flex space-x-4 text-gray-600 text-sm">
                  <span>
                    Staff ID: {appointment.stf_id}
                  </span>
                  <span>
                    User ID: {appointment.user_id}
                  </span>
                  <Link
                    to={`/appointment/${appointment.appointment_id}`}
                    className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-500">{error || 'No appointments found'}</p>
      )}
    </div>
    </div>
    </>
  );
};

export default AppointmentList;
