const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const authenticateToken = require('../Controller/authenticateToken');
const UserRegisterController = require('../Controller/user/UserRegisterController');
const EligibilityController = require('../Controller/Staff/EgibiltyCheck');
const DonorInventoryController = require('../Controller/Staff/DonorInventoryController');
const BloodRequestController = require('../Controller/Staff/BloodRequest');
const DonationController = require('../Controller/user/Donation');
const userLoginController = require('../Controller/user/UserLoginController');
const BloodbankController = require('../Controller/Admin/RegisterBloodBankController');
const campController = require('../Controller/Staff/CampController');
const BookAppointmentController = require('../Controller/Staff/CreateApppointment');
const handleAppointmentController = require('../Controller/user/PerformAppController');
const PremiumDonorController = require('../Controller/user/PremiumDonor');
const BloodDonationController = require('../Controller/Staff/BloodDonationController');
const StaffRegisterController = require('../Controller/Staff/StaffRegisterController');
const RequestController = require('../Controller/Staff/RequestController');
const DonorController = require('../Controller/user/DonorRequest');
const ManageDonationcontroller = require('../Controller/Staff/ManageDonationcontroller');
const StaffLoginController = require('../Controller/Staff/StaffLoginController');
const DonorNotification = require('../Controller/user/NotificationDonor')
const ManageAppointmentController = require('../Controller/Staff/Doctor/ManageAppointmnet')
const BloodStockController = require('../Controller/Staff/BloodStockControllers')
const riderRequestController = require('../Controller/Staff/Riderrequest')

const UserProfilerController = require('../Controller/user/Userprofille')
const RiderController = require('../Controller/Rider/donordetails')
const BloodBankRiderRegisterController = require('../Controller/Rider/Register')
const RiderLoginController = require('../Controller/Rider/login')
const BloodBankAllRidersController = require('../Controller/Rider/Riderdetails')
const RiderRideController = require('../Controller/Rider/Request')
const startRideController = require('../Controller/Rider/StartRideController')

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use('/protected-route', authenticateToken);
app.use('/profile-pictures', express.static('public/profile-pictures'));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'fyp',
  connectTimeout: 60000,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const wss = new WebSocket.Server({ port: 8081 });
RiderController(app,db);
UserRegisterController(app, db);
ManageAppointmentController(app, db,authenticateToken);
RequestController(app, db, authenticateToken);
riderRequestController(app, db, authenticateToken);
userLoginController(app, db);
UserProfilerController(app, db);
EligibilityController(app, db);
DonorInventoryController(app, db);
BloodRequestController(app, db, authenticateToken);
DonationController(app, db, authenticateToken);
ManageDonationcontroller(app, db, authenticateToken);
userLoginController(app, db);
BloodbankController(app, db);
campController(app, db);
DonorController(app, db, wss); // Pass wss to DonorController
BookAppointmentController(app, db, authenticateToken);
handleAppointmentController(app, db);
PremiumDonorController(app, db);
BloodDonationController(app, db);
StaffRegisterController(app, db);
BloodStockController(app,db);
BloodBankRiderRegisterController(app,db);
app.use('/', StaffLoginController(db));
app.use('/', userLoginController(db));
app.use('/', RiderLoginController (db))

BloodBankAllRidersController(app,db);
RiderRideController(app, db, authenticateToken);
startRideController(app, db, authenticateToken);;

DonorNotification(app, db, wss); // Pass wss to DonorNotification

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
