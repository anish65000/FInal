const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile-pictures'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const generatedFilename = file.fieldname + '-' + uniqueSuffix + fileExtension;
    console.log('Generated filename:', generatedFilename);
    cb(null, generatedFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;


// app.get('/requested-rides/location', authenticateToken, async (req, res) => {
     

//   try {
//       // Fetch ride requests and donor location from the database based on location and user details
//       const [requestedRides] = await db.promise().query(`
//           SELECT rr.*, pd.latitude AS donor_latitude, pd.longitude AS donor_longitude
//           FROM ride_requests rr
//           LEFT JOIN premium_donors pd ON rr.donor_id = pd.premium_donor_id
//           WHERE rr.donor_id = ?
//       `, );

//       res.status(200).json({ success: true, requestedRides });
//   } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });
