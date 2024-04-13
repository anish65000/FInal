import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

const DonorStockComponent = () => {
  const [donorStockList, setDonorStockList] = useState([]);
  const [newDonorStock, setNewDonorStock] = useState({
    blood_group: '',
    unit: 0,
    age: 0,
    address: '',
    donor_name: '',
  });

  const [editingDonorStockId, setEditingDonorStockId] = useState(null);

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
          })
          .catch(error => console.error('Error fetching updated donor stock data:', error));
      })
      .catch(error => console.error('Error updating donor stock:', error));
  };

  const handleEditDonorStock = (id) => {
    setEditingDonorStockId(id);
  };

  const handleInsertDonorStock = () => {
    if (newDonorStock.unit === 0 || newDonorStock.age === 0) {
      alert('Unit and Age must be greater than 0.');
      return;
    }

    setDonorStockList(prevList => [...prevList, newDonorStock]);
    setNewDonorStock({
      blood_group: '',
      unit: 0,
      age: 0,
      address: '',
      donor_name: '',
    });
  };

  const handleDeleteDonorStock = id => {
    axios.delete(`http://localhost:5000/login/stf/ds/delete/${id}`)
      .then(response => {
        console.log('Donor stock deleted successfully:', response.data);
        setDonorStockList(prevList => prevList.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting donor stock:', error));
  };

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
                <th className="py-4 px-6 border border-gray- rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {donorStockList.map((donorStock, index) => (
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
                          &nbsp;
                          <button className="text-red-600" onClick={() => handleDeleteDonorStock(donorStock.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="border-b border-gray-300"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DonorStockComponent;