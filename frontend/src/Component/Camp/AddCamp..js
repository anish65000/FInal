import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterCamp = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    address: '',
    district: '',
    organizer: '',
    bankId: '',
    contact: '',
    startTime: '',
    endTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/reg-camp', formData);
      if (response.status === 200) {
        setSuccess(response.data.message);
        toast.success(response.data.message);
        setFormData({
          name: '',
          date: '',
          address: '',
          district: '',
          organizer: '',
          bankId: '',
          contact: '',
          startTime: '',
          endTime: ''
        });
      }
    } catch (error) {
      setError(error.response.data.error || 'Internal Server Error');
      toast.error(error.response.data.error || 'Internal Server Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="text-2xl font-bold text-custom-green">Register Camp</h3>
      </div>
      <hr className="border-t border-gray-500 mx-4" />

      <form onSubmit={handleSubmit} className="space-y-4 w-full p-10">
        <div className="flex flex-wrap justify-center w-full">
          <div className="w-full sm:w-1/2 p-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
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
              <label htmlFor="date" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="address" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
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
              <label htmlFor="district" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
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
              <label htmlFor="organizer" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                Organizer
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 p-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="bankId" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                Bank ID
              </label>
              <input
                type="text"
                id="bankId"
                name="bankId"
                value={formData.bankId}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="contact" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="startTime" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                Start Time
              </label>
              <input
                type="text"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="endTime" className="font-bold text-pastel-green hover:text-custom-green transition duration-300 ease-in-out">
                End Time
              </label>
              <input
                type="text"
                id="endTime"
                name="endTime"
                value={formData.endTime}
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
  );
};

export default RegisterCamp;