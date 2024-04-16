import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import DonorSidebar from "./Donor/Donorsidebar";

const PremiumDonorProfile = () => {
  const [premiumDonor, setPremiumDonor] = useState(null);
  const [forbiddenAccess, setForbiddenAccess] = useState(false);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // State for edit mode

  useEffect(() => {
    const fetchPremiumDonorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/premiumdonors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPremiumDonor(response.data.premium_donor);
        setAvailability(response.data.premium_donor.availability); // Set availability from fetched data
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setForbiddenAccess(true);
        } else {
          setError("The user is not associated with the premium donor feature. Please register as a premium donor if you want to become one.");
          console.error("Error fetching premium donor details:", error);
        }
      }
    };

    fetchPremiumDonorDetails();
  }, []);

  const handleAvailabilityChange = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:5000/premiumdonors",
        { availability: availability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditMode(false); // Exit edit mode after successful update
      // Optionally, you can update the premium donor details here as well
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  if (forbiddenAccess) {
    return <div>Access forbidden. Only premium donors can access this page.</div>;
  }

  if (error) {
    return <div className="text-red text-lg">{error}</div>;
  }

  if (!premiumDonor) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <UserNavbar />
      <div className="flex">
        <DonorSidebar />
        <div className="container mx-auto">
          <div className="main-body">
            <div className="flex flex-row flex-wrap justify-center">
              {/* Left column for profile */}
              <div className="w-full md:w-1/4 pt-4"></div>
              {/* Right column for profile details */}
              <div className="right w-full md:w-2/3 pl-20 mt-4 flex flex-col justify-start bg-white-gray rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                  <div className="max-w-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-bold mb-2 text-custom-green">
                        Donor Profile
                      </h4>
                    </div>
                    <hr className="my-2 border-gray-600" />
                    <div className="mt-4 space-y-4">
                      <div className="mb-4">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          value={`${premiumDonor.userName} `}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <input
                          type="text"
                          value={premiumDonor.userGender}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-sm font-medium text-gray"
                        >
                          Blood Group
                        </label>
                        <input
                          type="text"
                          value={premiumDonor.userBloodGroup}
                          className="mt-1 p-2 w-full border-gray rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          value={premiumDonor.userPhone}
                          className="mt-1 p-2 w-full border-gray rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={premiumDonor.userEmail}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <textarea
                          value={premiumDonor.userAddress}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          rows="3"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 md:mt-0">
                    <div className="mb-4">
                      <img
                        src={`http://localhost:5000${premiumDonor.profile_picture}`}
                        alt="Profile"
                        className="w-40 h-auto"
                      />
                      <label
                        htmlFor=""
                        className="block text-sm font-medium text-gray"
                      >
                        {premiumDonor.userName}
                      </label>
                    </div>
                    
                    <div className="mb-4">
                      <label
                        htmlFor="donor_health"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Donor Health
                      </label>
                      <textarea
                        value={premiumDonor.donor_health}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                        rows="3"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        previous_dontaion
                      </label>
                      <textarea
                        value={premiumDonor.previous_dontaion}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                        rows="3"
                        disabled
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="availability"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Availability
                      </label>
                      {isEditMode ? (
                        <select
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green"
                        >
                          <option value="available">Available</option>
                          <option value="not_available">NotAvailable</option>
                        </select>
                      ) : (
                        <textarea
                          value={availability}
                          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                          rows="3"
                          disabled
                        />
                      )}
                      {/* Render edit button only when not in edit mode */}
                      {!isEditMode && (
                        <button
                          onClick={() => setIsEditMode(true)}
                          className="mt-2 bg-pastel-green hover:bg-light-green text-white font-bold py-2 px-4 rounded"
                        >
                          Edit Availability
                        </button>
                      )}
                      {/* Render save button only when in edit mode */}
                      {isEditMode && (
                        <button
                          onClick={handleAvailabilityChange}
                          className="mt-2 bg-pastel-green hover:bg-light-green text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumDonorProfile;
