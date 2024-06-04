import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from './Component/user/UserRegister';
import UserLoginPage from './Component/user/UserLogin';  
import HomePage from './Component/Homepage';
import StaffRegistration from './Component/Staff/StaffRegister';
import BloodStock from './Component/Staff/BloodInventory';
import DonorStockComponent from './Component/Staff/DonorInventory'; 
import BloodTestForm from './Component/Staff/BloodTesting';
import AddDonor from './Component/Staff/AddDonor';
import BloodRequestComponent from './Component/user/Recipients/BloodRequest';
import BloodCompatibilityChecker from './Component/user/CompatibilityChecker';
import PremiumDonorManagement from './Component/user/Recipients/PreimumDonor' 
import StaffHomepage from './Component/Staff/StaffHomePage';
import BloodRequestHistory from './Component/Staff/RequestHistory';
import CampForm from './Component/Camp/CampDonation';
import CampSearch from './Component/Camp/CampSearch ';
import RegisterBloodBankForm from './Component/Admin/RegisterBloodBank';
import BankDetails from './Component/user/Donor/BankDetails';
import { UserProvider } from './Component/user/Usercontext';
import NearbyDonorsMap from './Component/user/Recipients/NearbyDonor';
import { StaffProvider } from './Component/Staff/StaffContext';
import {RiderProvider} from './Component/Rider/RiderContext'
import PremiumDonorRegistration from './Component/user/Donor/PremiumDonorForm';
import LoginPage from './Component/Staff/Loginpage';
import UserHome from './Component/user/UserHomePage';
import UserNavbar from './Component/user/UserNavbar';
import BloodStockForm from './Component/Staff/BloodStockForm';
import DonationForm from './Component/user/Donor/Blooddonation';
import ManageDonations from './Component/Staff/ViewDonation';
import AvailableSlotsForm from './Component/Doctor/AddTimeSlot';
import AppointmentDetails from './Component/Doctor/AppointmentDetails';
import AppointmentList from './Component/Doctor/AppointmentList';
import PremiumDonorDetails from './Component/user/Recipients/DonorDetails';
//doctor
import ConfirmBooking from './Component/Doctor/ConfirmBooking';
import AppointBloodDonation from './Component/Doctor/BloodAppointmentForm ';
import BloodDonationFeedbackForm from './Component/user/Donor/BloodDonationFeedbackForm';
import BloodAppointmentForm  from './Component/user/Donor/BookAppointmentForm';
import AvailableSlotsComponent from './Component/user/Donor/AvailableSlotsComponent';
import AboutUs from './Component/user/AboutUs';
import RiderHomePage from './Component/Rider/HomePage';
import ViewProfile from './Component/user/UserProfile';
import PremiumDonorProfile from './Component/user/ViewProfile';
import ConfirmedAppointmentList  from './Component/Doctor/ConfirmedAppointmentDetails';
import ConfirmedAppointment from './Component/Doctor/ConfirmedAppointment';
import Appointments from './Component/user/Donor/GetAppointment';
import RegisterCamp from './Component/Camp/AddCamp.';
import ManageCamp from './Component/Camp/Camp';
import CampsList from './Component/Camp/CampList';
import ManageBloodBanks from './Component/Admin/ManageBloodBank';
import EditBloodBank from './Component/Admin/EditBloodBank';
import RiderLogin from './Component/Rider/LoginPage';
import BloodBankRiderRegistration from './Component/Rider/Register';
import UrgentRequestList from './Component/Staff/Request';
import DonorDetails from './Component/Staff/RequestedDonor';
import UrgentRequestDetail from './Component/Staff/UrgentRequestDetails';
import RideRequestForm from './Component/Staff/RiderRequest'; 
import BloodRequestList from './Component/user/Recipients/RequestHistory';
import RequestedRides from './Component/Rider/RequestedRides';
import RequestedRidesMap from  './Component/Rider/DonorLocation';
import BookBloodAppointmentForm from './Component/user/Donor/BookAppointmentForm';
import DonationHistory from './Component/user/Donor/DonationHistory';
import StaffProfile from './Component/Staff/StaffProfile';
import RecipientsComponent from './Component/Staff/RecipientsInventory'
import AddRecipient from './Component/Staff/AddRecipents'
import ManageUsers from './Component/Admin/ManageUser';
import ManageStaff from './Component/Admin/ManageStaff';
import RiderManagement from './Component/Admin/ManageRider';
import BloodInventoryDashboard from './Component/Admin/BloodStockDashboard';
import RiderProfile from './Component/Rider/RiderProfile';
import StaffEdit from './Component/Staff/StaffEdit';
import Dashboard from './Component/Admin/Admindashboard';
import DonationRequests from './Component/user/DonationRequests';
import UrgentRequestsList from './Component/user/Recipients/UserRequestDetails';
import ManagePremiumDonor from './Component/Admin/ManagePremiuemDonor'
import DonatedUserDetails from './Component/Doctor/ViewDonatedUser';
import EndedUrgentRequestList from './Component/Staff/EndedRequest';

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
            <Route path="/stfprofile" element={<StaffProfile />} />
            <Route path="/viewprofile" element={<PremiumDonorProfile />} />
            <Route path="/user/login" element={<UserLoginPage />} />
            <Route path="/Navbar" element={<UserNavbar />} />
            <Route path="/staff/login" element={<LoginPage />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/staff" element={<StaffRegistration />} />
            <Route path="/AboutUs" element={<AboutUs />} />         
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
            <Route path="/managedonation" element={<ManageDonations/>} /> 
            <Route path="/DonationHistory" element={< DonationHistory />} /> 
            <Route path="/RecipientsComponent" element={<  RecipientsComponent />} /> 
            <Route path="/AddRecipients" element={<  AddRecipient />} /> 
            <Route path="/ManageUsers" element={<  ManageUsers />} />
            <Route path="/ManageStaffs" element={<  ManageStaff />} />
            <Route path="/ManageRiders" element={<  RiderManagement />} />
            <Route path="/BloodInventoryDashboard" element={<   BloodInventoryDashboard />} />         
            <Route path="/riderprofile" element={<  RiderProfile />} />
            <Route path="/staffedit" element={<  StaffEdit  />} />
            <Route path="/staffprofile" element={<  StaffProfile  />} />
            <Route path="/dashboard" element={< Dashboard />} />
            <Route path="/DonationRequests" element={< DonationRequests />} />
            <Route path="/UrgentRequestsList" element={< UrgentRequestsList />} />
            <Route path="/ManagePremiumDonor" element={< ManagePremiumDonor />} />
            <Route path="/DonatedUserDetails" element={< DonatedUserDetails  />} />
            <Route path="/Endedurgentrequest" element={< EndedUrgentRequestList  />} />
            
        </Routes>
        </StaffProvider>
        </RiderProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
