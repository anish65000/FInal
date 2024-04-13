import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';

const RecipientsComponent = () => {
  const [recipientStockList, setRecipientStockList] = useState([]);
  const [newRecipientStock, setNewRecipientStock] = useState({
    recipient_name: '',
    blood_group: '',
    email: '',
    age: 0,
    address: '',
    phone: ''
  });

  const [editingRecipientStockId, setEditingRecipientStockId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/login/stf/rs')
      .then(response => {
        setRecipientStockList(response.data);
      })
      .catch(error => console.error('Error fetching recipient stock:', error));
  }, []);

  const handleUpdateRecipientStock = (id, updatedRecipientStock) => {
    axios.put('http://localhost:5000/login/stf/rs/update', {
      recipient_id: id,
      ...updatedRecipientStock
    })
      .then(response => {
        console.log('Recipient stock updated successfully:', response.data);
        axios.get('http://localhost:5000/login/stf/rs')
          .then(response => {
            setRecipientStockList(response.data);
            setEditingRecipientStockId(null);
          })
          .catch(error => console.error('Error fetching updated recipient stock data:', error));
      })
      .catch(error => console.error('Error updating recipient stock:', error));
  };

  const handleEditRecipientStock = (id) => {
    setEditingRecipientStockId(id);
  };

  const handleInsertRecipientStock = () => {
    axios.post('http://localhost:5000/login/stf/rs/insert', newRecipientStock)
      .then(response => {
        console.log('Recipient stock inserted successfully:', response.data);
        setRecipientStockList(prevList => [...prevList, response.data]);
        setNewRecipientStock({
          recipient_name: '',
          blood_group: '',
          email: '',
          age: 0,
          address: '',
          phone: ''
        });
      })
      .catch(error => console.error('Error inserting recipient stock:', error));
  };

  const handleDeleteRecipientStock = id => {
    axios.delete(`http://localhost:5000/login/stf/rs/delete/${id}`)
      .then(response => {
        console.log('Recipient stock deleted successfully:', response.data);
        setRecipientStockList(prevList => prevList.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting recipient stock:', error));
  };

  return (
    <>
      <Navbar />
      <StaffSidebar />
      <div className="container mx-auto p-4 text-lg flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/4">
          <h1 className="text-4xl font-bold mb-4">Recipient Stock Management</h1>
        
          <div className="overflow-x-auto">
            <table className="min-w-full bg-green border border-gray rounded-lg shadow-md text-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3">Recipient Name</th>
                  <th className="px-6 py-3">Blood Group</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Age</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recipientStockList.map((recipientStock, index) => (
                  <tr key={recipientStock.id || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="text"
                          value={recipientStock.recipient_name}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { recipient_name: e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.recipient_name
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="text"
                          value={recipientStock.blood_group}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { blood_group: e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.blood_group
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="email"
                          value={recipientStock.email}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { email: e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.email
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="number"
                          value={recipientStock.age}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { age: parseInt(e.target.value) || 0 })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.age
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="text"
                          value={recipientStock.address}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { address: e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.address
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <input
                          type="text"
                          value={recipientStock.phone}
                          onChange={(e) => handleUpdateRecipientStock(recipientStock.id, { phone: e.target.value })}
                          className="border border-gray-300 px-2 py-1 rounded-md"
                        />
                      ) : (
                        recipientStock.phone
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingRecipientStockId === recipientStock.id ? (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleUpdateRecipientStock(recipientStock.id, recipientStock)}>
                          Save
                        </button>
                      ) : (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1
                        3 rounded" onClick={() => handleEditRecipientStock(recipientStock.id)}>
                        Edit
                        </button>
                        )}
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2" onClick={() => handleDeleteRecipientStock(recipientStock.id)}>
                        Delete
                        </button>
                        </td>
                        </tr>
                        ))}
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </>
                        );
                        };
                        
                        export default RecipientsComponent;