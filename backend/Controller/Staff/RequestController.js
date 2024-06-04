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
  
    const connection = await db.promise();
  
    try {
      // Begin transaction
      await connection.beginTransaction();
      
      // Fetch the blood request details
      const [requestDetails] = await connection.execute('SELECT blood_group, unit FROM blood_request WHERE id = ?', [requestId]);
  
      if (requestDetails.length === 0) {
        await connection.rollback();
        return res.status(404).json({ message: 'Blood request not found' });
      }
  
      const { blood_group, unit } = requestDetails[0];
  
      // Update the blood inventory to add the units back
      await connection.execute('UPDATE blood_inventory SET current_stock = current_stock + ? WHERE blood_group = ?', [unit, blood_group]);
  
      // Delete the blood request
      await connection.execute('DELETE FROM blood_request WHERE id = ?', [requestId]);
  
      // Commit transaction
      await connection.commit();
  
      res.json({ message: 'Blood request deleted successfully and inventory updated' });
    } catch (error) {
      // Rollback transaction in case of error
      await connection.rollback();
      console.error('Error deleting blood request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}  

module.exports = RequestController;
