import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './Usercontext';
import LoginImage from '../../Assest/img/LoginPage.png';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        toast('Login successful!', { type: 'success' });
        login(userData.userRole, userData.username, userData);
        navigate('/user-home');
      } else {
        toast('Invalid credentials! Please check your username and password.', { type: 'error' });
      }
    } catch (error) {
      console.error(error);
      toast('An error occurred. Please try again.', { type: 'error' });
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center p-30">
      <img src={LoginImage} alt="Login" width="100" height="100" className="rounded-full shadow-md mb-6" />
      <div className="bg-white w-96 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-medium text-center mb-6">Login</h1>
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
              Click here  if you doesnot have account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;