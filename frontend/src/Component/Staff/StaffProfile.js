import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffProfile = () => {
  const [staffProfile, setStaffProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/stfprofile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch staff profile');
        }
        const data = await response.json();
        // Access the first element of the userProfile array
        setStaffProfile(data.userProfile[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!staffProfile) {
    return <p>No staff profile found</p>;
  }

  return (
    <>
      <div className="flex">
        <div className="px-6 flex flex-col items-center justify-between">
          <div className="flex items-center justify-between mb-4 pt-4">
            <h2 className="text-xl text-center font-bold font-['Elephant'] text-custom-green">STAFF PROFILE</h2>
          </div>

          <div className="grid grid-cols-8 bg-nav-gray gap-10">
            <div className="col-span-1 justify-center">
              <div className="mb-2 text-center font-medium font-['Elephant'] text-custom-green">Profile Picture</div>
              <div className="profile-picture-container rounded-full overflow-hidden">
              <img
  src={`http://localhost:5000/profile-pictures/${staffProfile.avatar}`}
  alt={`${staffProfile.stfName}'s profile`}
  className="profile-picture w-400 h-300 object-cover"
  onError={(e) => console.error('Error loading image:', e)}
/>

              </div>
            </div>

            <div className="col-span-4 p-20">
              <p className="text-base font-semibold mb-1">Basic Information</p>
              <p>ID: {staffProfile.id}</p>
              <p>Name: {staffProfile.stfName}</p>
              <p>Email: {staffProfile.stfMail}</p>
              <p>Phone: {staffProfile.stfPhone}</p>
              <p>Address: {staffProfile.stfAddress}</p>
              <p>Staff Type: {staffProfile.stfStaffType}</p>
            </div>
          </div>

          {/* Include ToastContainer to display toasts */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default StaffProfile;
