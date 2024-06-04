import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { useUser } from "../Usercontext";
import { Home, Person2, Logout, Inventory, SupervisorAccount } from "@mui/icons-material";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const { logout, state: { isLoggedIn, userRole, username } } = useUser();

 
  return (
    <aside className="bg-pastel-green text-gray min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <div className="text-center">
            <h5 className="text-2xl pl-8 pr-8 text-14 font-normal font-['Elephant'] text-gray hover:text-nav-gray" target="_blank">
              Donor
            </h5>
          </div>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/" className="flex items-center text-gray">
                <Home className="mr-2" />
                <span>Home</span>
              </Link>
            </div>
          </li>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/slots" className="flex items-center text-gray">
                <FaMoneyBillWave className="mr-2" />
                <span>Get Slots </span>
              </Link>
            </div>
          </li>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/bloodappointment" className="flex items-center text-gray">
                <Inventory className="mr-2" />
                <span>Booking Appointment</span>
              </Link>
            </div>
          </li>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/bloodbank" className="flex items-center text-gray">
                <SupervisorAccount className="mr-2" />
                <span> Bank</span>
              </Link>
            </div>
          </li>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/DonationRequests" className="flex items-center text-gray">
                <SupervisorAccount className="mr-2" />
                <span>Donor Request</span>
              </Link>
            </div>
          </li>
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-custom-green">
              <Link to="/DonationHistory" className="flex items-center text-gray">
                <Person2 className="mr-2" />
                <span>Blood Request History</span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DonorSidebar;