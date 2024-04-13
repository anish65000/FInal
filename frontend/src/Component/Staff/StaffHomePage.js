import React from 'react';
import StaffNavbar from './StaffNavbar';
import StaffSidebar from './StaffSidebar';
import DoctorSidebar from './doctorsidebar';
// import BloodBankSidebar from './BloodBankSidebar'; // Assuming you have this component
import { useStaff } from './StaffContext';

const StaffHomepage = () => {
  const { state } = useStaff();
  const { stfUserName, stfStaffType } = state;

  let sidebarComponent;
  if (stfStaffType === 'Doctor') {
    sidebarComponent = <DoctorSidebar />;
  } else if (stfStaffType === 'Staff') {
    sidebarComponent = <StaffSidebar />;
  } else {
    sidebarComponent = <StaffSidebar />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <StaffNavbar />
      <div>
        {sidebarComponent}

        {/* Main Content */}
        <div className="w-1/2 m-auto p-8 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Staff Homepage</h1>
          <div className="flex justify-between">
            <div className="w-full p-4">
              <h2 className="text-xl font-semibold mb-2">Staff Information</h2>
              <p className="text-lg">Staff Name: {stfUserName}</p>
              <p className="text-lg">Staff Type: {stfStaffType}</p>
            </div>
          </div>
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default StaffHomepage;

