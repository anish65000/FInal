import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from './DoctorSidebar';

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-appointment/${appointmentId}`);
        setAppointment(response.data.appointment);
        setConfirmationStatus(response.data.appointment.confirmed);
      } catch (err) {
        setError('Appointment not found');
      }
    };
    fetchAppointmentDetails();
  }, [appointmentId]);

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (!appointment) {
    return <p className="text-gray-500 text-center mt-8">Loading...</p>;
  }

  return (
    <>
      <StaffNavbar />
      <DoctorSidebar />
      <div className="flex justify-center">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 py-4 px-6 bg-gradient-to-r from-green to-red border-b border-gray-200">
            Appointment Details
          </h2>
          <div className="p-6 bg-green">
            <div className="mb-4">
              <span className="font-bold text-gray-700">User Name:</span> {appointment.user_name}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Staff ID:</span> {appointment.stf_id}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">User ID:</span> {appointment.user_id}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Slot Time:</span> {new Date(appointment.slot_time).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
