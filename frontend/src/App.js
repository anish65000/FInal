import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserRegister from './Component/user/UserRegister';
import UserLoginPage from './Component/user/UserLogin';  
import HomePage from './Component/Homepage';
import StaffRegistration from './Component/Staff/StaffRegister';
import BloodStock from './Component/Staff/BloodInventory';
import DonorStockComponent from './Component/Staff/DonorInventory'; 
import BloodTestForm from './Component/Staff/BloodTesting';
import AddDonor from './Component/Staff/RegisterDonor';
import BloodRequestComponent from './Component/user/Recipients/BloodRequest';
import BloodCompatibilityChecker from './Component/user/CompatibilityChecker';
import PremiumDonorManagement from './Component/user/Recipients/PreimumDonor' 

import StaffHomepage from './Component/Staff/StaffHomePage';
import BloodRequestHistory from './Component/Staff/RequestHistory';
import CampForm from './Component/Camp/CampDonation';
import CampSearch from './Component/Camp/CampSearch ';
import RegisterBloodBankForm from './Component/Admin/RegisterBloodBank';
import BankDetails from './Component/user/Donor/BankDetails';
//import BloodBankManagement from './Component/Admin/bank';
import { UserProvider } from './Component/user/Usercontext';
import NearbyDonorsMap from './Component/user/Recipients/NearbyDonor';
import { StaffProvider } from './Component/Staff/StaffContext';
import {RiderProvider} from './Component/Rider/RiderContext'

import PremiumDonorRegistration from './Component/user/RegisterDonorForm';

import LoginPage from './Component/Staff/Loginpage';
import UserHome from './Component/user/UserHomePage';
import UserNavbar from './Component/user/UserNavbar';
import BloodStockForm from './Component/Staff/BloodStockForm';
import DonationForm from './Component/user/Blooddonation';
import ManageDonations from './Component/Staff/ViewDonation';
import AvailableSlotsForm from './Component/Doctor/Addtimeslots';
import AppointmentDetails from './Component/Doctor/AppointmentDetails';
import AppointmentList from './Component/Doctor/AppointmentList';
import PremiumDonorDetails from './Component/user/Recipients/DonorDetails';
//doctor
import ConfirmBooking from './Component/Doctor/ConfirmBooking';
import AppointBloodDonation from './Component/Doctor/BloodAppointmentForm ';
import BloodDonationFeedbackForm from './Component/user/Donor/BloodDonationFeedbackForm';
import BloodAppointmentForm  from './Component/user/Donor/BookAppointmentForm';

import AvailableSlotsComponent from './Component/user/Donor/AvailableSlotsComponent';
//import BloodAppointmentForm from './Component/user/Donor/BookAppointmentForm';

import DonorRequests from './Component/user/DonorRequests';

import RiderHomePage from './Component/Rider/HomePage';

import ViewProfile from './Component/user/Userprofile';
import PremiumDonorProfile from './Component/user/ViewProfile';
import ConfirmedAppointmentList  from './Component/Doctor/ConfirmedAppointmentDetails';
import ConfirmedAppointment from './Component/Doctor/ConfirmedAppointment';
import Appointments from './Component/user/Donor/GetAppointment';

import RegisterCamp from './Component/Camp/AddCamp.';
import ManageCamp from './Component/Camp/Camp';
import CampsList from './Component/Camp/Camplist';

import ManageBloodBanks from './Component/Admin/ManageBloodBank';
import EditBloodBank from './Component/Admin/EditBloodBank';

