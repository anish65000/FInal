const authenticateToken = require('../authenticateToken'); // Ensure the path is correct

const GetUrgentController = (app, db) => {
  app.get('/donor/urgentrequests', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const [urgentRequests] = await db.promise().query(`
        SELECT ur.*, rr.*, ud.userName AS donor_name, ud.userPhone AS donor_phone, ur.Recipent_name AS recipient_name 
        FROM urgent_requests ur 
        INNER JOIN ride_requests rr ON ur.id = rr.request_id 
        INNER JOIN user_details ud ON rr.donor_id = ud.id 
        WHERE rr.status = 'ended' AND ur.user_id = ?
      `, [userId]);

      res.status(200).json({ success: true, urgentRequests });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.post('/donor/rate', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { requestId, donorId, rating } = req.body;

      if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'Invalid rating value' });
      }

      // Check if the request is valid and belongs to the user
      const [existingRequest] = await db.promise().query(`
        SELECT * FROM ride_requests rr
        INNER JOIN urgent_requests ur ON rr.request_id = ur.id
        WHERE rr.request_id = ? AND ur.user_id = ? AND rr.status = 'ended'
      `, [requestId, userId]);

      if (!existingRequest || !existingRequest[0]) {
        return res.status(400).json({ success: false, message: 'Invalid request ID or the request does not belong to the user' });
      }

      // Check if the donor participated in the request
      const [donorParticipation] = await db.promise().query(`
        SELECT * FROM ride_requests
        WHERE request_id = ? AND donor_id = ?
      `, [requestId, donorId]);

      if (!donorParticipation || donorParticipation.length === 0) {
        return res.status(400).json({ success: false, message: 'The specified donor did not participate in this request' });
      }

      // Check if the rating already exists for this request and donor
      const [existingRating] = await db.promise().query(`
        SELECT * FROM donor_ratings
        WHERE donor_id = ? AND rated_by_user_id = ? AND request_id = ?
      `, [donorId, userId, requestId]);

      if (existingRating.length > 0) {
        return res.status(400).json({ success: false, message: 'You have already rated this donor for this request' });
      }

      // Insert the new rating
      await db.promise().query(`
        INSERT INTO donor_ratings (donor_id, rating, rated_by_user_id, request_id)
        VALUES (?, ?, ?, ?)
      `, [donorId, rating, userId, requestId]);

      res.status(200).json({ success: true, message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
};

module.exports = GetUrgentController;
