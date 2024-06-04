import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStaff } from "../Staff/StaffContext";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaHeart,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Home, Inventory } from "@mui/icons-material";

const DoctorSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [activeMenu, setActiveMenu] = useState(null); // State to manage active menu item
  const navigate = useNavigate();
  const { state: userData, logout, login } = useStaff();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (index) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === index ? null : index));
  };

  const handleLogout = () => {
    logout();
    navigate("/staff/login");
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
          <button  type="button" className="btn-close bg-nav-gray" onClick={toggleSidebar}>
            
          </button>
        </div>
        <div className="offcanvas-body bg-nav-gray">
          <aside className="bg-pastel-green text-white min-h-screen p-4">
            <nav>
              <ul className="space-y-2">
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(0)}>
                    <Link to="/staffhomepage" className="flex items-center text-gray">
                      <Home className="mr-2" />
                      <span>Home</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(1)}>
                    <Link to="/confirmed" className="flex items-center text-gray">
                      <FaHeart className="mr-2" />
                      <span>Confirmed Appointment</span>
                    </Link>
                  </div>
                </li>
              

                <div className="flex items-center justify-between p-2 hover:bg-custom-green text-gray" onClick={() => toggleSubMenu(3)}>
                    <Link to="/Addslots" className="flex items-center text-gray">
                      <Inventory className="mr-2 text-gray" />
                      <span>Add Slots</span>
                    </Link>
                  </div>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green text-gray" onClick={() => toggleSubMenu(4)}>
                    <Link to="/Appointmentslist" className="flex items-cente text-gray">
                      <Inventory className="mr-2 text-gray" />
                      <span>Appointment List</span>
                    </Link>
                  </div>
                  {/* Submenu for Appointment List */}
                  <ul className={`desplegable ml-4 ${activeMenu === 2 ? "" : "hidden"}`}>
                    {/* You can add submenu items here */}
                  </ul>
                </li>
                <li className="opcion-con-desplegable">
                  <div
                    className="flex items-center justify-between p-2 hover:bg-custom-green text-gray"
                    onClick={() => toggleSubMenu(3)}
                  >
                    <Link to="/booking" className="flex items-center text-gray">
                      <FaCalendarAlt className="mr-2 " />
                      <span>Confirm Booking</span>
                    </Link>
                  </div>
                </li>
                
                <li className="opcion-con-desplegable">
                  <div
                    className="flex items-center justify-between p-2 hover:bg-custom-green"
                    onClick={() => toggleSubMenu(5)}
                  >
                    <Link to="/testingblood" className="flex items-center text-gray">
                      <FaFileAlt className="mr-2" />
                      <span>BloodTesting</span>
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

export default DoctorSidebar;
