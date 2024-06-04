import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './AdminSidebar';
import StaffNavbar from '../Staff/StaffNavbar';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [updatedStaffData, setUpdatedStaffData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staffs');
      setStaff(response.data.staff);
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = staff.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditStaff = (staffId) => {
    const selectedStaff = staff.find((item) => item.id === staffId);
    setEditingStaff(selectedStaff);
    setUpdatedStaffData(selectedStaff);
  };

  const handleUpdateStaffData = (field, value) => {
    setUpdatedStaffData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleSaveStaffUpdates = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      formData.append('stfName', updatedStaffData.stfName);
      formData.append('stfMail', updatedStaffData.stfMail);
      formData.append('stfPhone', updatedStaffData.stfPhone);
      formData.append('stfAddress', updatedStaffData.stfAddress);
      formData.append('stfStaffType', updatedStaffData.stfStaffType);
   
      

      await axios.put(`http://localhost:5000/staff/edit/${editingStaff.id}`, formData);
      setEditingStaff(null);
      setAvatarFile(null);
      fetchStaff();
    } catch (error) {
      console.error('Error updating staff details:', error);
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${staffId}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  return (
    <div className="home bg-pro-white flex flex-col flex-grow ">
      <StaffNavbar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-custom-green hover:text-green-900">
              MANAGE STAFF
            </h1>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Staff
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Staff Type</th>
                  <th className="px-4 py-2">Avatar</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) =>
                  editingStaff?.id === item.id ? (
                    <tr key={item.id} className="bg-gray-100">
                      <td className="px-4 py-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          type="text"
                          value={updatedStaffData.stfName}
                          onChange={(e) => handleUpdateStaffData('stfName', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          type="email"
                          value={updatedStaffData.stfMail}
                          onChange={(e) => handleUpdateStaffData('stfMail', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          type="text"
                          value={updatedStaffData.stfPhone}
                          onChange={(e) => handleUpdateStaffData('stfPhone', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          type="text"
                          value={updatedStaffData.stfAddress}
                          onChange={(e) => handleUpdateStaffData('stfAddress', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          type="text"
                          value={updatedStaffData.stfStaffType}
                          onChange={(e) => handleUpdateStaffData('stfStaffType', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input className="file:bg-blue-500 file:text-white file:font-bold file:py-2 file:px-4 file:rounded" type="file" onChange={handleAvatarChange} />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveStaffUpdates}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2 font-medium">{item.stfName}</td>
                      <td className="px-4 py-2">{item.stfMail}</td>
                      <td className="px-4 py-2">{item.stfPhone}</td>
                      <td className="px-4 py-2">{item.stfAddress}</td>
                      <td className="px-4 py-2">{item.stfStaffType}</td>
                      <td className="px-4 py-2">
                        <img
                          src={`http://localhost:5000/profile-pictures/${item.avatar}`}
                          alt={`${item.stfName}'s profile`}
                          className="w-12 h-12 object-cover rounded-full"
                          onError={(e) => console.error('Error loading image:', e)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEditStaff(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDeleteStaff(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(staff.length / itemsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
