import React from 'react';
import blood1 from '../../Assest/img/blood1.png';
import blood2 from '../../Assest/img/blood2.png';
import blood3 from '../../Assest/img/slogan1.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope, faTint, faUserMd, faCapsules,
  faCalendarAlt, faFileMedical, faWarehouse, faUserPlus,
  faBox, faHeartbeat, faHandsHelping, faChartPie,
  faUserCog, faLock, faHistory, faDatabase,
  faInfoCircle, faUserAlt, faListAlt
} from '@fortawesome/free-solid-svg-icons';

import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';
import DoctorSidebar from '../Doctor/DoctorSidebar';
import { useStaff } from './StaffContext';
import AdminSidebar from '../Admin/AdminSidebar';

const FeatureItem = ({ icon, title, description }) => (
  <div className="mt-4 flex items-start">
    <FontAwesomeIcon icon={icon} className="mr-2 text-red-500 text-xl" />
    <div className="ml-2">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  </div>
);

const StaffHomepage = () => {
  const { state } = useStaff();
  const { stfUserName, stfStaffType } = state;

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

  const getFeatures = () => {
    switch (stfStaffType) {
      case 'Doctor':
        return (
          <>
            <FeatureItem icon={faStethoscope} title="Blood Test" description="Perform blood tests for patients." />
            <FeatureItem icon={faTint} title="Mark as Donated" description="Update donor records as blood donated." />
            <FeatureItem icon={faUserMd} title="Patient Consultation" description="Provide consultation to patients." />
            <FeatureItem icon={faCapsules} title="Prescription Management" description="Manage and update patient prescriptions." />
            <FeatureItem icon={faCalendarAlt} title="Appointment Scheduling" description="Schedule appointments for patients." />
            <FeatureItem icon={faFileMedical} title="Medical Records" description="Maintain and update patient medical records." />
          </>
        );
      case 'Staff':
        return (
          <>
            <FeatureItem icon={faWarehouse} title="Blood Bank Functions" description="Manage blood inventory and donor records." />
            <FeatureItem icon={faUserPlus} title="Donor Registration" description="Register new blood donors." />
            <FeatureItem icon={faBox} title="Inventory Management" description="Manage blood inventory levels and expiry dates." />
            <FeatureItem icon={faHeartbeat} title="Blood Transfusion" description="Coordinate blood transfusion processes." />
            <FeatureItem icon={faHandsHelping} title="Donor Outreach" description="Organize and manage blood donation campaigns." />
            <FeatureItem icon={faChartPie} title="Reporting" description="Generate reports on blood inventory and donor statistics." />
          </>
        );
      case 'Admin':
        return (
          <>
            <FeatureItem icon={faUserCog} title="Admin Functions" description="Manage staff, roles, and system settings." />
            <FeatureItem icon={faLock} title="User Management" description="Add, edit, or remove user accounts." />
            <FeatureItem icon={faHistory} title="Role Assignment" description="Assign roles and permissions to staff members." />
            <FeatureItem icon={faDatabase} title="System Configuration" description="Configure system settings and preferences." />
            <FeatureItem icon={faHistory} title="Audit Trails" description="Monitor and review system activity logs." />
            <FeatureItem icon={faDatabase} title="Backup and Recovery" description="Manage system backups and data recovery." />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pro-white">
      <StaffNavbar />
      <div className="flex flex-grow">
        <div className="w-1/4 bg-gray-200">
          {getSidebarComponent()}
        </div>
        <div className="flex-1 p-8 bg-pro-white">
          <div className="mb-8 flex items-center justify-center">
            <div className="bg-red text-white p-4 rounded-full">
              <h1 className="text-3xl font-bold">Welcome, {stfUserName}!</h1>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-red-600">Blood Care Nexus</h2>
            <p className="text-lg text-center font-serif leading-relaxed text-gray">
              Introducing Blood Care Nexus, an innovative and comprehensive blood management system designed to streamline and optimize the entire blood donation and transfusion process. With a user-friendly interface and advanced features, our system empowers healthcare professionals to efficiently manage blood inventory, donor records, and transfusion procedures, ensuring a seamless and reliable blood supply for patients in need.
            </p>
          </div>
          <div className="flex justify-between mb-8">
            <img src={blood1} alt="Blood" className="w-1/4 h-auto rounded-md shadow-md" />
            <img src={blood2} alt="Blood" className="w-1/4 h-auto rounded-md shadow-md" />
            <img src={blood3} alt="Slogan" className="w-1/4 h-auto rounded-md shadow-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border p-4 rounded-md bg-blue-100 hover:bg-white transition duration-300 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 text-red flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Staff Information
              </h2>
              <p className="text-lg">
                <FontAwesomeIcon icon={faUserAlt} className="mr-2" /> Staff Name: {stfUserName}
              </p>
              <p className="text-lg">
                <FontAwesomeIcon icon={faListAlt} className="mr-2" /> Staff Type: {stfStaffType}
              </p>
            </div>
            <div className="border p-4 rounded-md bg-white shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-red">Staff Dashboard</h2>
              {getFeatures()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHomepage;