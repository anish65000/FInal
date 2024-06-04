const jwt = require('jsonwebtoken');
const authenticateToken = require('../authenticateToken');
const upload = require('../Staff/multerConfig');
const multer = require('multer');
const path = require('path');

const UserProfilerController = (app, connection) => {
  // Helper function to run SQL queries using a callback-based approach
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
  app.get('/profile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; // Accessing user ID from authenticated token

      // Fetch user profile details from the database
      const userProfile = await query(connection, 'SELECT * FROM user_details WHERE id = ?', [userId]);

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

  // PUT endpoint to edit user profile
  app.put('/profile', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; // Accessing user ID from authenticated token
      const { userProfile } = req.body; // Accessing updated user profile from request body

      // Update user profile details in the database
      const sqlUpdateUserProfile = `
        UPDATE user_details
        SET userName = ?, userAge = ?, userGender = ?, userBloodGroup = ?, userPhone = ?, userEmail = ?, userAddress = ?, userRole = ?
        WHERE id = ?
      `;
      const params = [
        userProfile.userName,
        userProfile.userAge,
        userProfile.userGender,
        userProfile.userBloodGroup,
        userProfile.userPhone,
        userProfile.userEmail,
        userProfile.userAddress,
        userProfile.userRole,
        userId
      ];
      await query(connection, sqlUpdateUserProfile, params);

      // Fetch updated user profile from the database
      const updatedUserProfile = await query(connection, 'SELECT * FROM user_details WHERE id = ?', [userId]);

      // Send the updated user profile details in the response
      res.status(200).send({ userProfile: updatedUserProfile });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to fetch premium donors
  app.get('/premiumdonors', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Accessing user ID from authenticated token

    try {
      // Check if the requester is a premium donor
      const sqlCheckPremiumDonor = `
        SELECT * FROM premium_donors WHERE user_id = ?;
      `;
      const [premiumDonor] = await connection.promise().query(sqlCheckPremiumDonor, [userId]);

      if (premiumDonor.length === 0) {
        return res.status(403).json({ message: 'Access forbidden. Only premium donors can access this endpoint.' });
      }

      // Proceed with fetching premium donor details
      const sqlSelectByUserId = `
        SELECT pd.*, ud.*
        FROM premium_donors pd
        JOIN user_details ud ON pd.user_id = ud.id
        WHERE pd.user_id = ?;
      `;
      const [donors] = await connection.promise().query(sqlSelectByUserId, [userId]);

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
      console.error('Error fetching premium donor by User ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Endpoint to update premium donor availability, longitude, and latitude by user_id
  app.patch('/premiumdonors', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Accessing user ID from authenticated token
    const { availability, longitude, latitude } = req.body; // Updated availability, longitude, and latitude sent in the request body

    try {
      // Check if the requester is authorized to edit the premium donor
      const sqlUpdatePremiumDonor = `
        UPDATE premium_donors
        SET  longitude = ?, latitude = ?
        WHERE user_id = ?;
      `;
      await connection.promise().query(sqlUpdatePremiumDonor, [availability, longitude, latitude, userId]);

      res.status(200).json({ message: 'Premium donor availability and location updated successfully.' });
    } catch (error) {
      console.error('Error updating premium donor availability and location:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // New endpoint to update premium donor availability by user_id
  app.patch('/premiumdonors/availability', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Accessing user ID from authenticated token
    const { availability } = req.body; // Updated availability sent in the request body

    try {
      // Check if the requester is authorized to edit the premium donor
      const sqlUpdateAvailability = `
        UPDATE premium_donors
        SET availability = ?
        WHERE user_id = ?;
      `;
      await connection.promise().query(sqlUpdateAvailability, [availability, userId]);

      res.status(200).json({ message: 'Premium donor availability updated successfully.' });
    } catch (error) {
      console.error('Error updating premium donor availability:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // New endpoint to update premium donor location by user_id
  app.patch('/premiumdonors/location', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Accessing user ID from authenticated token
    const { longitude, latitude } = req.body; // Updated longitude and latitude sent in the request body

    try {
      // Check if the requester is authorized to edit the premium donor
      const sqlUpdateLocation = `
        UPDATE premium_donors
        SET longitude = ?, latitude = ?
        WHERE user_id = ?;
      `;
      await connection.promise().query(sqlUpdateLocation, [longitude, latitude, userId]);

      res.status(200).json({ message: 'Premium donor location updated successfully.' });
    } catch (error) {
      console.error('Error updating premium donor location:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

module.exports = UserProfilerController;
