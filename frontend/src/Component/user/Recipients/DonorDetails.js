import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PremiumDonorDetails = () => {
  const { id } = useParams();
  const [donorDetails, setDonorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [urgentRequestForm, setUrgentRequestForm] = useState(false);
  const [message, setMessage] = useState('');
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
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized: Token missing');
      }

      setShowRequestForm(true);
    } catch (error) {
      console.error('Error:', error);
      navigate('/login');
    }
  };

  const handleSubmitRequest = async () => {
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
        console.log('Request sent successfully');
        toast.success('Blood request sent successfully');
        setShowRequestForm(false);
      } else if (response.status === 400) {
        console.log('Existing blood request found');
        toast.info('You have already requested blood from this donor');
      } else {
        throw new Error('Failed to send blood request');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send blood request');
    }
  };


  const handleUrgentRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized: Token missing');
      }

      setUrgentRequestForm(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send urgent blood request');
    }
  };

  const handleSubmitUrgentRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized: Token missing');
      }

      const response = await fetch(`http://localhost:5000/api/urgentrequest/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, timeRequiredInMinutes }),
      });

      if (response.ok) {
        console.log('Urgent request sent successfully');
        toast.success('Urgent blood request sent successfully');
        setUrgentRequestForm(false);
      } else if (response.status === 400) {
        console.log('Existing urgent request found');
        toast.info('You have already sent an urgent request to this donor');
      } else {
        throw new Error('Failed to send urgent blood request');
      }
    } catch (error) {
      console.error('Error:', error);
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
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Donor Details</h2>
      </div>

      <div className="grid grid-cols-8 bg-green gap-10">
        <div className="col-span-1">
          <div className="mb-2 text-gray-700 font-bold">Profile Picture</div>
          <div className="profile-picture-container rounded-full overflow-hidden">
            <img
              src={`http://localhost:5000${donorDetails.profile_picture}`}
              alt={`${donorDetails.user_name}'s profile`}
              className="profile-picture w-400 h-300 object-cover"
              onError={(e) => console.error('Error loading image:', e)}
            />
          </div>
        </div>

        <div className="col-span-4 p-20">
          <p className="text-base font-semibold mb-1">Basic Information</p>
          <p>ID: {donorDetails.premium_donor_id}</p>
          <p>Name: {donorDetails.userName}</p>
          <p>Email: {donorDetails.userEmail}</p>
          <p>Blood Type: {donorDetails.userBloodGroup}</p>
          <p>Age: {donorDetails.userAge}</p>
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleRequestBlood}>
        Request Blood
      </button>

      <button className="bg-red text-white px-4 py-2 rounded-md mt-4" onClick={handleUrgentRequest}>
        Request Blood Urgently
      </button>

      {showRequestForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-bold mb-4">Request Blood</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 border-gray-300 rounded-md resize-none mb-4"
              placeholder="Enter your message for blood request..."
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
            />
            <input
              type="number"
              value={timeRequiredInMinutes}
              onChange={(e) => setTimeRequiredInMinutes(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-4"
              placeholder="Enter time required in minutes"
            />
            <div className="flex justify-end">
              <button onClick={() => setUrgentRequestForm(false)} className="text-gray mr-4">Cancel</button>
              <button onClick={handleSubmitUrgentRequest} className="bg-red text-white px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Include ToastContainer to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default PremiumDonorDetails;
