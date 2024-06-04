import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Person, Inventory, ManageHistory, BloodtypeRounded } from "@mui/icons-material";
import { FaCalendarAlt, FaChartBar, FaUserAstronaut, FaPlusSquare, FaAmbulance, FaPeopleArrows, FaPuzzlePiece, FaPersonBooth } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
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
                    <Link to="/staffhomepage" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Home className="mr-2" />
                      <span>Home</span>
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
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(11)}>
                    <Link to="/ManageRiders" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaPersonBooth className="mr-2" />
                      <span>Manage Rider</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(12)}>
                    <Link to="/dashboard" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaChartBar className="mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </div>
                </li>
                <li className="opcion-con-desplegable">
                  <div className="flex items-center justify-between p-2 hover:bg-custom-green" onClick={() => toggleSubMenu(12)}>
                    <Link to="/BloodInventoryDashboard" className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaPuzzlePiece className="mr-2" />
                      <span>BloodInventoryDashboard</span>
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

export default AdminSidebar;
