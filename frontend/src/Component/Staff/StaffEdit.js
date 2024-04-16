import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffEdit = () => {
  const [formData, setFormData] = useState({
    stfName: '',
    stfMail: '',
    stfPhone: '',
    stfAddress: '',
    stfStaffType: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/stfprofile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch staff profile');
        }
        const data = await response.json();
        setFormData(data.userProfile[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStaffProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await fetch('http://localhost:5000/updatestfprofile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('Failed to update staff profile');
      }
      toast.success('Staff profile updated successfully');
      navigate('/staffprofile');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl font-bold text-custom-green mb-4">Edit Staff Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
            <div className="mb-4">
              <label htmlFor="stfName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="stfName"
                name="stfName"
                value={formData.stfName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stfMail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="stfMail"
                name="stfMail"
                value={formData.stfMail}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stfPhone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="stfPhone"
                name="stfPhone"
                value={formData.stfPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stfAddress" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="stfAddress"
                name="stfAddress"
                value={formData.stfAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stfStaffType" className="block text-sm font-medium text-gray-700">
                Staff Type
              </label>
              <input
                type="text"
                id="stfStaffType"
                name="stfStaffType"
                value={formData.stfStaffType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-green focus:ring-custom-green sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/staffprofile')}
                className="mr-4 bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-custom-green text-white font-semibold px-4 py-2 rounded-md focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
          {/* Toast container */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default StaffEdit;
