import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './Usercontext';
import LoginImage from '../../Assest/img/LoginPage.png';
import Navbar from '../Navbar';

function LoginPage() {
  const navigate = useNavigate();
  const { login, state: { isLoggedIn } } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user-home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const { token, userData } = await response.json();
        localStorage.setItem('token', token);
        login(userData.userRole, userData.username, userData);
        navigate('/user-home');
        toast.success('Login successful!');
      } else {
        throw new Error('Invalid credentials! Please check your username and password.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <>
      <Navbar />
      <ToastContainer/>
      <div className="bg-white h-screen flex flex-col items-center justify-center p-30">
        <div className="bg-nav-gray w-96 p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <img src={LoginImage} alt="Login" width="100" height="100" className="rounded-full shadow-md mb-6" />
          </div>
          <h1 className="text-3xl font-medium text-center mb-6">Login </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block border border-gray-200 w-full p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block border border-gray-200 w-full p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between my-4">
              <a href="#forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="bg-red text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
              Login
            </button>
            <div className="flex justify-between my-4">
              <a href="/register" className="text-sm text-blue-600 hover:underline">
                Click here if you don't have an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
