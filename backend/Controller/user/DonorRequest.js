// DonorController.js

const express = require('express');
const authenticateToken = require('../authenticateToken');

const DonorController = (app, db) => {
  const router = express.Router();

  router.post('/api/request-blood/:donorId', authenticateToken, async (req, res) => {
    const donorId = req.params.donorId;
    const userId = req.user.userId;
    const { message,patient_name } = req.body;

    try {
      const [donorResult] = await db.promise().query('SELECT * FROM premium_donors WHERE premium_donor_id = ?', [donorId]);
      if (!donorResult.length) {
        return res.status(404).json({ success: false, message: 'Donor not found' });
      }

      const [existingRequest] = await db.promise().query('SELECT * FROM donor_requests WHERE donor_id = ? AND user_id = ?', [donorId, userId]);
      if (existingRequest.length) {
        return res.status(400).json({ success: false, message: 'You have already requested blood from this donor' });
      }

      await db.promise().query('INSERT INTO donor_requests (donor_id, user_id, requested_at, message, patient_name, status) VALUES (?, ?, NOW(), ?, ?,?)', [donorId, userId, message, patient_name,'pending']);

      res.status(200).json({ success: true, message: 'Blood request sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  router.post('/api/urgentrequest/:donorId', authenticateToken, async (req, res) => {
    const donorId = req.params.donorId;
    const userId = req.user.userId;
    const { message, timeRequiredInMinutes } = req.body;

    try {
      const [donorResult] = await db.promise().query('SELECT * FROM premium_donors WHERE premium_donor_id = ?', [donorId]);
      if (!donorResult.length) {
        return res.status(404).json({ success: false, message: 'Donor not found' });
      }

      const [existingRequest] = await db.promise().query('SELECT * FROM urgent_requests WHERE donor_id = ? AND user_id = ?', [donorId, userId]);
      if (existingRequest.length) {
        return res.status(400).json({ success: false, message: 'You have already requested blood from this donor' });
      }

      const currentTime = new Date();
      const timeRequiredInMillis = timeRequiredInMinutes * 60 * 1000; // Convert minutes to milliseconds
      const requiredByTime = new Date(currentTime.getTime() + timeRequiredInMillis);

      await db.promise().query('INSERT INTO urgent_requests (donor_id, user_id, requested_at, required_by_time, message) VALUES (?, ?, NOW(), ?, ?)', [donorId, userId, requiredByTime, message]);

      const responseObj = { success: true, message: 'Blood request sent successfully', requiredByTime: requiredByTime.toISOString().replace('Z', '') };

      res.status(200).json(responseObj);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.use( router);
};

module.exports = DonorController;
