import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaffSidebar from '../Staff/StaffSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const ManageBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [editingBloodBankId, setEditingBloodBankId] = useState(null);

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bloodbanks');
      setBloodBanks(response.data);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
      toast.error('An error occurred while fetching blood banks');
    }
  };

  const handleUpdateBloodBank = async (id) => {
    const bloodBankToUpdate = bloodBanks.find(item => item.id === id);
    if (!bloodBankToUpdate) {
      console.error('Blood bank not found for updating.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/update/bloodbank/${id}`, {
        name: bloodBankToUpdate.name,
        category: bloodBankToUpdate.category,
        phone: bloodBankToUpdate.phone,
        district: bloodBankToUpdate.district,
        email: bloodBankToUpdate.email,
        address: bloodBankToUpdate.address,
        latitude: bloodBankToUpdate.latitude,
        longitude: bloodBankToUpdate.longitude
      });

      console.log('Blood bank updated successfully:', response.data);
      await fetchBloodBanks();
      setEditingBloodBankId(null);
      toast.success('Blood bank updated successfully');
    } catch (error) {
      console.error('Error updating blood bank:', error);
      toast.error('An error occurred while updating blood bank');
    }
  };

  const handleEditBloodBank = (id) => {
    setEditingBloodBankId(id);
  };

  const handleDeleteBloodBank = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/bloodbank/${id}`);
      console.log('Blood bank deleted successfully:', response.data);
      setBloodBanks(prevBloodBanks => prevBloodBanks.filter(bloodBank => bloodBank.id !== id));
      toast.success('Blood bank deleted successfully');
    } catch (error) {
      console.error('Error deleting blood bank:', error);
      toast.error('An error occurred while deleting blood bank');
    }
  };


  return (
    
       <div className="home bg-pro-white flex flex-col flex-grow ">
      <StaffSidebar />
      <div className="flex flex-col flex-grow">
        <StaffNavbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4"></div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Manage Blood Banks
      </h2>
      </div>
      
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg table-auto">
          <thead>
            <tr className="bg-green text-left text-sm font-medium uppercase tracking-wider">
              <th className="py-4 px-6 border border-gray">Name</th>
              <th className="py-4 px-6 border border-gray">Category</th>
              <th className="py-4 px-6 border border-gray">Phone</th>
              <th className="py-4 px-6 border border-gray">District</th>
              <th className="py-4 px-6 border border-gray">Email</th>
              <th className="py-4 px-6 border border-gray">Address</th>
              <th className="py-4 px-6 border border-gray">Latitude</th>
              <th className="py-4 px-6 border border-gray">Longitude</th>
              <th className="py-4 px-6 border border-gray">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodBanks.map((bloodBank) => (
              <tr key={bloodBank.id}>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.name}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, name: e.target.value } : item))}
                  /> : bloodBank.name}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.category}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, category: e.target.value } : item))}
                  /> : bloodBank.category}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.phone}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, phone: e.target.value } : item))}
                  /> : bloodBank.phone}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.district}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, district: e.target.value } : item))}
                  /> : bloodBank.district}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.email}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, email: e.target.value } : item))}
                  /> : bloodBank.email}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.address}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, address: e.target.value } : item))}
                  /> : bloodBank.address}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.latitude}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, latitude: e.target.value } : item))}
                  /> : bloodBank.latitude}</td>
                <td>{editingBloodBankId === bloodBank.id ?
                  <input
                    type="text"
                    value={bloodBank.longitude}
                    onChange={(e) => setBloodBanks(prevBloodBanks =>
                      prevBloodBanks.map(item =>
                        item.id === bloodBank.id ? { ...item, longitude: e.target.value } : item))}
                  /> : bloodBank.longitude}</td>
                <td>
                  {editingBloodBankId === bloodBank.id ? (
                    <button className="text-blue-600" onClick={() => handleUpdateBloodBank(bloodBank.id)}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button className="text-blue-600 mr-2" onClick={() => handleEditBloodBank(bloodBank.id)}>
                        Edit
                      </button>
                      <button className="text-red-600" onClick={() => handleDeleteBloodBank(bloodBank.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
}

export default ManageBloodBanks;
