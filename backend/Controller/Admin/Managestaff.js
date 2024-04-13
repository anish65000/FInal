const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

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

const ManageStaffController = (app) => {
  app.get('/staffs', async (req, res) => {
    try {
      const [staff] = await db.query('SELECT * FROM stf_details');
      res.json({ staff });
    } catch (error) {
      console.error('Error fetching staff members:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/staff/edit/:staffId', upload.single('avatar'), async (req, res) => {
    try {
      const staffId = req.params.staffId;
      const updatedStaffData = req.body;
  
      if (Object.keys(updatedStaffData).length === 0 && !req.file) {
        return res.status(400).json({ error: 'No fields provided for update' });
      }
  
      const setClause = [];
      const params = [];
  
      for (const [key, value] of Object.entries(updatedStaffData)) {
        setClause.push(`${key} = ?`);
        params.push(value);
      }
  
      if (req.file) {
        setClause.push('avatar = ?');
        params.push(req.file.filename);
      }
  
      const updateQuery = `UPDATE stf_details SET ${setClause.join(', ')} WHERE id = ?`;
      params.push(staffId);
  
      await db.query(updateQuery, params);
      res.json({ message: 'Staff details updated successfully' });
    } catch (error) {
      console.error('Error updating staff details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/staff/:staffId', async (req, res) => {
    try {
      const staffId = req.params.staffId;

      await db.query('DELETE FROM stf_login WHERE staff_id = ?', [staffId]);
      await db.query('DELETE FROM stf_details WHERE id = ?', [staffId]);

      res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
      console.error('Error deleting staff member:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

module.exports = ManageStaffController;
