import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../Usercontext";
import { Home, Inventory, SupervisorAccount, } from "@mui/icons-material";
import {  FaSearchLocation } from "react-icons/fa";

const UserSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [activeMenu, setActiveMenu] = useState(null); // State to manage active menu item
  const navigate = useNavigate();
  const { logout, state: { isLoggedIn, userRole, username } } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (index) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === index ? null : index));
  };

  const handleLogout = () => {
    logout();
    navigate('/user/login');
  };



  return (
    <div>
      <button
        className="custom-menu-button text-green "
        type="button"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} style={{ color: "green" }} />
      </button>

      <div className={`offcanvas offcanvas-start ${sidebarOpen ? "show" : ""}`}>
        <div className="offcanvas-header bg-white">
          <h5 className="text-2xl pl-24 text-14 font-normal  text-custom-green hover:text-custom-green " target="_blank">Nexus Blood care</h5>
          <button  type="button" className="btn-close bg-nav-gray" onClick={toggleSidebar}></button>
        </div>
        <div className="offcanvas-body bg-nav-gray">
          <aside className="bg-pastel-green text-white min-h-screen p-4">
            <nav>
              <ul className="space-y-2">
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(0)}>
                    <Link to="/user-home" className="flex items-center text-white">
                      <Home className="mr-2" />
                      <span>Home</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(1)}>
                    <Link to="/checkcomp" className="flex items-center text-white">
                      <FaMoneyBillWave className="mr-2" />
                      <span>Compatibility</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(2)}>
                    <Link to="/bloodrequest" className="flex items-center text-white">
                      <Inventory className="mr-2" />
                      <span>Blood request</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(3)}>
                    <Link to="/nearbydonor" className="flex items-center text-white">
                      <SupervisorAccount className="mr-2" />
                      <span>Nearby donor</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(4)}>
                    <Link to="/donors" className="flex items-center text-white">
                      <SupervisorAccount className="mr-2" />
                      <span>Donor Request</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(5)}>
                    <Link to="/UrgentRequestsList" className="flex items-center text-white">
                      <SupervisorAccount className="mr-2" />
                      <span>Urgent details </span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(6)}>
                    <Link to="/campserach" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaSearchLocation className="mr-2" />
                      <span>CAMP SEARCH</span>
                    </Link>
                  </div>
                </li>

              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
