const authenticateToken = require('../authenticateToken'); 

const RequestController = (app, db) => {
  // Endpoint to fetch blood request history
  app.get('/login/stf/history', authenticateToken, async (req, res) => {
    // Ensure req.user is defined after authentication middleware
    if (!req.user || !req.user.userId) {
        console.log("User ID missing in token:", req.user); // Log req.user for debugging
        return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }

    try {
      // Fetch blood request history from the database
      const [rows, fields] = await db.promise().query('SELECT * FROM blood_request');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching blood request history:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Endpoint to delete a blood request
  app.delete('/login/stf/request/:requestId', authenticateToken, async (req, res) => {
    const { requestId } = req.params;
  
    // Ensure req.user is defined after authentication middleware
    if (!req.user || !req.user.userId) {
      console.log("User ID missing in token:", req.user); // Log req.user for debugging
      return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }
  
    try {
      // Delete the blood request with the given requestId from the database
      await db.promise().query('DELETE FROM blood_request WHERE id = ?', [requestId]);
      res.json({ message: 'Blood request deleted successfully' }); // Send success message
    } catch (error) {
      console.error('Error deleting blood request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}  

module.exports = RequestController;
