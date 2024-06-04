import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffNavbar from '../Staff/StaffNavbar';
import StaffSidebar from '../Staff/StaffSidebar';
import AdminSidebar from './AdminSidebar';

const RegisterBloodBankForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
    district: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    // Show success toast
    toast.success('Blood bank registered successfully!');

    try {
      const response = await fetch('http://localhost:5000/register/bloodbank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('Blood bank registered successfully!');
        setFormData({
          name: '',
          category: '',
          phone: '',
          district: '',
          email: '',
          address: '',
          latitude: '',
          longitude: '',
        });
      }
    } catch (error) {
      console.error('Error registering blood bank:', error);
      setError('An error occurred. Please try again later.');
      // Show error toast
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
       <ToastContainer />
       <div className="home bg-pro-white flex flex-col flex-grow ">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Register Blood Banks
      </h2>
      </div>
      <hr className="border-t border-gray-500 mx-4" />

      <form onSubmit={handleSubmit} className="space-y-4 w-full p-10">
        {/* {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>} */}

        <div className="flex flex-wrap justify-center w-full">
          <div className="w-full sm:w-1/2 p-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="name"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="category"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              >
                <option value="">Select...</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="phone"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="district"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="latitude"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 p-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="address"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="longitude"
                className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out"
              >
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-pastel-green text-white px-8 py-2 rounded-md hover:bg-custom-green focus:outline-none focus:ring focus:ring-pastel-green"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </div></div> 
  );
};

export default RegisterBloodBankForm;