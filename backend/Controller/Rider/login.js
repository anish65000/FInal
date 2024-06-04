const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const authenticateToken = require('../authenticateToken');

const RiderLoginController = (db) => {
    const router = express.Router();

    // Protected route using JWT authentication middleware
    router.get('/protected-route', authenticateToken, (req, res) => {
        // This route is protected, and req.user contains the decoded user from the token
        res.json({ success: true, message: 'Access granted', user: req.user });
    });

    // Login route
    router.post('/rider/login', async (req, res) => {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;

        try {
            // Use the provided MySQL connection
            db.query(
                'SELECT br.rider_id , br.name AS riderName, rl.password FROM bloodbank_riders br JOIN rider_login rl ON br.rider_id = rl.rider_id WHERE rl.username = ?',
                [enteredUsername],
                async (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).json({ success: false, message: 'Database error' });
                    }

                    // Handle the query results
                    if (!results || results.length === 0) {
                        return res.status(401).json({ success: false, message: 'Invalid credentials: Rider not found' });
                    }
                    const { rider_id: userId, riderName, password: storedPasswordHash } = results[0];

                    // Compare the provided password with the stored hashed password asynchronously
                    bcrypt.compare(enteredPassword, storedPasswordHash, (err, passwordMatch) => {
                        if (err || !passwordMatch) {
                            return res.status(401).json({ success: false, message: 'Invalid credentials: Incorrect password' });
                        }

                        // Load secret key from environment variable
                        const secretKey = process.env.JWT_SECRET;

                        // Check if secret key is available
                        if (!secretKey) {
                            console.error('JWT secret key not found');
                            return res.status(500).json({ success: false, message: 'Internal Server Error' });
                        }

                        // Generate a JWT token
                        const token = jwt.sign({ userId, riderName }, secretKey, {
                            expiresIn: '1w', // Token expiration time (adjust as needed)
                            algorithm: 'HS256' // Explicitly specify algorithm
                        });

                        // Send the token in the response headers
                        res.setHeader('Authorization', `Bearer ${token}`);

                        // Send the token and rider name as part of the response
                        res.status(200).json({ success: true, message: 'Login successful', token, riderName, userId });
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

module.exports = RiderLoginController;
