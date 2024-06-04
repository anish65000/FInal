const jwt = require('jsonwebtoken');
const authenticateToken = require('../authenticateToken');
const upload = require('./multerConfig'); 
const RiderProfilerController = (app, connection) => {
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
  app.get('/riderprofile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      // Fetch user profile details from the database
      const userProfile = await query(connection, 'SELECT rider_id, name, email, phone_number, blood_type, bike_model,license_number, avatar FROM bloodbank_riders  WHERE rider_id = ?', [userId]);
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

  


}

module.exports = RiderProfilerController