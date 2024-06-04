import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

const ViewDonorComponent = () => {
  const [donorStockList, setDonorStockList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchDonorStock();
  }, [currentPage]);

  const fetchDonorStock = () => {
    axios.get(`http://localhost:5000/login/stf/ds?page=${currentPage}&limit=${itemsPerPage}`)
      .then(response => {
        setDonorStockList(response.data);
      })
      .catch(error => console.error('Error fetching donor stock:', error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(donorStockList.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <StaffSidebar />
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
              </tr>
            </thead>
            <tbody>
              {donorStockList.map((donorStock, index) => (
                <React.Fragment key={donorStock.id || index}>
                  <tr>
                    <td className="text-center">{donorStock.donor_name}</td>
                    <td className="text-center">{donorStock.age}</td>
                    <td className="text-center">{donorStock.address}</td>
                    <td className="text-center">{donorStock.blood_group}</td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="border-b border-gray-300"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 mx-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewDonorComponent;