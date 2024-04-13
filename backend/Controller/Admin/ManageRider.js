const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const db = require('../your-database-connection-file'); // Import your database connection

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'fyp',
    connectTimeout: 60000,
  }).promise();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile-pictures');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
  })
});

const ManageRiderController = (app ) => {
  app.get('/riders', async (req, res) => {
    try {
      const [riders] = await db.query('SELECT * FROM bloodbank_riders');
      res.json({ riders });
    } catch (error) {
      console.error('Error fetching blood bank riders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/rider/edit/:riderId', upload.single('avatar'), async (req, res) => {
    try {
      const riderId = req.params.riderId;
      const updatedRiderData = req.body;
  
      if (Object.keys(updatedRiderData).length === 0 && !req.file) {
        return res.status(400).json({ error: 'No fields provided for update' });
      }
  
      const setClause = [];
      const params = [];
  
      for (const [key, value] of Object.entries(updatedRiderData)) {
        setClause.push(`${key} = ?`);
        params.push(value);
      }
  
      if (req.file) {
        setClause.push('avatar = ?');
        params.push(req.file.filename);
      }
  
      const updateQuery = `UPDATE bloodbank_riders SET ${setClause.join(', ')} WHERE rider_id = ?`;
      params.push(riderId);
  
      await db.query(updateQuery, params);
      res.json({ message: 'Rider details updated successfully' });
    } catch (error) {
      console.error('Error updating rider details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/rider/:riderId', async (req, res) => {
    try {
      const riderId = req.params.riderId;

      await db.query('DELETE FROM rider_login WHERE rider_id = ?', [riderId]);
      await db.query('DELETE FROM bloodbank_riders WHERE rider_id = ?', [riderId]);

      res.json({ message: 'Rider deleted successfully' });
    } catch (error) {
      console.error('Error deleting rider:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

module.exports = ManageRiderController;
