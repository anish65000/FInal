import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import registerImage from '../../Assest/img/Register.png';
import { useUser } from './Usercontext'; // Correct import



const UserRegister = () => {
  const { login } = useUser(); // Using the useUser hook to get the login function
 
  const [user, setUser] = useState({
    userName: '',
    userAge: '',
    userGender: '',
    userBloodGroup: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userUserName: '',
    userPassword: '',
    userRole: '',
    userPasswordConfirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
    
  
      if (!user.userName || !user.userPhone || !user.userEmail || !user.userPassword || !user.userPasswordConfirmation || !user.userRole) {
        setError('Please fill in all required fields.');
        return;
      }
  
      // Your registration logic...
      const res = await fetch('http://localhost:5000/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (res.ok) {
      
        login(user.userRole); 

        toast.success('Registration successful!');
        
        setUser({
          userName: '',
          userAge: '',
          userGender: '',
          userBloodGroup: '',
          userPhone: '',
          userEmail: '',
          userAddress: '',
          userUserName: '',
          userPassword: '',
          userRole: '',
          userPasswordConfirmation: ''
        });
        setError(null);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Registration failed');

      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-lightblue">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6 text-center">
            <img className="mx-auto h-32" src={registerImage} alt="Register" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">User Registration</h1>
          {error && (
            <div className="text-red-500 mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Full Name"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userAge">
                Age
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userAge"
                type="number"
                placeholder="Age"
                value={user.userAge}
                onChange={(e) => setUser({ ...user, userAge: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userGender">
                Gender
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userGender"
                value={user.userGender}
                onChange={(e) => setUser({ ...user, userGender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userRole">
                User Role
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userRole"
                value={user.userRole}
                onChange={(e) => setUser({ ...user, userRole: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Donor">Donor</option>
                <option value="Recipient">Recipient</option>
                {/* Add more role options if needed */}
              </select>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userBloodGroup">
                Blood Group
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userBloodGroup"
                value={user.userBloodGroup}
                onChange={(e) => setUser({ ...user, userBloodGroup: e.target.value })}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPhone">
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userPhone"
                type="text"
                placeholder="Phone"
                value={user.userPhone}
                onChange={(e) => setUser({ ...user, userPhone: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userEmail"
                type="email"
                placeholder="Email"
                value={user.userEmail}
                onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userAddress">
                Address
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userAddress"
                placeholder="Address"
                value={user.userAddress}
                onChange={(e) => setUser({ ...user, userAddress: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userUserName">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userUserName"
                type="text"
                placeholder="Username"
                value={user.userUserName}
                onChange={(e) => setUser({ ...user, userUserName: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPassword">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userPassword"
                type="password"
                placeholder="Password"
                value={user.userPassword}
                onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPasswordConfirmation">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userPasswordConfirmation"
                type="password"
                placeholder="Confirm Password"
                value={user.userPasswordConfirmation}
                onChange={(e) => setUser({ ...user, userPasswordConfirmation: e.target.value })}
              />
            </div>
  
            <div className="mb-4 col-span-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full col-span-2 mt-4"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
            <div className="flex justify-between my-4">
            <a href="/user/login" className="text-sm text-blue-600 hover:underline">
              login here
            </a>
          </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </div>
    </div>
  </>
  
  );
};

export default UserRegister;
