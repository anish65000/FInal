import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rider from '../../Assest/img/Riderblood.png';
import { useRider } from './RiderContext'; // Import useRider hook from RiderContext

const RiderLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { login } = useRider(); // Access login function from RiderContext
  const navigate = useNavigate(); // Access navigation function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/rider/login', formData);
      const { token, riderName, bloodType } = res.data;
      localStorage.setItem('token', token); // Store token in localStorage
      localStorage.setItem('riderName', riderName); // Store rider name
      localStorage.setItem('bloodType', bloodType); // Store blood type
      login(riderName, bloodType); // Use login function from RiderContext
      toast.success('Login Successful'); // Show success toast
      navigate('/riderhomepage'); // Redirect to /riderhomepage
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Invalid credentials'); // Show error toast
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-md rounded px-8 py-8 bg-white">
        <ToastContainer />
        <div className="mb-6 text-center">
          <img className="mx-auto h-24 rounded-full border border-gray-300" src={Rider} alt="Login" />
          <h2 className="mt-3 text-xl text-gray-800 font-bold">Blood Bank Rider Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="username" className="form-label text-gray-700">Username</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="username" name="username" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password" className="form-label text-gray-700">Password</label>
            <input type="password" className="form-control border border-gray-300 rounded px-3 py-2" id="password" name="password" onChange={handleChange} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">Login</button>
          </div>
        </form>
        <div className="flex justify-between my-4">
            <a href="/register/rider" className="text-sm text-blue-600 hover:underline">
              Click here if you don't have an account
            </a>
          </div>
      </div>
    </div>
  );
};

export default RiderLogin;
