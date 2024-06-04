import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faUser, faBlog, faAmbulance, faUsers } from '@fortawesome/free-solid-svg-icons';
import logo from './../Assest/img/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-nav-gray  p-4 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center">
  <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
    
    <div className="text-gray font-bold text-xl mr-2">Blood Care Nexus</div>
    <img className="logo" src={logo} alt="Logo" />
  </Link>
</div>

      
      <div className="flex space-x-20 items-center ml-auto ">
        <ul className="flex space-x-20 text-gray">
          <li className="flex space-x-20">
            <Link to="/" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </li>
          
           
          <li>
            <Link to="/user/login" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Donor</span>
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faBlog} className="mr-2" />
              Blog
            </Link>
          </li>
          <li>
            <Link to="/user/login" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Blood Recipient
            </Link>
          </li>
          <li>
            <Link to="/staff/login" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Staff
            </Link>
          </li>
          <li>
            <Link to="/rider/login" className="flex items-center text-gray">
              <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
              Rider
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
