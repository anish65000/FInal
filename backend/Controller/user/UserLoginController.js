const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const authenticateToken = require('../authenticateToken');

const UserLoginController = (db) => {
  const router = express.Router();

  // Protected route using JWT authentication middleware
  router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Access granted', user: req.user });
  });

  // Login route
  router.post('/user/login', async (req, res) => {
    const username = req.body.username;
    const enteredPassword = req.body.password;

    try {
      db.query(
        'SELECT ul.user_id, ul.userPassword, ud.userName, ul.username, ud.userRole FROM user_login ul JOIN user_details ud ON ul.user_id = ud.id WHERE ul.username = ?',
        [username],
        (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ success: false, message: 'Database error' });
          }

          if (!results || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials: User not found' });
          }

          const storedPasswordHash = results[0].userPassword;
          const userId = results[0].user_id;
          const userRole = results[0].userRole;
          const userFullName = results[0].userName;

          const passwordMatch = bcrypt.compareSync(enteredPassword, storedPasswordHash);

          if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials: Incorrect password' });
          }

          const secretKey = process.env.JWT_SECRET
          if (!secretKey) {
            console.error('JWT secret key not found');
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          }

          const token = jwt.sign({ userId, userFullName, username, userRole }, secretKey, {
            expiresIn: '1w',
          });

          res.status(200).json({ success: true, message: 'Login successful', token, userData: { userId, userFullName, username, userRole } });
        }
      );
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Forgot Password Endpoint
  router.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
  
      db.query(
        'SELECT * FROM user_details WHERE userEmail = ?',
        [email],
        async (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: "Server Error" });
          }
  
          if (!results || results.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }
  
          const user = results[0];
          const resetToken = crypto.randomBytes(20).toString("hex");
  
          db.query(
            'UPDATE user_login SET token = ? WHERE user_id = ?',
            [resetToken, user.id],
            async (error) => {
              if (error) {
                console.error('Error updating token:', error);
                return res.status(500).json({ error: "Server Error" });
              }
  
              const transport = nodemailer.createTransport({
                service: 'Gmail', // Use your email service provider here
                auth: {
                  user: 'bloodcarenexus@gmail.com', // Your email address
                  pass: 'dbqt mogk nvpp brcr', // Your email password or app password
                },
              });
  
              const message = {
                from: "bloodcarenexus@gmail.com",
                to: user.userEmail,
                subject: "Reset your password",
                text: `http://localhost:3000/reset-password?prtoken=${resetToken}`
              };
  
              transport.sendMail(message, function(err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                }
              });
  
              res.json({ message: "Reset password email sent" });
            }
          );
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

  // Reset Password Endpoint
  router.post("/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      db.query(
        'SELECT * FROM user_login WHERE token = ?',
        [token],
        async (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: "Server Error" });
          }

          if (!results || results.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }

          const user = results[0];
          const newHashedPassword = bcrypt.hashSync(newPassword, 10);

          db.query(
            'UPDATE user_login SET userPassword = ?, token = NULL WHERE user_id = ?',
            [newHashedPassword, user.user_id],
            (error) => {
              if (error) {
                console.error('Error updating password:', error);
                return res.status(500).json({ error: "Server Error" });
              }

              res.json({ message: "Password reset successful" });
            }
          );
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  });

  return router;
}

module.exports = UserLoginController;
