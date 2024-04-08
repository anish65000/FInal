import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rider from '../../Assest/img/Riderblood.png';

const BloodBankRiderRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bloodType: '',
    bikeModel: '',
    licenseNumber: '',
    username: '',
    password: '',
    avatar: null,
    gender: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('bloodType', formData.bloodType);
      formDataToSend.append('bikeModel', formData.bikeModel);
      formDataToSend.append('licenseNumber', formData.licenseNumber);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('avatar', formData.avatar);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('age', formData.age);

      const res = await axios.post('http://localhost:5000/reg/bloodbank-rider', formDataToSend);
      console.log(res.data);
      toast.success('Blood Bank Rider Registered Successfully'); // Show success toast
      // You can handle success response here
    } catch (error) {
      console.error('Error during blood bank rider registration:', error);
      toast.error('Error during blood bank rider registration'); // Show error toast
      // Handle error here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md shadow-md rounded px-8 py-8 bg-lightblue">
        <ToastContainer />
        <div className="mb-6 text-center">
          <img className="mx-auto h-24 rounded-full border border-gray-300" src={Rider} alt="Register" />
          <h2 className="mt-3 text-xl text-gray-800 font-bold">Blood Bank Rider Registration</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="form-label text-gray-700">Name</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="name" name="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="form-label text-gray-700">Email</label>
            <input type="email" className="form-control border border-gray-300 rounded px-3 py-2" id="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="form-label text-gray-700">Phone Number</label>
            <input type="tel" className="form-control border border-gray-300 rounded px-3 py-2" id="phoneNumber" name="phoneNumber" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="bloodType" className="form-label text-gray-700">Blood Type</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="bloodType" name="bloodType" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="bikeModel" className="form-label text-gray-700">Bike Model</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="bikeModel" name="bikeModel" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="licenseNumber" className="form-label text-gray-700">License Number</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="licenseNumber" name="licenseNumber" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="username" className="form-label text-gray-700">Username</label>
            <input type="text" className="form-control border border-gray-300 rounded px-3 py-2" id="username" name="username" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password" className="form-label text-gray-700">Password</label>
            <input type="password" className="form-control border border-gray-300 rounded px-3 py-2" id="password" name="password" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="gender" className="form-label text-gray-700">Gender</label>
            <select className="form-select border border-gray-300 rounded px-3 py-2" id="gender" name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="form-label text-gray-700">Age</label>
            <input type="number" className="form-control border border-gray-300 rounded px-3 py-2" id="age" name="age" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="avatar" className="form-label text-gray-700">Avatar</label>
            <input type="file" className="form-control border border-gray-300 rounded px-3 py-2" id="avatar" name="avatar" onChange={handleFileChange} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodBankRiderRegistration;
