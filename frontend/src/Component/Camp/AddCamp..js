import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

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
  const [bloodBanks, setBloodBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const districtsNepal = [
    'Achham', 'Arghakhanchi', 'Baglung', 'Baitadi', 'Bajhang', 'Bajura', 'Banke', 'Bara', 'Bardiya',
    'Bhaktapur', 'Bhojpur', 'Chitwan', 'Dadeldhura', 'Dailekh', 'Dang', 'Darchula', 'Dhading', 
    'Dhankuta', 'Dhanusha', 'Dolakha', 'Dolpa', 'Doti', 'Gorkha', 'Gulmi', 'Humla', 'Ilam', 
    'Jajarkot', 'Jhapa', 'Jumla', 'Kailali', 'Kalikot', 'Kanchanpur', 'Kapilvastu', 'Kaski', 
    'Kathmandu', 'Kavrepalanchok', 'Khotang', 'Lalitpur', 'Lamjung', 'Mahottari', 'Makwanpur', 
    'Manang', 'Morang', 'Mugu', 'Mustang', 'Myagdi', 'Nawalparasi', 'Nuwakot', 'Okhaldhunga', 
    'Palpa', 'Panchthar', 'Parbat', 'Parsa', 'Pyuthan', 'Ramechhap', 'Rasuwa', 'Rautahat', 
    'Rolpa', 'Rukum', 'Rupandehi', 'Salyan', 'Sankhuwasabha', 'Saptari', 'Sarlahi', 'Sindhuli', 
    'Sindhupalchok', 'Siraha', 'Solukhumbu', 'Sunsari', 'Surkhet', 'Syangja', 'Tanahu', 
    'Taplejung', 'Terhathum', 'Udayapur'
  ];

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
      <div className="home bg-pro-white flex flex-col flex-grow">
        <StaffSidebar />
        <div className="flex flex-col flex-grow">
          <StaffNavbar />
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4"></div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Register Camp
            </h2>
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
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                    required
                  >
                    <option value="">Select District</option>
                    {districtsNepal.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
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
                    Blood Bank
                  </label>
                  <select
                    id="bankId"
                    name="bankId"
                    value={formData.bankId}
                    onChange={handleChange}
                    className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                  >
                    <option value="">Select Blood Bank</option>
                    {bloodBanks.map((bloodBank) => (
                      <option key={bloodBank.id} value={bloodBank.id}>
                        {bloodBank.name}
                      </option>
                    ))}
                  </select>
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
                    type="time"
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
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="mt-1 py-2 px-3 border rounded-md text-sm leading-5 text-gray-700 focus:outline-none focus:border-pastel-green focus:ring focus:ring-pastel-green"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-pastel-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register Camp'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCamp;
