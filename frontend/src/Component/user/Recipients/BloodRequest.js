import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../Usercontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../UserNavbar';
import UserSidebar from './UserSidebar';

const BloodRequestForm = () => {
  const { state: { userRole }, logout } = useUser();
  const [bloodGroup, setBloodGroup] = useState('');
  const [unit, setUnit] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientContact, setPatientContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (userRole !== 'Recipient') {
        toast.error('Permission denied. Only recipients can request blood.');
        return;
      }

      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/login/stf/request',
        {
          bloodGroup,
          unit,
          patientName,
          patientAddress,
          patientContact
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log(response.data);
      if (response.data.status === "REQUEST_HELD") {
        toast.warning('Blood request held. A request with the same patient name and blood group already exists.');
      } else if (response.data.status === "INSUFFICIENT_STOCKS") {
        toast.error('Insufficient stocks. Blood request cannot be fulfilled.');
      } else if (response.data.status === "PERMISSION_DENIED") {
        toast.error('Permission denied. User is not a recipient.');
      } else {
        toast.success('Blood request submitted successfully!');
      }
    } catch (error) {
      console.error('Error requesting blood:', error);
      
      if (error.response.status === 401) {
        logout();
      }

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <UserNavbar/>
      <div className="flex">
        <UserSidebar />
        <div className="max-w-xl mx-auto mt-10 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center py-4 bg-gray-200 rounded-t-lg">Blood Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray">Blood Group:</label>
                <select id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray">Unit (ml):</label>
                <input type="number" id="unit" min="1" value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">Patient Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray">Patient Name:</label>
                <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
              <div>
                <label htmlFor="patientAddress" className="block text-sm font-medium text-gray">Patient Address:</label>
                <textarea id="patientAddress" value={patientAddress} onChange={(e) => setPatientAddress(e.target.value)} className="w-full rounded-md border border-gray-300 py-2 px-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"></textarea>
              </div>
              <div>
                <label htmlFor="patientContact" className="block text-sm font-medium text-gray">Patient Contact:</label>
                <input type="tel" id="patientContact" value={patientContact} onChange={(e) => setPatientContact(e.target.value)} className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
            </div>
            <button type="submit" className="bg-green hover:bg-green-dark text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Submit</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default BloodRequestForm;
