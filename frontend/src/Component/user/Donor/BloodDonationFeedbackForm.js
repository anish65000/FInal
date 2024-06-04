import React, { useState } from 'react';
import Navbar from '../UserNavbar';
import Donorsidebar from './Donorsidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BloodDonationFeedbackForm = ({ onSubmit }) => {
  const [stfId, setStfId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/blooddonationfeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stf_id: stfId, feedback }),
      });

      const data = await response.json();

      if (data.message === 'Feedback submitted successfully') {
        // Handle successful submission
        setStfId('');
        setFeedback('');
        toast.success('Feedback submitted successfully');
      } else {
        // Handle errors
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting feedback');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <div className="flex">
        <Donorsidebar />
        <div className="container mx-auto">
          <div className="main-body">
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-2/4 px-2 pt-8 ">
                <div className="card bg-white-gray py-2 px-4 shadow-md rounded-md h-[700px]">
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <label htmlFor="stfId" className="text-sm font-medium">
                      Staff ID
                    </label>
                    <input
                      type="text"
                      id="stfId"
                      name="stfId"
                      value={stfId}
                      onChange={(e) => setStfId(e.target.value)}
                      className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none w-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="feedback" className="text-sm font-medium">
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                      Submit Feedback
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodDonationFeedbackForm;