import RiderLogin from './Component/Rider/Loginpage';
import BloodBankRiderRegistration from './Component/Rider/Register';
import UrgentRequestList from './Component/Staff/Request';
import DonorDetails from './Component/Staff/RequestedDonor';
import UrgentRequestDetail from './Component/Staff/urgentrequestdetails';
import RideRequestForm from './Component/Staff/Riderrequest'; // Added this line
import BloodRequestList from './Component/user/Recipients/Requesthistory';
import RequestedRides from './Component/Rider/RequestedRides';
import RequestedRidesMap from  './Component/Rider/DonorLocation';
import BookBloodAppointmentForm from './Component/user/Donor/BookAppointmentForm';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <RiderProvider>
        <StaffProvider>
          <Routes>
          <Route path="/donor-location/:donorId" element={< RequestedRidesMap />} />
          <Route path="/requestrides" element={<RequestedRides />} />
            <Route path="/request" element={<UrgentRequestList />} />
            <Route path="/urgentrequests/:requestId" element={<UrgentRequestDetail />} />
            <Route path="/donordetails/:requestId" element={<DonorDetails />} />
            <Route path="/staffhomepage" element={<StaffHomepage />} />
            <Route path="/riderhomepage" element={<RiderHomePage />} />
            <Route path="/register/rider" element={<BloodBankRiderRegistration />} />
            <Route path="/rider/login" element={<RiderLogin />} />
            <Route path="/register/prem" element={<PremiumDonorRegistration />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/viewprofile" element={<PremiumDonorProfile />} />
            <Route path="/user/login" element={<UserLoginPage />} />
            <Route path="/Navbar" element={<UserNavbar />} />
            <Route path="/staff/login" element={<LoginPage />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/staff" element={<StaffRegistration />} />
            <Route path="/donor-requests" element={<DonorRequests />} />
            <Route path="/bloodstock" element={<BloodStock />} />
            <Route path="/donorstock" element={<DonorStockComponent />} />
            <Route path="/testingblood" element={<BloodTestForm />} />
            <Route path="/blood" element={<BloodRequestComponent />} />
            <Route path="/AddBlood" element={<BloodStockForm />} />
            <Route path="/BloodRequestHistory" element={<BloodRequestHistory />} />
            <Route path="/Adddonor" element={<AddDonor />} />
            <Route path="/donors" element={<PremiumDonorManagement />} />
            <Route path="/donors/:id" element={<PremiumDonorDetails />} />
            <Route path="/bloodbank" element={<BankDetails />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/nearbydonor" element={<NearbyDonorsMap />} />
            <Route path="/managedonation" element={<ManageDonations />} />
            <Route path="/checkcomp" element={<BloodCompatibilityChecker />} />
            <Route path="/Addslots" element={<AvailableSlotsForm />} />
            <Route path="/slots" element={<AvailableSlotsComponent />} />
            <Route path="/appointment/:appointmentId" element={<AppointmentDetails />} />
            <Route path="/Appointmentslist" element={<AppointmentList />} />
            <Route path="/bloodappointment:appointmentId" element={<BloodAppointmentForm />} />
            <Route path="/feedback" element={<BloodDonationFeedbackForm />} />
            <Route path="/booking" element={<ConfirmBooking />} />
            <Route path="/appointment/:appointmentId" element={<AppointmentDetails />} />
            <Route path="/confirmed" element={<ConfirmedAppointmentList />} />
            <Route path="/confirmed-appointment-details/:appointmentId" element={<ConfirmedAppointment />} />
            <Route path="/AppointBlood" element={<AppointBloodDonation />} />
            <Route path="/bloodappointment" element={<BookBloodAppointmentForm  />} />
            <Route path="/getapppointment" element={<Appointments />} />
            <Route path="/Registercamp" element={<RegisterCamp />} />
            <Route path="/CampsList" element={<CampsList />} />
            <Route path="/campserach" element={<CampSearch />} />
            <Route path="/ManageCamp" element={<ManageCamp />} />
            <Route path="/blooddonationform/:campId" element={<CampForm />} />
            <Route path="/RegisterBank" element={<RegisterBloodBankForm />} />
            <Route path="/manage-bloodbanks" element={<ManageBloodBanks />} />
            <Route path="/edit-bloodbank/:id" element={<EditBloodBank />} />
            <Route path="/Riderequest/:requestId" element={<RideRequestForm />} /> 
            <Route path="/bloodrequest" element={<BloodRequestList/>} /> 
          </Routes>
        </StaffProvider>
        </RiderProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
