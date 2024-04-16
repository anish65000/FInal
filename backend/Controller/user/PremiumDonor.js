const multer = require('multer');
const path = require('path');
const Donation = require('./Donation');
const authenticateToken = require('../authenticateToken');

// Set up storage for multer
console.log('Current working directory:', process.cwd());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile-pictures');
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

// Assuming you have the executeQuery function as mentioned above
const PremiumDonorController = (app, db) => {
  // Assuming you are using MySQL as the database
  const util = require('util');
  const query = util.promisify(db.query).bind(db);

  // Example usage:
  async function executeQuery(sql, values) {
    try {
      const result = await query(sql, values);
      return { success: true, result };
    } catch (error) {
      console.error('Error executing query:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Register a new premium donor
  
  app.post('/register/premiumdonor', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    const {
      latitude,
      longitude,
      availability,
      donorhealth,
      previousdontaion,
    } = req.body;
  
    const userId = req.user.userId; // Accessing userId from the request object
  
    try {
      // Check if the user is a donor
      const [donorCheckResult] = await db.promise().query('SELECT * FROM user_details WHERE id = ? AND userRole = "Donor"', [userId]);
      
      if (donorCheckResult.length === 0) {
        return res.status(403).json({ message: 'Forbidden: Only donors can register as premium donors' });
      }
  
      let profilePicture = ''; // Initialize profile picture variable
  
      // Check if file was uploaded
      if (req.file) {
        profilePicture = req.file.filename;
      } else {
        // Handle case where file was not uploaded
        return res.status(400).json({ message: 'No profile picture uploaded' });
      }
  
      // Check if the user already exists in the premium donors table
      const [premiumDonorCheckResult] = await db.promise().query('SELECT * FROM premium_donors WHERE user_id = ?', [userId]);
  
      if (premiumDonorCheckResult.length > 0) {
        // If user already exists in premium donors, return an error
        return res.status(409).json({ message: 'Conflict: User is already a premium donor' });
      }
  
      // Proceed with premium donor registration logic here...
      const sqlInsert = `
        INSERT INTO premium_donors (
          user_id,
          latitude,
          longitude,
          availability,
          donor_health,
          previous_dontaion,
          profile_picture,
        
        )
        VALUES (?,?,?,?,?,?,?);
      `;
  
      // Use await to ensure the file upload is completed before continuing
      const { success, result, error } = await executeQuery(sqlInsert, [
        userId,
        latitude,
        longitude,
        availability,
        donorhealth,
        previousdontaion,
        profilePicture,
      ]);
  
      if (!success) {
        console.error('Error inserting premium donor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
  
      const premiumDonorId = result && result.insertId;
      console.log('New premium donor registered with ID:', premiumDonorId);
      res.status(201).json({ message: 'Premium donor registered successfully', premiumDonorId });
    } catch (error) {
      console.error('Error handling premium donor registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  // Get all premium donors
  app.get('/api/donors', async (req, res) => {
    try {
      const sqlSelect = 'SELECT pd.*, ud.userName,ud.userAge, ud.userGender, ud.userBloodGroup, ud.userPhone, ud.userEmail, ud.userAddress FROM premium_donors pd JOIN user_details ud ON pd.user_id = ud.id;';
      const [donors] = await db.promise().query(sqlSelect);

      // Append the full path to the profile picture in each donor objectS
      const donorsWithImagePath = donors.map(donor => ({
        ...donor,
        profile_picture: `/profile-pictures/${donor.profile_picture}`,
      }));

      res.json(donorsWithImagePath);
    } catch (error) {
      console.error('Error fetching all premium donors:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Get a premium donor by ID with user details
  app.get('/api/donors/:id', async (req, res) => {
    const donorId = req.params.id;

    try {
      const sqlSelectById = `
        SELECT pd.*, ud.*
        FROM premium_donors pd
        JOIN user_details ud ON pd.user_id = ud.id
        WHERE pd.premium_donor_id = ?;
      `;
      const [donors] = await db.promise().query(sqlSelectById, [donorId]);

      if (donors.length === 0) {
        res.status(404).json({ message: 'Premium donor not found' });
      } else {
        const donorWithDetails = {
          premium_donor: {
            ...donors[0],
            profile_picture: `/profile-pictures/${donors[0].profile_picture}`,
          },
      
        };
        res.json(donorWithDetails);
      }
    } catch (error) {
      console.error('Error fetching premium donor by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // Update a premium donor by ID
  app.put('/api/updatedonors/:id', upload.single('profilePicture'), async (req, res) => {
    const donorId = req.params.id;
    const {
      latitude,
      longitude,
      availability,
      donorhealth,
      Donation ,
    } = req.body;

    try {
      let updateFields = '';
      let updateValues = [];

      if (latitude) {
        updateFields += 'latitude = ?, ';
        updateValues.push(latitude);
      }

      if (longitude) {
        updateFields += 'longitude = ?, ';
        updateValues.push(longitude);
      }

      if (availability) {
        updateFields += 'availability = ?, ';
        updateValues.push(availability);
      }

      if (req.file) {
        updateFields += 'profile_picture = ?, ';
        updateValues.push(req.file.filename);
      }

      if (donorType) {
        updateFields += 'donor_type = ?, ';
        updateValues.push(donorType);
      }

      if (donorhealth) {
        updateFields += 'donor_health = ?, ';
        updateValues.push(donorhealth);
      }

      if (Donation) {
        updateFields += 'donation_status = ?, ';
        updateValues.push(Donation);
      }

      // Remove the trailing comma and space from updateFields


      // Remove the trailing comma and space from updateFields
      updateFields = updateFields.slice(0, -2);

      const sqlUpdate = `UPDATE premium_donors SET ${updateFields} WHERE premium_donor_id = ?;`;
      const [updateResult] = await db.promise().query(sqlUpdate, [...updateValues, donorId]);

      if (updateResult.affectedRows === 0) {
        res.status(404).json({ message: 'Premium donor not found' });
      } else {
        res.json({ message: 'Premium donor updated successfully' });
      }
    } catch (error) {
      console.error('Error updating premium donor by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Example endpoint to get premium donors' locations with additional user details
app.get('/api/premium-donors/locations', async (req, res) => {
  try {
    const sqlSelectLocations = `
      SELECT pd.premium_donor_id , pd.latitude, pd.longitude, ud.userName, ud.userPhone
      FROM premium_donors pd
      JOIN user_details ud ON pd.user_id = ud.id;
    `;
    const [locations] = await db.promise().query(sqlSelectLocations);
    res.json(locations);
  } catch (error) {
    console.error('Error fetching premium donors locations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  


}

module.exports = PremiumDonorController;