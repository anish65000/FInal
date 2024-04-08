const jwt = require('jsonwebtoken');
const authenticateToken = require('../authenticateToken');

const UserProfilerController = (app, connection) => {
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

  app.get('/premiumdonors', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Accessing user ID from authenticated token

    try {
        // Check if the requester is a premium donor
        const sqlCheckPremiumDonor = `
            SELECT * FROM premium_donors WHERE user_id = ?;
        `;
        const premiumDonor = await connection.promise().query(sqlCheckPremiumDonor, [userId]);

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

  
};

module.exports = UserProfilerController;
