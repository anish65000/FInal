const express = require('express');
const authenticateToken = require('../authenticateToken');

const DonationRequestController = (db) => {
  const router = express.Router();

  router.get('/donar-request', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const query = `
      SELECT dr.*
      FROM donor_requests dr
      JOIN premium_donors pd ON dr.donor_id = pd.user_id
      JOIN user_details ud ON pd.user_id = ud.id
      WHERE ud.id = ?;
    `;

    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(results);
    });
  });

  router.patch('/update-status', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const { status } = req.body;

    if (!['confirm', 'denied'].includes(status)) {
      return res.status(400).json({ error: "Invalid status provided" });
    }

    const updateQuery = `
      UPDATE donor_requests dr
      JOIN premium_donors pd ON dr.donor_id = pd.user_id
      JOIN user_details ud ON pd.user_id = ud.id
      SET dr.status = ?
      WHERE ud.id = ?;
    `;

    db.query(updateQuery, [status, userId], (error, result) => {
      if (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Status updated successfully" });
      } else {
        res.status(404).json({ error: "No requests found for the user" });
      }
    });
  });

  return router;
};

module.exports = DonationRequestController;
