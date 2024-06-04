const express = require('express');
const authenticateToken = require('../authenticateToken');
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'fyp',
  connectTimeout: 60000,
}).promise();

const ManageUserController = (app) => {
  // Endpoint to get all users
  app.get('/users', async (req, res) => {
    try {
      

      // Fetch all users from the database
      const [users] = await db.query('SELECT * FROM user_details');
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/admin/users', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10; // Default limit is 10 if not provided
      const offset = (page - 1) * limit;
  
      const query = 'SELECT * FROM user_details LIMIT ? OFFSET ?';
      const queryParams = [limit, offset];
  
      const countQuery = 'SELECT COUNT(*) as totalCount FROM user_details';
  
      // Fetch paginated users from the database
      const [users] = await db.query(query, queryParams);
  
      // Get the total count of users
      const [totalCount] = await db.query(countQuery);
  
      const totalPages = Math.ceil(totalCount[0].totalCount / limit);
  
      res.json({ users, totalPages, currentPage: page });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to update user details
  app.put('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId; // Corrected to req.params.userId
      const updatedUserData = req.body;
  
      // Assuming db is a valid database connection object
      await db.query('UPDATE user_details SET ? WHERE id = ?', [updatedUserData, userId]);
      res.json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to delete a user
  app.delete('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Delete the user from user_login table first
      await db.query('DELETE FROM user_login WHERE user_id = ?', [userId]);
      
      // Then delete the user from user_details table
      await db.query('DELETE FROM user_details WHERE id = ?', [userId]);
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}  


module.exports = ManageUserController;