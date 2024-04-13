import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './Usercontext.js';
import UserNavbar from './UserNavbar.js';
import DonorSidebar from './Donor/Donorsidebar.js';

const DonationForm = () => {
  const { state: { userRole } } = useUser();
  const [formData, setFormData] = useState({
    bankId: '', // Change to bankId
    name: '',
    age: '',
    gender: '', 
    bloodGroup: '',
    units: '',
    disease: '',
    reason: '',
    date:'',
    status: 'pending'
  });
  const [bloodBanks, setBloodBanks] = useState([]);
  
  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bloodbanks');
      setBloodBanks(response.data);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized: Token missing');
      }
  
      if (formData.units <= 0) {
        return toast.error('Units must be a positive number');
      }
  
      // Create a new object with the correct field names
      const donationData = {
        bank_id: formData.bankId,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        blood_group: formData.bloodGroup,
        units: formData.units,
        date : formData.date,
        disease: formData.disease,
        reason: formData.reason,
        status: formData.status,
      };
  
      await axios.post('http://localhost:5000/donation', donationData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      toast.success('Donation successful');
      // Optionally, reset the form after successful submission
      setFormData({
        bankId: '',
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        units: '',
        disease: '',
        
        reason: '',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Token missing or invalid format');
      } else {
        toast.error('An error occurred while submitting the donation.');
      }
    }
  };
  return (
    <>
    <UserNavbar />
    <div className="flex">
      <DonorSidebar />
      <div className="max-w-xl mx-auto mt-10 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center py-4 bg-blue-500 text-white rounded-t-lg">Blood Donation Form</h2>
        {userRole === 'Donor' ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bankId" className="block text-sm font-medium text-gray-700">Blood Bank:</label>
                <select id="bankId" name="bankId" value={formData.bankId} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <option value="">Select Blood Bank</option>
                  {bloodBanks.map(bloodBank => (
                    <option key={bloodBank.id} value={bloodBank.id}>{bloodBank.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name:</label>
                <input type="text" id="name" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                <input type="number" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group:</label>
                <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
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
                <label htmlFor="units" className="block text-sm font-medium text-gray-700">Units of Blood:</label>
                <input type="number" id="units" name="units" placeholder="Units of Blood" value={formData.units} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">Medical Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="disease" className="block text-sm font-medium text-gray-700">Medical Condition:</label>
                <input type="text" id="disease" name="disease" placeholder="Medical Condition" value={formData.disease} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Donation:</label>
                <input type="text" id="reason" name="reason" placeholder="Reason for Donation" value={formData.reason} onChange={handleChange} required className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  readOnly
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 bg-gray-100"
                />
              </div>
            </div>
            <button type="submit" className="bg-green hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Donate</button>
          </form>
        ) : (
          <p className="text-center text-red-600">You are not authorized to access this form.</p>
        )}
        <ToastContainer />
      </div>
    </div>
    </>
  );
};

export default DonationForm;
