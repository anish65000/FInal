import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStaff } from './StaffContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestHistory from '../../Assest/img/RequestHistory.png';
import StaffNavbar from './StaffNavbar';
import StaffHomepage from './StaffHomePage';
import StaffSidebar from './StaffSidebar';

const BloodRequestHistory = () => {
  const { state } = useStaff();
  const { stfStaffType, isLoggedIn } = state;
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/login/stf/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data); // Ensure each item in response.data has a request_id property
    } catch (error) {
      console.error('Error fetching blood request history:', error);
      toast.error('Error fetching blood request history');
    }
  };

  const handleDelete = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found.');
      }
  
      const response = await axios.delete(`http://localhost:5000/login/stf/request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        // If deletion is successful, fetch updated history
        fetchHistory();
        toast.success('Blood request deleted successfully.');
      } else {
        throw new Error('Failed to delete blood request.');
      }
    } catch (error) {
      console.error('Error deleting blood request:', error);
      toast.error('Error deleting blood request.');
    }
  };
  
  
  useEffect(() => {
    if (isLoggedIn && (stfStaffType === 'Admin' || stfStaffType === 'Staff')) {
      fetchHistory();
    }
  }, [isLoggedIn, stfStaffType]);

  return (
    <>
      <StaffNavbar/>
      <div className="container-fluid">
        <div className="row">
          <StaffSidebar/>

          <div className="col-md-13"> 
          <div className="container px-2 pb-18"> 


              <h2 className="text-center text-3xl font-bold mb-8">Blood Request History</h2>

              <div className="flex justify-start mt-8">
                <img
                  src={RequestHistory}
                  alt="Importance of Blood Donation"
                  className="w-48 h-48 object-cover rounded-md shadow-md mr-4"
                />
                <p className="text-lg leading-7">
                  Donating blood saves lives. Every unit of blood can help up to three
                  people in need. Please consider donating blood today and make a
                  difference!
                </p>
              </div>

              {isLoggedIn && (stfStaffType === 'Staff' || stfStaffType === 'Admin') ? (
                <>
                  {history.length > 0 ? (
                    <table className="table-auto w-full rounded-md shadow-md overflow-hidden">
                      <thead className="bg-teal-400">
                        <tr>
                          <th className="px-4 py-2 text-left text-black font-medium">Blood Group</th>
                          <th className="px-4 py-2 text-left text-black font-medium">Units Requested</th>
                          <th className="px-4 py-2 text-left text-black font-medium">Patient Name</th>
                          <th className="px-4 py-2 text-left text-black font-medium">Patient Address</th>
                          <th className="px-4 py-2 text-left text-black font-medium">Patient Contact</th>
                          <th className="px-4 py-2 text-left text-black font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {history.map(request => (
                          <tr key={request.request_id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 text-left text-black">{request.blood_group}</td>
                            <td className="px-4 py-2 text-left text-black">{request.unit}</td>
                            <td className="px-4 py-2 text-left text-black">{request.patient_name}</td>
                            <td className="px-4 py-2 text-left text-black">{request.patient_address}</td>
                            <td className="px-4 py-2 text-left text-black">{request.patient_contact}</td>
                            <td className="px-4 py-2 text-left">
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center text-gray-500 mb-4">No blood requests found.</div>
                  )}
                </>
              ) : (
                <p className="text-center text-lg mt-8">You do not have permission to view this page.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  

export default BloodRequestHistory;
