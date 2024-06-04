import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';
import DoctorSidebar from '../Doctor/DoctorSidebar';
import { useStaff } from './StaffContext';
import AdminSidebar from '../Admin/AdminSidebar';

const DonorStockComponent = () => {

  const { state } = useStaff();
  const {  stfStaffType } = state;

  const getSidebarComponent = () => {
    switch (stfStaffType) {
      case 'Doctor':
        return <DoctorSidebar />;
      case 'Staff':
        return <StaffSidebar />;
      case 'Admin':
        return <AdminSidebar/>;
      default:
        return null;
    }
  };


  const [donorStockList, setDonorStockList] = useState([]);
  const [editingDonorStockId, setEditingDonorStockId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 10; // Update the value to 10

  useEffect(() => {
    axios.get('http://localhost:5000/login/stf/ds')
      .then(response => {
        setDonorStockList(response.data);
      })
      .catch(error => console.error('Error fetching donor stock:', error));
  }, []);

  const handleUpdateDonorStock = (id) => {
    const donorStockToUpdate = donorStockList.find(item => item.id === id);
    if (!donorStockToUpdate) {
      console.error('Donor stock not found for updating.');
      return;
    }

    axios.put('http://localhost:5000/login/stf/ds/update', {
      donor_id: id,
      donor_name: donorStockToUpdate.donor_name,
      blood_group: donorStockToUpdate.blood_group,
      unitUpdate: donorStockToUpdate.unit,
      age: donorStockToUpdate.age,
      address: donorStockToUpdate.address,
    })
      .then(response => {
        console.log('Donor stock updated successfully:', response.data);
        axios.get('http://localhost:5000/login/stf/ds')
          .then(response => {
            setDonorStockList(response.data);
            setEditingDonorStockId(null);
            const newDonorStockListLength = response.data.length;
            const totalPages = Math.ceil(newDonorStockListLength / donorsPerPage);
            if (currentPage > totalPages) {
              setCurrentPage(totalPages);
            }
          })
          .catch(error => console.error('Error fetching updated donor stock data:', error));
      })
      .catch(error => console.error('Error updating donor stock:', error));
  };

  const handleEditDonorStock = (id) => {
    setEditingDonorStockId(id);
  };

  const handleDeleteDonorStock = id => {
    axios.delete(`http://localhost:5000/login/stf/ds/delete/${id}`)
      .then(response => {
        console.log('Donor stock deleted successfully:', response.data);
        const newDonorStockList = donorStockList.filter(item => item.id !== id);
        setDonorStockList(newDonorStockList);
        const totalPages = Math.ceil(newDonorStockList.length / donorsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      })
      .catch(error => console.error('Error deleting donor stock:', error));
  };

  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donorStockList.slice(indexOfFirstDonor, indexOfLastDonor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      {getSidebarComponent()}
      <div className="container mx-auto p-4 text-lg">
        <h1 className="text-4xl font-bold mb-4">Donor Stock Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-green to-red text-white text-left text-sm font-medium uppercase tracking-wider">
                <th className="py-4 px-6 border border-gray rounded-tl-lg">Donor Name</th>
                <th className="py-4 px-6 border border-gray">Age</th>
                <th className="py-4 px-6 border border-gray">Address</th>
                <th className="py-4 px-6 border border-gray">Blood Group</th>
                <th className="py-4 px-6 border border-gray- rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDonors.map((donorStock, index) => (
                <React.Fragment key={donorStock.id || index}>
                  <tr>
                    <td className="text-center">{donorStock.donor_name}</td>
                    <td className="text-center">
                      {editingDonorStockId === donorStock.id ? (
                        <input
                          type="number"
                          value={donorStock.age}
                          onChange={(e) => setDonorStockList(prevList =>
                            prevList.map(item => (item.id === donorStock.id ? { ...item, age: Number(e.target.value) } : item))
                          )}
                        />
                      ) : (
                        donorStock.age
                      )}
                    </td>
                    <td className="text-center">
                      {editingDonorStockId === donorStock.id ? (
                        <input
                          type="text"
                          value={donorStock.address}
                          onChange={(e) => setDonorStockList(prevList =>
                            prevList.map(item => (item.id === donorStock.id ? { ...item, address: e.target.value } : item))
                          )}
                        />
                      ) : (
                        donorStock.address
                      )}
                    </td>
                    <td className="text-center">{donorStock.blood_group}</td>
                    <td className="text-center">
                      {editingDonorStockId === donorStock.id ? (
                        <button className="text-blue-600" onClick={() => handleUpdateDonorStock(donorStock.id)}>
                          Save
                        </button>
                      ) : (
                        <>
                          <button className="text-blue-600 mr-2" onClick={() => handleEditDonorStock(donorStock.id)}>
                            Edit
                          </button>
                          <button className="text-red-600" onClick={() => handleDeleteDonorStock(donorStock.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="border-b border-gray-300"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(donorStockList.length / donorsPerPage) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              className={`px-3 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-green text-white' : 'bg-green'}`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default DonorStockComponent;