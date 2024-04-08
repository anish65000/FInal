import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginImage from '../../Assest/img/login.jpg';
import { useStaff } from './StaffContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ stfUserName: '', stfPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useStaff();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/Staff/login', credentials);
      
      const { token, staffName, stfStaffType } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('staffName', staffName);
      localStorage.setItem('stfStaffType', stfStaffType);

      login(stfStaffType, staffName, response.data);

      navigate('/staffhomepage');

      toast.success('Login successful', { autoClose: 3000 });
    } catch (error) {
      console.error('Login Error:', error);
      setIsLoading(false);

      toast.error('Login failed. Please check your credentials.', { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-full px-4 bg-white rounded shadow-md">
          <h1 className="text-center text-2xl font-semibold mb-6">Staff Login Form</h1>
          <img
            src={LoginImage}
            alt="Login Image"
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="stfUserName"
              className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="Username"
              value={credentials.stfUserName}
              onChange={handleChange}
            />
            <input
              type="password"
              name="stfPassword"
              className="w-full mt-2 px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              value={credentials.stfPassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mt-4 bg-green text-red rounded justify-center px-4 py-2 transition duration-300 ease-in-out hover:bg-indigo-600"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div className="mt-6 justify-center md:mt-0">
              <div className="text-center">
                Don't have an account? <a href="" className="text-indigo-500">Register here</a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
