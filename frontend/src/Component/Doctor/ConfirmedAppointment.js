import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import StaffNavbar from '../Staff/StaffNavbar';
import DoctorSidebar from './DoctorSidebar';

const ConfirmedAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-confirmed-appointment/${appointmentId}`);
        if (response.data && response.data.appointment) {
          const slotTime = new Date(response.data.appointment.slot_time);
          const formattedSlotTime = `${slotTime.getFullYear()}-${(slotTime.getMonth() + 1).toString().padStart(2, '0')}-${slotTime.getDate().toString().padStart(2, '0')} ${slotTime.getHours().toString().padStart(2, '0')}:${slotTime.getMinutes().toString().padStart(2, '0')}:${slotTime.getSeconds().toString().padStart(2, '0')}`;
          response.data.appointment.slot_time = formattedSlotTime;
          setAppointmentDetails(response.data.appointment);
        } else {
          setError('Invalid appointment details received');
        }
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Internal Server Error');
      }
    };
    fetchAppointmentDetails();
  }, [appointmentId]);

  const handleMarkAsDonated = () => {
    if (!isValidSlotTime(appointmentDetails.slot_time)) {
      setError('Invalid slot time');
      return;
    }

    const slotTimeString = new Date(appointmentDetails.slot_time).toISOString();
    navigate(`/AppointBlood?userId=${appointmentDetails.user_id}&slotTime=${slotTimeString}&slotId=${appointmentDetails.slot_id}`);
  };

  const isValidSlotTime = (slotTime) => {
    return !isNaN(new Date(slotTime).getTime());
  };

  return (
    <>
      <StaffNavbar />
      <DoctorSidebar />
      <div className="flex justify-center">
        <div className="w-1/2">
          {error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 py-4 px-6 bg-gradient-to-r from-red to-green border-b border-gray-200">
                Confirmed Appointment Details
              </h2>
              <div className="p-6 bg-blue-100">
                <p className="text-lg font-medium text-gray">Name: {appointmentDetails.user_name}</p>
                <p className="text-base text-gray-600">Slot: {appointmentDetails.slot_time}</p>
                <p className="text-sm text-gray-600">Staff ID: {appointmentDetails.stf_id}</p>
                <p className="text-sm text-gray-600">User ID: {appointmentDetails.user_id}</p>
                <p className="text-sm text-gray-600">User Age: {appointmentDetails.user_age}</p>
                <p className="text-sm text-gray-600">User Phone: {appointmentDetails.user_phone}</p>
                <button
                  className="bg-green hover:bg-red text-white font-bold py-2 px-4 mt-4 rounded"
                  onClick={handleMarkAsDonated}
                >
                  Mark as Donated
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmedAppointment;
