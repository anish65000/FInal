const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const authenticateToken = require('../authenticateToken');

const UserLoginController = (db) => {
  const router = express.Router();

  // Protected route using JWT authentication middleware
  router.get('/protected-route', authenticateToken, (req, res) => {
    // This route is protected, and req.user contains the decoded user from the token
    res.json({ success: true, message: 'Access granted', user: req.user });
  });

  // Login route
  router.post('/user/login', async (req, res) => {
    const username = req.body.username;
    const enteredPassword = req.body.password;

    try {
      // Use the provided MySQL connectio
      db.query(
        'SELECT ul.user_id, ul.userPassword,ud.userName, ul.username, ud.userRole FROM user_login ul JOIN user_details ud ON ul.user_id = ud.id WHERE ul.username = ?',
        [username],
        (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'Database error' });
          }

          // Handle the query results
          if (!results || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials: User not found' });
          }

          const storedPasswordHash = results[0].userPassword;
          const userId = results[0].user_id;
          const userRole = results[0].userRole;
          const userFullName = results[0].userName;

          // Compare the provided password with the stored hashed password synchronously
          const passwordMatch = bcrypt.compareSync(enteredPassword, storedPasswordHash);

          if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials: Incorrect password' });
          }

          // Generate JWT token
const secretKey = '9d9d667f8473686b29d597dd83c49195e886231d61b51bed0067db2780b2ef78';
if (!secretKey) {
  console.error('JWT secret key not found');
  return res.status(500).json({ success: false, message: 'Internal Server Error' });
}

const token = jwt.sign({ userId,userFullName, username, userRole }, secretKey, {
  expiresIn: '1w', // Token expiration time (adjust as needed)
});

// Send the token as part of the response along with additional user data
res.status(200).json({ success: true, message: 'Login successful', token, userData: { userId, userFullName ,username, userRole } });

        }
      );
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  return router;
}

module.exports = UserLoginController;
