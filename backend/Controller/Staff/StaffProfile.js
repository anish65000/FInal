const jwt = require('jsonwebtoken');
const authenticateToken = require('../authenticateToken');

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
 // Modify the backend to fetch all user profiles with avatar data
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

};

module.exports = StaffProfilerController;
