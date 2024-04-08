const bcrypt = require('bcrypt');
const express = require('express');
const upload = require('./multerConfig'); // Import Multer configuration

const StaffRegisterController = (app, db) => {
  const query = async (sql, params) => {
    try {
      const [results, fields] = await db.promise().query(sql, params);
      return results;
    } catch (error) {
      throw error;
    }
  };

  // Route to handle staff registration
  app.post("/reg/stf", upload.single('avatar'), async (req, res) => {
    try {
      const {
        stfName,
        stfEmail,
        stfPhone,
        stfAddress,
        stfUserName,
        stfPassword,
        stfStaffType
      } = req.body;

      // Handle file upload if avatar is present in the request
      const avatar = req.file;
      let imagePath = '';
      if (avatar) {
        imagePath = avatar.path;
      }

      const existingStaff = await query('SELECT * FROM stf_login WHERE userName = ?', [stfUserName]);

      if (existingStaff.length > 0) {
        return res.status(400).send({ message: "Staff username already exists" });
      }

      const hashedPassword = await bcrypt.hash(stfPassword, 10);

      const connection = await db.promise();
      try {
        const [staffDetailsResult] = await connection.query(
          'INSERT INTO stf_details (stfName, stfMail, stfPhone, stfAddress, stfStaffType, avatar) VALUES (?, ?, ?, ?, ?, ?)',
          [stfName, stfEmail, stfPhone, stfAddress, stfStaffType, imagePath]
        );

        const staffId = staffDetailsResult.insertId;

        await connection.query(
          'INSERT INTO stf_login (stf_id, userName, password, stfStaffType) VALUES (?, ?, ?, ?)',
          [staffId, stfUserName, hashedPassword, stfStaffType]
        );

        await connection.commit();

        console.log("Staff Registered Successfully");
        res.status(201).send({ success: true, message: "STAFF REGISTRATION SUCCESSFUL!" });
      } catch (err) {
        await connection.rollback();
        throw err;
      } 
    } catch (error) {
      console.error("Error during staff registration:", error);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  });
}

module.exports = StaffRegisterController;
