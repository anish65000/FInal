const jwt = require('jsonwebtoken');
const authenticateToken = require('../authenticateToken');
const upload = require('./multerConfig'); 
const StaffProfilerController = (app, connection) => {
  // Helper function to run SQL queries using callback-based approach
  const query = (connection, sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Endpoint to retrieve user profile (requires authentication)
  app.get('/stfprofile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      // Fetch user profile details from the database
      const userProfile = await query(connection, 'SELECT id, stfName, stfMail, stfPhone, stfAddress, stfStaffType, avatar FROM stf_details WHERE id = ?', [userId]);
      if (userProfile.length === 0) {
        return res.status(404).send({ message: 'User not found' });
      }
      // Send the user profile details in the response
      res.status(200).send({ userProfile });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to retrieve all user profiles (requires authentication)
  app.get('/allstfprofiles', authenticateToken, async (req, res) => {
    try {
      // Fetch all user profiles with avatar data from the database
      const userProfiles = await query(connection, 'SELECT id, stfName, stfMail, stfPhone, stfAddress, stfStaffType, avatar FROM stf_details');

      // Convert the avatar data to Base64 string before sending it in the response
      const userProfilesWithBase64Avatar = userProfiles.map(profile => {
        if (profile.avatar && profile.avatar.data) {
          profile.avatar = profile.avatar.data.toString('base64');
        }
        return profile;
      });

      // Send the user profiles with avatar data in the response
      res.status(200).send({ allUserProfiles: userProfilesWithBase64Avatar });
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });


  app.put('/updatestfprofile', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
      // Handle file upload using Multer
      const userId = req.user.userId;
      // Fetch other user profile details from request body
      const { stfName, stfMail, stfPhone, stfAddress, stfStaffType } = req.body;
      // Process the uploaded file (if needed)
      
      // Update staff profile details in the database
      const sqlUpdateStfProfile = `
        UPDATE stf_details
        SET stfName=?, stfMail=?, stfPhone=?, stfAddress=?, stfStaffType=?
        WHERE id=?
      `;
      const params = [
        stfName,
        stfMail,
        stfPhone,
        stfAddress,
        stfStaffType,
        
        userId
      ];
      const updatedProfile = await query(connection, sqlUpdateStfProfile, params);
  
      if (updatedProfile.affectedRows === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      // Return success response
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}  

module.exports = StaffProfilerController;
