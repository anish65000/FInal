import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

import registerImage from '../../Assest/img/Register.png';

function StaffRegistration() {
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    stafftype: ''
  });
  
  // State variable to store the selected image file
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('avatar', avatar); // Append the image file to the form data
      formData.append('stfName', staff.name);
      formData.append('stfEmail', staff.email);
      formData.append('stfPhone', staff.phone);
      formData.append('stfAddress', staff.address);
      formData.append('stfUserName', staff.username);
      formData.append('stfPassword', staff.password);
      formData.append('stfStaffType', staff.stafftype);

      const response = await fetch("http://localhost:5000/reg/stf", {
        method: "POST",
        body: formData // Send form data including the image file
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during staff registration:", error);
      toast.error("Internal Server Error");
    }
  };
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/staff/login');
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file); // Store the selected image file
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 text-center">
            <img className="mx-auto h-32" src={registerImage} alt="Register" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">User Registration</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfName">
                Name
              </label>
              <input
                type="text"
                id="stfName"
                value={staff.name}
                onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                required
                className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Add input field for image file selection */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="avatar">
                Profile Picture
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleImageChange} // Call handleImageChange function on file selection
                className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
              />
            </div>

           {/* Remaining form fields */}
<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfEmail">
    Email
  </label>
  <input
    type="email"
    id="stfEmail"
    value={staff.email}
    onChange={(e) => setStaff({ ...staff, email: e.target.value })}
    required
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
  />
</div>

<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfPhone">
    Phone
  </label>
  <input
    type="text"
    id="stfPhone"
    value={staff.phone}
    onChange={(e) => setStaff({ ...staff, phone: e.target.value })}
    required
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
  />
</div>

<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfAddress">
    Address
  </label>
  <input
    type="text"
    id="stfAddress"
    value={staff.address}
    onChange={(e) => setStaff({ ...staff, address: e.target.value })}
    required
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
  />
</div>

<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfUserName">
    Username
  </label>
  <input
    type="text"
    id="stfUserName"
    value={staff.username}
    onChange={(e) => setStaff({ ...staff, username: e.target.value })}
    required
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
  />
</div>

<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="stfPassword">
    Password
  </label>
  <input
    type="password"
    id="stfPassword"
    value={staff.password}
    onChange={(e) => setStaff({ ...staff, password: e.target.value })}
    required
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
  />
</div>

<div className="mb-4">
  <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="userRole">
    Staff Role
  </label>
  <select
    className="w-full px-2 py-1 border rounded-md bg-gray-100 text-sm focus:outline-none focus:shadow-outline"
    id="userRole"
    value={staff.stafftype}
    onChange={(e) => setStaff({ ...staff, stafftype: e.target.value })}
  >
    <option value="">Select</option>
    <option value="Staff">Staff</option>
    <option value="Doctor">Doctor</option>
    <option value="Rider">Rider</option>
    <option value="Admin">Admin</option>
  </select>
</div>


            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
            
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <button onClick={handleSignUpClick}>
                Sign In
              </button>
            </p>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default StaffRegistration;
