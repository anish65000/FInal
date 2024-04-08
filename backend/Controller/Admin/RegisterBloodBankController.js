const bcrypt = require('bcrypt');
const axios = require('axios');

const BloodbankController = (app, db) => {

  // POST endpoint for registering a new blood bank
  app.post('/register/bloodbank', async (req, res) => {
    const {
      name,
      category,
      phone,
      district,
      address,
      latitude,
      longitude,
      email
    } = req.body;
  
    // Validate request body
    if (!name || !category || !phone || !district || !email || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Insert new blood bank into the blood_banks table
      const [result] = await db.promise().query(`
        INSERT INTO blood_bank
        (name, category, phone, district, address, latitude, longitude, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        name,
        category,
        phone,
        district,
        address,
        latitude,
        longitude,
        email
      ]);
  
      const newBloodBank = {
        id: result.insertId,
        name,
        category,
        phone,
        district,
        address,
        latitude,
        longitude,
        email
      };
  
      console.log(`Blood bank registered successfully. ID: ${newBloodBank.id}, Email: ${newBloodBank.email}`);
      res.status(201).json(newBloodBank);
    } catch (error) {
      // Check for duplicate key violation error
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`Blood bank registration failed. Email ${email} already exists.`);
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      console.error('Error registering blood bank:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
  app.put('/update/bloodbank/:id', async (req, res) => {
    const bloodBankId = req.params.id;
    const {
      name,
      category,
      phone,
      district,
      address,
      latitude,
      longitude,
      email
    } = req.body;
  
    // Validate request body
    if (!name || !category || !phone || !district || !email || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Check if blood bank with given ID exists
      const [existingBloodBank] = await db.promise().query('SELECT * FROM blood_bank WHERE id = ?', [bloodBankId]);
  
      if (existingBloodBank.length === 0) {
        console.log(`Blood bank with ID ${bloodBankId} not found.`);
        return res.status(404).json({ error: 'Blood bank not found' });
      }
  
      // Update blood bank information
      await db.promise().query(`
        UPDATE blood_bank
        SET name = ?, category = ?, phone = ?, district = ?, email = ?, address = ?, latitude = ?, longitude = ?
        WHERE id = ?`, [
        name,
        category,
        phone,
        district,
        email,
        address,
        latitude,
        longitude,
        bloodBankId
      ]);


  
      console.log(`Blood bank with ID ${bloodBankId} updated successfully.`);
      res.status(200).json({ message: 'Blood bank updated successfully' });
    } catch (error) {
      // Check for duplicate key violation error
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`Blood bank update failed. Email ${email} already exists.`);
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      console.error('Error updating blood bank:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/bloodbanks', async (req, res) => {
    try {
      // Retrieve all blood banks
      const [bloodBanks] = await db.promise().query('SELECT * FROM blood_bank');
  
      res.status(200).json(bloodBanks);
    } catch (error) {
      console.error('Error retrieving blood banks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // POST endpoint for adding blood stock
  app.post('/bloodbank/addstock', async (req, res) => {
    const {
      blood_bank_id,
      blood_group,
      units,
      blood_status
    } = req.body;

    

    // Validate request body
    if (!blood_bank_id || !blood_group || !units || !blood_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Check if the blood bank exists
      const bloodBankExists = await db.query('SELECT COUNT(*) as count FROM blood_bank WHERE id = ?', [blood_bank_id]);

      if (bloodBankExists[0].count === 0) {
        console.log(`Blood stock addition failed. Blood bank with ID ${blood_bank_id} not found.`);
        return res.status(404).json({ error: 'Blood bank not found' });
      }

      // Check if blood stock for the specified blood group already exists for the blood bank
      const bloodStockExists = await db.query('SELECT COUNT(*) as count FROM bank_blood_stock WHERE blood_bank_id = ? AND blood_group = ?', [blood_bank_id, blood_group]);

      if (bloodStockExists[0].count > 0) {
        console.log(`Blood stock addition failed. Blood stock for blood group ${blood_group} already exists for blood bank with ID ${blood_bank_id}.`);
        return res.status(400).json({ error: 'Blood stock for the specified blood group already exists' });
      }

      // Insert new blood stock into the blood_stock table
      const result = await db.query(`
        INSERT INTO bank_blood_stock
        (blood_bank_id, blood_group, units, blood_status)
        VALUES (?, ?, ?, ?)`, [
        blood_bank_id,
        blood_group,
        units,
        blood_status
      ]);

      const newBloodStock = {
        id: result.insertId,
        blood_bank_id,
        blood_group,
        units,
        blood_status
      };

      console.log(`Blood stock added successfully. ID: ${newBloodStock.id}, Blood Bank ID: ${newBloodStock.blood_bank_id}`);
      res.status(201).json(newBloodStock);
    } catch (error) {
      console.error('Error adding blood stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // POST endpoint for blood donation
  app.post('/bloodbank/request', async (req, res) => {
    const {
      blood_bank_id,
      blood_group,
      units_needed,
    } = req.body;

    // Validate request body
    if (!blood_bank_id || !blood_group || !units_needed) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Check if the blood bank exists
      const bloodBankExists = await db.query('SELECT COUNT(*) as count FROM blood_bank WHERE id = ?', [blood_bank_id]);

      if (bloodBankExists[0].count === 0) {
        console.log(`Blood request failed. Blood bank with ID ${blood_bank_id} not found.`);
        return res.status(404).json({ error: 'Blood bank not found' });
      }

      // Insert blood request into the blood_requests table
      const result = await db.query(`
        INSERT INTO blood_requests
        (blood_bank_id, blood_group, units_needed)
        VALUES (?, ?, ?)`, [
        blood_bank_id,
        blood_group,
        units_needed,
      ]);

      const newBloodRequest = {
        id: result.insertId,
        blood_bank_id,
        blood_group,
        units_needed,
      };

      console.log(`Blood request added successfully. ID: ${newBloodRequest.id}, Blood Bank ID: ${newBloodRequest.blood_bank_id}`);
      res.status(201).json(newBloodRequest);
    } catch (error) {
      console.error('Error adding blood request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 



  app.delete('/bloodbank/:id', async (req, res) => {
    const bloodBankId = req.params.id;
  
    try {
      // Check if the blood bank with the given ID exists
      const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM blood_bank WHERE id = ?', [bloodBankId]);
      const bloodBankExists = rows[0].count;
  
      if (bloodBankExists === 0) {
        console.log(`Blood bank deletion failed. Blood bank with ID ${bloodBankId} not found.`);
        return res.status(404).json({ error: 'Blood bank not found' });
      }
  
      // Delete blood bank by ID
      await db.promise().query('DELETE FROM blood_bank WHERE id = ?', [bloodBankId]);
  
      console.log(`Blood bank deleted successfully. ID: ${bloodBankId}`);
      res.status(200).json({ message: 'Blood bank deleted successfully' });
    } catch (error) {
      console.error('Error deleting blood bank:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  

  
};

module.exports = BloodbankController;
