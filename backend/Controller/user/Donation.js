const authenticateToken = require('../authenticateToken'); // Import the updated authentication middleware

module.exports = function DonationController(app, db) {
  // Donation endpoint with authentication
  app.post('/donation', authenticateToken, async (req, res) => { // Updated to use the new authenticateToken middleware
    const formattedDate = new Date().toLocaleString();
    const userId = req.user.userId; // Store user ID from authenticated token

    // Ensure req.userId is defined after authentication middleware
    if (!userId) {
      return res.status(401).send({ message: "Unauthorized. Missing user ID." });
    }

    const connection = await db.promise();
    await connection.beginTransaction();

    try {
      // Fetch user details based on user ID
      const [userDetails] = await connection.execute('SELECT userRole FROM user_details WHERE Id = ?', [userId]);

      if (userDetails.length > 0 && userDetails[0].userRole === 'Donor') {
        // Destructuring request body
        const { bank_id, name, age, gender, blood_group, units, disease, reason,date, status } = req.body;

        // Validate input parameters
        if (!bank_id || !name || !age || !gender || !blood_group || !units || !disease ||  !date || !reason || !status) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if units is zero or negative
        if (units <= 0) {
          return res.status(400).json({ message: 'Units must be a positive number' });
        }

        // User exists and is a donor, proceed with the donation insertion
        const [insertResult] = await connection.execute(
          'INSERT INTO blood_donations (user_id, bank_id, name, age, gender, disease, blood_group, units, reason, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, bank_id, name, age, gender, disease, blood_group, units, reason, date, status]
        );

        const newDonationId = insertResult.insertId;

        // Update the blood bank with the new donation
        const updateBloodBankQuery = `
          UPDATE blood_bank
          SET donations = JSON_ARRAY_APPEND(donations, '$', ?)
          WHERE id = ?
        `;

        await connection.execute(updateBloodBankQuery, [newDonationId, bank_id]);

        await connection.commit();

        res.status(201).json({ message: 'Donation successful' });
      } else {
        // User is not authorized to make donations
        res.status(403).send({ message: "Permission denied. User is not a donor." });
      }
    } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).send('Internal Server Error');
    } finally {
      // Release connection if necessary
    }
  });

  app.get('/donation/history', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract user ID from the authenticated token

    try {
      const connection = await db.promise();

      // Fetch donation history of the authenticated user
      const [donationHistory] = await connection.execute(
        'SELECT * FROM blood_donations WHERE user_id = ?',
        [userId]
      );

      res.status(200).json({ donationHistory });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
};
