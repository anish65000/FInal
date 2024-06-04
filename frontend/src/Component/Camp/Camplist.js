import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const CampsList = () => {
  const [camps, setCamps] = useState([]);
  const [editCamp, setEditCamp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allCamps');
        setCamps(response.data);
      } catch (error) {
        console.error('Error fetching camps:', error);
        toast.error('Error fetching camps');
      }
    };
    fetchCamps();
  }, []);

  const handleRegisterClick = (campId) => {
    navigate(`/blooddonationform/${campId}`);
  };

  const handleEditClick = (camp) => {
    setEditCamp(camp);
  };

  const handleUpdateCamp = async (updatedCamp) => {
    try {
      await axios.put(`http://localhost:5000/camps/${updatedCamp.campId}`, updatedCamp);
      const updatedCamps = camps.map((camp) =>
        camp.campId === updatedCamp.campId ? updatedCamp : camp
      );
      setCamps(updatedCamps);
      setEditCamp(null);
      toast.success('Camp updated successfully');
    } catch (error) {
      console.error('Error updating camp:', error);
      toast.error('Error updating camp');
    }
  };

  const handleDeleteCamp = async (campId) => {
    try {
      await axios.delete(`http://localhost:5000/camps/${campId}`);
      const updatedCamps = camps.filter((camp) => camp.campId !== campId);
      setCamps(updatedCamps);
      toast.success('Camp deleted successfully');
    } catch (error) {
      console.error('Error deleting camp:', error);
      toast.error('Error deleting camp');
    }
  };

  const handleCancelEdit = () => {
    setEditCamp(null);
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen">
      <StaffSidebar />
      <div className="flex-grow bg-pro-white">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl align-center font-bold text-center text-red">Discover Amazing Camps</h1>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleRegisterClick('newCampId')}
            >
              Add New Camp
            </button>
          </div>
          <ToastContainer />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <div
                key={camp.campId}
                className="bg-green rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                {editCamp && editCamp.campId === camp.campId ? (
                  <div className="p-6 bg-green-100">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">Edit Camp</h2>
                    <input
                      type="text"
                      value={editCamp.name}
                      onChange={(e) => setEditCamp({ ...editCamp, name: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Camp Name"
                    />
                    <input
                      type="text"
                      value={editCamp.date}
                      onChange={(e) => setEditCamp({ ...editCamp, date: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Date"
                    />
                    <input
                      type="text"
                      value={editCamp.address}
                      onChange={(e) => setEditCamp({ ...editCamp, address: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      value={editCamp.district}
                      onChange={(e) => setEditCamp({ ...editCamp, district: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="District"
                    />
                    <input
                      type="text"
                      value={editCamp.organizer}
                      onChange={(e) => setEditCamp({ ...editCamp, organizer: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Organizer"
                    />
                    <input
                      type="text"
                      value={editCamp.contact}
                      onChange={(e) => setEditCamp({ ...editCamp, contact: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Contact"
                    />
                    <input
                      type="text"
                      value={editCamp.startTime}
                      onChange={(e) => setEditCamp({ ...editCamp, startTime: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="Start Time"
                    />
                    <input
                      type="text"
                      value={editCamp.endTime}
                      onChange={(e) => setEditCamp({ ...editCamp, endTime: e.target.value })}
                      className="mb-4 border border-gray-400 rounded-md px-2 py-1 w-full"
                      placeholder="End Time"
                    />
                    <div className="flex justify-end">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleUpdateCamp(editCamp)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2">Camp Name: {camp.name}</h2>
                    <div className="mb-2">
                      <span className="font-bold">Date:</span> {formatDateString(camp.date)}
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">Address:</span> {camp.address}
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">District:</span> {camp.district}
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">Organizer:</span> {camp.organizer}
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">Contact:</span> {camp.contact}
                    </div>
                    <div className="mb-2 font-semibold">
                      <span className="font-bold">Start Time:</span> {camp.startTime} <br />
                      <span className="font-bold">End Time:</span> {camp.endTime}
                    </div>
                  </div>
                )}
                <div className="bg-green-500 text-white px-6 py-4 text-center flex justify-between">
                  {editCamp && editCamp.campId === camp.campId ? (
                    <>
                      <button
                        className="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleUpdateCamp(editCamp)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red hover:bg-yellow text-white font-bold py-2 px-4 rounded"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <button
                          className="bg-yellowX hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleRegisterClick(camp.campId)}
                        >
                          Register Donor
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEditClick(camp)}
                        >
                          Edit
                        </button>
                      </div>
                      <button
                        className="bg-red hover:bg-yellow text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteCamp(camp.campId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampsList;
