import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/appointments/${patientId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [patientId]);

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="grid grid-cols-2 gap-4">
        {appointments.map((appointment, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <p className="text-lg font-semibold">{appointment.doctor_name}</p>
            <p className="text-sm text-gray-500">{appointment.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;