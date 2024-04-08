const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const authenticateToken = require('../authenticateToken');

const StaffLoginController = (db) => {
  const router = express.Router();

  // Protected route using JWT authentication middleware
  router.get('/protected-route', authenticateToken, (req, res) => {
    // This route is protected, and req.user contains the decoded user from the token
    res.json({ success: true, message: 'Access granted', user: req.user });
  });

  // Login route
  router.post('/Staff/login', async (req, res) => {
    const enteredUsername = req.body.stfUserName;
    const enteredPassword = req.body.stfPassword;

    try {
        // Use the provided MySQL connection
        db.query(
            'SELECT sl.stf_id, sd.stfName, sd.stfStaffType, sl.password FROM stf_login sl JOIN stf_details sd ON sl.stf_id = sd.id WHERE sl.userName = ?',
            [enteredUsername],
            async (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ success: false, message: 'Database error' });
                }

                // Handle the query results
                if (!results || results.length === 0) {
                    return res.status(401).json({ success: false, message: 'Invalid credentials: Staff not found' });
                }

                const { stf_id: staffId, stfName: staffName, stfStaffType, password: storedPasswordHash } = results[0];

                // Compare the provided password with the stored hashed password asynchronously
                bcrypt.compare(enteredPassword, storedPasswordHash, (err, passwordMatch) => {
                    if (err || !passwordMatch) {
                        return res.status(401).json({ success: false, message: 'Invalid credentials: Incorrect password' });
                    }

                    // If the credentials are valid, generate a JWT token
                    const secretKey = process.env.JWT_SECRET; // Load secret key from environment variable
                    if (!secretKey) {
                        console.error('JWT secret key not found');
                        return res.status(500).json({ success: false, message: 'Internal Server Error' });
                    }

                    const token = jwt.sign({ staffId, staffName, enteredUsername, userId: staffId }, secretKey, {

                      expiresIn: '1w', // Token expiration time (adjust as needed)
                  });
                  

                    // Send the token in the response headers
                    res.setHeader('Authorization', `Bearer ${token}`);

                    // Send the token, staff name, and staff type as part of the response
                    res.status(200).json({ success: true, message: 'Login successful', token, staffName, stfStaffType,staffId });
                });
            }
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


  return router;
}

module.exports = StaffLoginController;
