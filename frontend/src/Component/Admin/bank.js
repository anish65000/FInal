// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function BloodBankManagement() {
//   const [bloodBanks, setBloodBanks] = useState([]);
//   const [editableBloodBanks, setEditableBloodBanks] = useState({});

//   useEffect(() => {
//     fetchBloodBanks();
//   }, []);

//   const fetchBloodBanks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/bloodbanks');
//       setBloodBanks(response.data);
//       // Initialize editableBloodBanks state based on the fetched blood banks
//       const initialEditableState = {};
//       response.data.forEach((bloodBank) => {
//         initialEditableState[bloodBank.id] = false;
//       });
//       setEditableBloodBanks(initialEditableState);
//     } catch (error) {
//       console.error('Error fetching blood banks:', error);
//     }
//   };

//   const handleUpdateBloodBank = async (bloodBankId, updatedData) => {
//     try {
//       // Construct the updated data object
//       const updatedBloodBank = {
//         name: updatedData.name,
//         category: updatedData.category,
//         phone: updatedData.phone,
//         district: updatedData.district,
//         email: updatedData.email,
//         address: updatedData.address,
//         latitude: updatedData.latitude,
//         longitude: updatedData.longitude,
//       };
//       await axios.put(`http://localhost:5000/update/bloodbank/${bloodBankId}`, updatedBloodBank);
//       toast.success('Blood bank updated successfully');
//       fetchBloodBanks(); // Refresh blood bank list
//       setEditableBloodBanks({ ...editableBloodBanks, [bloodBankId]: false }); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating blood bank:', error);
//       toast.error('Failed to update blood bank');
//     }
//   };

//   const handleEditClick = (bloodBankId) => {
//     setEditableBloodBanks({ ...editableBloodBanks, [bloodBankId]: true });
//   };

//   const handleCancelEdit = (bloodBankId) => {
//     setEditableBloodBanks({ ...editableBloodBanks, [bloodBankId]: false });
//   };

//   const handleInputChange = (event, field, bloodBankId) => {
//     const updatedData = {
//       ...bloodBanks.find((bloodBank) => bloodBank.id === bloodBankId),
//       [field]: event.target.value,
//     };
//     setBloodBanks(
//       bloodBanks.map((bloodBank) =>
//         bloodBank.id === bloodBankId ? updatedData : bloodBank
//       )
//     );
//   };

//   const handleDeleteBloodBank = async (bloodBankId) => {
//     try {
//       await axios.delete(`http://localhost:5000/bloodbank/${bloodBankId}`);
//       toast.success('Blood bank deleted successfully');
//       fetchBloodBanks(); // Refresh blood bank list
//     } catch (error) {
//       console.error('Error deleting blood bank:', error);
//       toast.error('Failed to delete blood bank');
//     }
//   };

//   return (
//     <div className="container mx-auto bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold mt-5 mb-8 text-center text-red-600">Blood Banks</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {bloodBanks.map((bloodBank) => (
//           <div key={bloodBank.id} className="border p-6 bg-green rounded-lg shadow-md">
//             <p className="mb-4">
//               <strong className="text-gray-600">Name: </strong>
//               {editableBloodBanks[bloodBank.id] ? (
//                 <input
//                   type="text"
//                   value={bloodBank.name}
//                   onChange={(e) => handleInputChange(e, 'name', bloodBank.id)}
//                   className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//               ) : (
//                 <span className="text-gray-800">{bloodBank.name}</span>
//               )}
//             </p>
//           {/* Display blood bank details similar to the donation component */}
// <p className="mb-4">
//   <strong className="text-gray-600">Category: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.category}
//       onChange={(e) => handleInputChange(e, 'category', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.category}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">Phone: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.phone}
//       onChange={(e) => handleInputChange(e, 'phone', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.phone}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">District: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.district}
//       onChange={(e) => handleInputChange(e, 'district', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.district}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">Email: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.email}
//       onChange={(e) => handleInputChange(e, 'email', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.email}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">Address: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.address}
//       onChange={(e) => handleInputChange(e, 'address', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.address}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">Latitude: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.latitude}
//       onChange={(e) => handleInputChange(e, 'latitude', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.latitude}</span>
//   )}
// </p>
// <p className="mb-4">
//   <strong className="text-gray-600">Longitude: </strong>
//   {editableBloodBanks[bloodBank.id] ? (
//     <input
//       type="text"
//       value={bloodBank.longitude}
//       onChange={(e) => handleInputChange(e, 'longitude', bloodBank.id)}
//       className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
//     />
//   ) : (
//     <span className="text-gray-800">{bloodBank.longitude}</span>
//   )}
// </p>



//             {editableBloodBanks[bloodBank.id] ? (
//               <div className="flex items-center justify-end mt-6">
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   onClick={() =>
//                     handleUpdateBloodBank(
//                       bloodBank.id,
//                       bloodBanks.find((bank) => bank.id === bloodBank.id)
//                     )
//                   }
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   onClick={() => handleCancelEdit(bloodBank.id)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center justify-end mt-6">
//                 <button
//                   className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   onClick={() => handleEditClick(bloodBank.id)}
//                 >
//                   Edit
//                 </button>
//                 <Link to={`/bloodbank/${bloodBank.id}`} className="text-blue-600 hover:underline">
//             <button type="button">View Details</button>
//             </Link>
//                 <div className="mb-4">
//                   <button
//                     type="submit"
//                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     {isLoading ? 'Submitting...' : 'Submit'}
//                   </button>
//                   <button
//   className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
//   onClick={() => handleDeleteBloodBank(bloodBank.id)}
// >
//   Delete
// </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default BloodBankManagement;
