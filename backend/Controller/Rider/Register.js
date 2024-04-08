const bcrypt = require('bcrypt');
const express = require('express');
const upload = require('./multerConfig'); // Import Multer configuration

const BloodBankRiderRegisterController = (app, db) => {
  const query = async (sql, params) => {
    try {
      const [results, fields] = await db.promise().query(sql, params);
      return results;
    } catch (error) {
      throw error;
    }
  };

  // Route to handle blood bank rider registration
  app.post("/reg/bloodbank-rider", upload.single('avatar'), async (req, res) => {
    try {
      const {
        name,
        email,
        phoneNumber,
        bloodType,
        bikeModel,
        licenseNumber,
        username,
        password
      } = req.body;

      // Handle file upload if avatar is present in the request
      const avatar = req.file;
      let imagePath = '';
      if (avatar) {
        imagePath = avatar.path;
      }

      const existingRider = await query('SELECT * FROM bloodbank_riders WHERE name = ?', [username]);

      if (existingRider.length > 0) {
        return res.status(400).send({ message: "Rider username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const connection = await db.promise();
      try {
        const [riderDetailsResult] = await connection.query(
          'INSERT INTO bloodbank_riders (name, email, phone_number, blood_type, bike_model, license_number, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, email, phoneNumber, bloodType, bikeModel, licenseNumber, imagePath]
        );

        const riderId = riderDetailsResult.insertId;

        await connection.query(
          'INSERT INTO rider_login (rider_id, username, password) VALUES (?, ?, ?)',
          [riderId, username, hashedPassword]
        );

        await connection.commit();

        console.log("Blood Bank Rider Registered Successfully");
        res.status(201).send({ success: true, message: "BLOOD BANK RIDER REGISTRATION SUCCESSFUL!" });
      } catch (err) {
        await connection.rollback();
        throw err;
      } 
    } catch (error) {
      console.error("Error during blood bank rider registration:", error);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  });

  app.get('/ride-request/:rideId', async (req, res) => {
    const rideId = req.params.rideId; // Extract the ride ID from the request URL

    try {
        // Fetch ride request details from the database based on the ride ID
        const [rideRequest] = await db.promise().query(`
            SELECT * FROM ride_requests WHERE ride_id = ?
        `, [rideId]);

        // Check if ride request details were found
        if (rideRequest.length === 0) {
            return res.status(404).json({ success: false, message: 'Ride request not found' });
        }

        // Respond with ride request details
        res.status(200).json({ success: true, rideRequest: rideRequest[0] });
    } catch (error) {
        // If any error occurs during the process, respond with an error message
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
}

module.exports = BloodBankRiderRegisterController;
