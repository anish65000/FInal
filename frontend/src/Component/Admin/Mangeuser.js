import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    userName: '',
    userAge: '',
    userGender: '',
    userBloodGroup: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userRole: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUpdatedUser({
        userName: '',
        userAge: '',
        userGender: '',
        userBloodGroup: '',
        userPhone: '',
        userEmail: '',
        userAddress: '',
        userRole: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Blood Group</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4">{user.id}</td>
              <td className="py-3 px-4">{user.userName}</td>
              <td className="py-3 px-4">{user.userAge}</td>
              <td className="py-3 px-4">{user.userGender}</td>
              <td className="py-3 px-4">{user.userBloodGroup}</td>
              <td className="py-3 px-4">{user.userPhone}</td>
              <td className="py-3 px-4">{user.userEmail}</td>
              <td className="py-3 px-4">{user.userAddress}</td>
              <td className="py-3 px-4">{user.userRole}</td>
              <td className="py-3 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    setUpdatedUser(user);
                    setUserId(user.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {updatedUser && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Update User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser();
            }}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userName"
              >
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                value={updatedUser.userName}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, userName: e.target.value })
                }
              />
            </div>
            <label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userAge"
>
  Age:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userAge"
  type="number"
  value={updatedUser.userAge}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userAge: e.target.value })
  }
/>


<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userPhone"
>
  Phone:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userPhone"
  type="text"
  value={updatedUser.userPhone}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userPhone: e.target.value })
  }
/>
<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userBloodGroup"
>
  Blood Group:
</label>
<select
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userBloodGroup"
  value={updatedUser.userBloodGroup}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userBloodGroup: e.target.value })
  }
>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>

<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userGender"
>
  Gender:
</label>
<select
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userGender"
  value={updatedUser.userGender}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userGender: e.target.value })
  }
>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userEmail"
>
  Email:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userEmail"
  type="email"
  value={updatedUser.userEmail}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userEmail: e.target.value })
  }
/>

<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userAddress"
>
  Address:
</label>
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userAddress"
  type="text"
  value={updatedUser.userAddress}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userAddress: e.target.value })
  }
/>

<label
  className="block text-gray-700 font-bold mb-2"
  htmlFor="userRole"
>
  Role:
</label>
<select
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="userRole"
  value={updatedUser.userRole}
  onChange={(e) =>
    setUpdatedUser({ ...updatedUser, userRole: e.target.value })
  }
>
  <option value="Donor">Donor</option>
  <option value="Recipient">Recipient</option>
  {/* Add more role options if needed */}
</select>


            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
