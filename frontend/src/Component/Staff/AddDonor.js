import React, { useState } from "react";
import axios from "axios";
import Navbar from "./StaffNavbar";
import { toast } from "sonner";
import StaffSidebar from './StaffSidebar';
import DoctorSidebar from '../Doctor/DoctorSidebar';
import { useStaff } from './StaffContext';
import AdminSidebar from '../Admin/AdminSidebar';
import StaffNavbar from "./StaffNavbar";

const AddDonor = () => {
  const [newDonorStock, setNewDonorStock] = useState({
    blood_group: "",
    email: "",
    age: 0,
    address: "",
    donor_name: "",
    phone: "",
    gender: "" 
  });
  const { state } = useStaff();
  const { stfStaffType } = state;

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

  const [error, setError] = useState("");

  const handleInsertDonorStock = () => {
    const { blood_group, email, age, address, donor_name, phone, gender } = newDonorStock;
    if (!blood_group || !email || !age || !address || !donor_name || !phone || !gender) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/login/stf/ds/insert", newDonorStock)
      .then((response) => {
        console.log("Donor stock inserted successfully:", response.data);
        toast.success("Donor added successfully");
        setError("");
        setNewDonorStock({
          blood_group: "",
          email: "",
          age: 0,
          address: "",
          donor_name: "",
          phone: "",
          gender: "" 
        });
      })
      .catch((error) => {
        console.error("Error inserting donor stock:", error);
        setError("Error adding donor. Please try again later.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonorStock({ ...newDonorStock, [name]: value });
  };

  const handleReset = () => {
    setNewDonorStock({
      blood_group: "",
      email: "",
      age: 0,
      address: "",
      donor_name: "",
      phone: "",
      gender: "" 
    });
    setError("");
  };

  return (
    <>
    <StaffNavbar/>
       {getSidebarComponent()}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="hero-content max-w-2xl mx-auto">
          <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">
            Donor Management
          </h1>
          <p className="text-lg md:text-xl">
            <em>Empowering Lives, Saving Futures</em>
          </p>
        </div>
      </div>
      <hr className="border-t border-gray-500 mx-4" />
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex p-10 bg-pl flex-wrap justify-center">
          <div className="w-full sm:w-1/2 p-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="donor_name"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Name:
              </label>
              <input
                type="text"
                name="donor_name"
                value={newDonorStock.donor_name}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="blood_group"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Blood Group:
              </label>
              <select
                name="blood_group"
                value={newDonorStock.blood_group}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              >
                <option value="">Select Blood Group</option>
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
            <div className="flex flex-col mb-4">
              <label
                htmlFor="age"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Age:
              </label>
              <input
                type="number"
                name="age"
                value={newDonorStock.age}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="address"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={newDonorStock.address}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={newDonorStock.email}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              />
            </div>
            <div className="flex flex-col mb-4">
  <label
    htmlFor="gender"
    className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
  >
    Gender:
  </label>
  <select
    name="gender"
    value={newDonorStock.gender}
    onChange={handleChange}
    className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="phone"
                className="font-bold text-red hover:text-gray transition duration-400 ease-in-out"
              >
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={newDonorStock.phone}
                onChange={handleChange}
                className="mt-6 py-2 px-6 border rounded-md text-sm leading-5 text-gray focus:outline-none focus:border-red-500 focus:ring focus:ring-red"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 mb-8">
          <button
            type="submit"
            onClick={handleInsertDonorStock}
            className="bg-red text-white px-10 py-2 rounded-md hover:bg-red focus:outline-none focus:ring focus:bg-yellow mr-4"
          >
            Add Donor
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-green text-gray-800 px-8 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDonor;
