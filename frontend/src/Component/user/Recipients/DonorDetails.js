import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faHeart, 
  faExclamationCircle, 
  faInfoCircle, 
  faIdCard, 
  faHeartbeat, 
  faBirthdayCake 
} from '@fortawesome/free-solid-svg-icons';
import UserSidebar from './UserSidebar';

const PremiumDonorDetails = () => {
  const { id } = useParams();
  const [donorDetails, setDonorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [urgentRequestForm, setUrgentRequestForm] = useState(false);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [timeRequiredInMinutes, setTimeRequiredInMinutes] = useState(30); // Default time required
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorDetails = async () => {
      if (!id) {
        setError('Donor ID is not provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/donors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch donor details');
        }
        const data = await response.json();
        setDonorDetails(data.premium_donor);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorDetails();
  }, [id]);

  const handleRequestBlood = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized: Token missing');
      navigate('/login');
      return;
    }

    setShowRequestForm(true);
  };

  const handleSubmitRequest = async () => {
    if (message.trim() === '') {
      toast.error('Message is required');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/request-blood/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        toast.success('Blood request sent successfully');
        setShowRequestForm(false);
      } else if (response.status === 400) {
        toast.info('You have already requested blood from this donor');
      } else {
        throw new Error('Failed to send blood request');
      }
    } catch (error) {
      toast.error('Failed to send blood request');
    }
  };

  const handleUrgentRequest = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized: Token missing');
      navigate('/login');
      return;
    }

    setUrgentRequestForm(true);
  };

  const handleSubmitUrgentRequest = async () => {
    if (message.trim() === '' || location.trim() === '' || !timeRequiredInMinutes) {
      toast.error('All fields are required');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/urgentrequest/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, timeRequiredInMinutes, location }),
      });

      if (response.ok) {
        toast.success('Urgent blood request sent successfully');
        setUrgentRequestForm(false);
      } else if (response.status === 400) {
        toast.info('You have already sent an urgent request to this donor');
      } else if (response.status === 404) {
        toast.error('Donor is not available, please try another donor');
      } else {
        throw new Error('Failed to send urgent blood request');
      }
    } catch (error) {
      toast.error('Failed to send urgent blood request');
    }
  };

  if (!id) {
    return <p>Error: Donor ID is not provided</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <UserNavbar />
      <div className="flex">
        <UserSidebar />
        <ToastContainer />
        <div className="px-6 flex flex-col items-center justify-between w-full">
          <div className="flex items-center justify-between mb-4 pt-4 w-full">
            <h2 className="text-xl text-center font-bold text-custom-green">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              DONOR DETAILS
            </h2>
          </div>

          <div className="grid grid-cols-8 bg-nav-gray rounded-lg shadow-md p-8 gap-8 w-full">
            <div className="col-span-2 flex flex-col items-center justify-center">
              <div className="mb-2 text-center font-medium text-custom-green">Profile Picture</div>
              <div className="profile-picture-container rounded-full overflow-hidden">
                <img
                  src={`http://localhost:5000${donorDetails.profile_picture}`}
                  alt={`${donorDetails.userName}'s profile`}
                  className="profile-picture w-400 h-300 object-cover"
                  onError={(e) => console.error('Error loading image:', e)}
                />
              </div>
            </div>

            <div className="col-span-6 flex flex-col gap-4">
              <p className="text-lg font-semibold">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Basic Information
              </p>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                  <span className="font-semibold">ID:</span> {donorDetails.premium_donor_id}
                </p>
                <p>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span className="font-semibold">Name:</span> {donorDetails.userName}
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <span className="font-semibold">Email:</span> {donorDetails.userEmail}
                </p>
                <p>
                  <FontAwesomeIcon icon={faHeartbeat} className="mr-2" />
                  <span className="font-semibold">Blood Type:</span> {donorDetails.userBloodGroup}
                </p>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                  <span className="font-semibold">Age:</span> {donorDetails.userAge}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              className="bg-pastel-green hover:bg-green-500 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out" 
              onClick={handleRequestBlood}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Request Blood
            </button>

            <button 
              className="bg-pastel-green hover:bg-green-500 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out" 
              onClick={handleUrgentRequest}
            >
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              Request Blood Urgently
            </button>
          </div>

          {showRequestForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md">
                <h3 className="text-xl font-bold mb-4">Request Blood</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 border-gray-300 rounded-md resize-none mb-4"
                  placeholder="Enter your message for blood request..."
                  required
                />
                <div className="flex justify-end">
                  <button onClick={() => setShowRequestForm(false)} className="text-gray-600 mr-4">Cancel</button>
                  <button onClick={handleSubmitRequest} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                </div>
              </div>
            </div>
          )}

          {urgentRequestForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md">
                <h3 className="text-xl font-bold mb-4">Request Blood Urgently</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 border-gray-300 rounded-md resize-none mb-4"
                  placeholder="Enter your message for urgent blood request..."
                  required
                />
                <input
                  type="number"
                  value={timeRequiredInMinutes}
                  onChange={(e) => setTimeRequiredInMinutes(e.target.value)}
                  className="w-full border-gray-300 rounded-md mb-4"
                  placeholder="Enter time required in minutes"
                  required
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-md mb-4"
                  placeholder="Enter location"
                  required
                />
                <div className="flex justify-end">
                  <button onClick={() => setUrgentRequestForm(false)} className="text-gray-600 mr-4">Cancel</button>
                  <button onClick={handleSubmitUrgentRequest} className="bg-red text-white px-4 py-2 rounded-md">Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PremiumDonorDetails;
