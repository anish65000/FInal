import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Person, Inventory, ManageHistory, BloodtypeRounded } from "@mui/icons-material";
import { FaCalendarAlt, FaChartBar, FaUserAstronaut, FaPlusSquare, FaAmbulance, FaPeopleArrows } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const StaffSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMenu = (index) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === index ? null : index));
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
          <button type="button" className="btn-close" onClick={toggleSidebar}></button>
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
                      <ManageHistory className="mr-2" />
                      <span>Add Camp</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(3)}>
                    <Link to="/ManageCamp" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Inventory className="mr-2" />
                      <span>Camp</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(4)}>
                    <Link to="/CampsList" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaCalendarAlt className="mr-2" />
                      <span>View Camp</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(5)}>
                    <Link to="/RegisterBank" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaChartBar className="mr-2" />
                      <span>Bank</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(6)}>
                    <Link to="/manage-bloodbanks" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaChartBar className="mr-2" />
                      <span>Manage Bank</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(7)}>
                    <Link to="/BloodRequestHistory" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Person className="mr-2" />
                      <span>Blood Request History</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(8)}>
                    <Link to="/managedonation" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <BloodtypeRounded className="mr-2" />
                      <span>Manage donation</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(9)}>
                    <Link to="/RecipientsComponent" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaUserAstronaut className="mr-2" />
                      <span>Manage Recipients</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(10)}>
                    <Link to="/AddRecipients" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaPlusSquare className="mr-2" />
                      <span>Add Recipients</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(11)}>
                    <Link to="/ManageUsers" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaPlusSquare className="mr-2" />
                      <span>Manage User</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(12)}>
                    <Link to="/ManageStaffs" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaPeopleArrows className="mr-2" />
                      <span>Manage staff</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(13)}>
                    <Link to="/ManageRiders" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaAmbulance className="mr-2" />
                      <span>Manage rider</span>
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

export default StaffSidebar;
