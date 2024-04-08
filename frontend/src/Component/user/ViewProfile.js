import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumDonorProfile = () => {
  const [premiumDonor, setPremiumDonor] = useState(null);
  const [forbiddenAccess, setForbiddenAccess] = useState(false);
  const [error, setError] = useState(null); // Add error state

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
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setForbiddenAccess(true);
        } else {
          setError("The user is not associated with the premium donor feature. Please register as a premium donor if you want to become one."); // Set error state
          console.error("Error fetching premium donor details:", error);
        }
      }
    };

    fetchPremiumDonorDetails();
  }, []);

  if (forbiddenAccess) {
    return <div>Access forbidden. Only premium donors can access this page.</div>;
  }

  if (error) {
    return <div className="text-red text-lg">{error}</div>; // Styled error message
  }

  if (!premiumDonor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="main-body">
          <div className="flex flex-row flex-wrap justify-center">
            {/* Left column for profile */}
            <div className="w-full md:w-1/4 pt-4">
             
            </div>
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
                        value={`${premiumDonor.userName} (${premiumDonor.userAge})`}
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
                        htmlFor="donor_type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Donor Type
                      </label>
                      <textarea
                        value={premiumDonor.donor_type}
                        className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pastel-green disabled"
                        rows="3"
                        
                      />
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

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDonorProfile;