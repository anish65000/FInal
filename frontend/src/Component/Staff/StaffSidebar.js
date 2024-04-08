import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStaff } from "./StaffContext";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight,
  FaMoneyBillWave,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Home, Person, Logout, Inventory, SupervisorAccount } from "@mui/icons-material";

const StaffSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [activeMenu, setActiveMenu] = useState(null);
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
    navigate("staff/login");
  };

  return (
    <div>
      <button
        className="custom-menu-button text-pastel-green "
        type="button"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} style={{ color: "green" }} />
      </button>

      <div className={`offcanvas offcanvas-start ${sidebarOpen ? "show" : ""}`}>
        <div className="offcanvas-header bg-nav-gray">
          <h5 className="text-2xl pl-24 text-14 font-normal  text-custom-green hover:text-custom-green " target="_blank">Nexus Blood care</h5>
          <button type="button" className="btn-close" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="offcanvas-body bg-nav-gray">
          <aside className="bg-pastel-green text-white min-h-screen p-4">
            <nav>
              <ul className="space-y-2">
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(0)}>
                    <Link to="/" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Home className="mr-2" />
                      <span>Home</span>
                    </Link>
                  </div>
                </li>
                {/* Other menu items */}
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(1)}>
                    <Link to="/request" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Person className="mr-2" />
                      <span>Urgent Request</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(2)}>
                    <Link to="/registercamp" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Inventory className="mr-2" />
                      <span>Camp</span>
                    </Link>
                  </div>

                  {/* Donations */}
                  <li className="opcion-con-desplegable">
                    <div
                      className="flex items-center justify-between p-2 hover:bg-custom-green"
                      onClick={() => toggleSubMenu(1)}
                    >
                      <div className="flex items-center">
                        <FaMoneyBillWave className="mr-2" />
                        <span>Manage Camp</span>
                      </div>
                      <FaChevronDown className="text-xs" />
                    </div>
                    <ul
                      className={`desplegable ml-4 ${
                        activeMenu === 1 ? "" : "hidden"
                      }`}
                    >
                      <li>
                        <Link
                          to="/ManageCamp"
                          className=" p-2 hover:bg-custom-green flex items-center"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <FaChevronRight className="mr-2 text-xs" />
                          Manage Camo
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Add Blood */}
                  <li className="opcion-con-desplegable">
                    <div
                      className="flex items-center justify-between p-2 hover:bg-custom-green"
                      onClick={() => toggleSubMenu(2)}
                    >
                      <Link to="/CampsList" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaCalendarAlt className="mr-2" />
                        <span>View Camp</span>
                      </Link>
                      {/* <FaChevronDown className="text-xs" /> */}
                    </div>
                  </li>

                  {/* View Camp */}
                  <li className="opcion-con-desplegable">
                    <div
                      className="flex items-center justify-between p-2 hover:bg-custom-green"
                      onClick={() => toggleSubMenu(3)}
                    >
                      <Link to="/RegisterBank" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaChartBar className="mr-2" />
                        <span>Bank</span>
                      </Link>
                      {/* <FaChevronDown className="text-xs" /> */}
                    </div>
                  </li>

                  <li className="opcion-con-desplegable">
                    <div
                      className="flex items-center justify-between p-2 hover:bg-custom-green"
                      onClick={() => toggleSubMenu(3)}
                    >
                      <Link to="/manage-bloodbanks" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaChartBar className="mr-2" />
                        <span>Mange Bank</span>
                      </Link>
                      {/* <FaChevronDown className="text-xs" /> */}
                    </div>
                  </li>

                  {/* View Blood Request */}
                  <li className="opcion-con-desplegable">
                    <div
                      className="flex items-center justify-between p-2 hover:bg-custom-green"
                      onClick={() => toggleSubMenu(4)}
                    >
                      <Link to="/staff/view-blood-request" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <FaFileAlt className="mr-2" />
                        <span>View Blood Request</span>
                      </Link>
                      {/* <FaChevronDown className="text-xs" /> */}
                    </div>
                  </li>

                  {/* Profile */}


                </li>

              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StaffSidebar;
