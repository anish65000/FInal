const authenticateToken = require('../authenticateToken');
const WebSocket = require('ws');

const DonorNotification = (app, db, wss) => {
  wss.on('connection', ws => {
    console.log('WebSocket connected');

    ws.send(JSON.stringify({ type: 'connected' }));

    ws.on('message', message => {
      console.log('Received message:', message);
    });

    ws.on('close', () => {
      console.log('WebSocket disconnected');
    });
  });

  app.get('/donor-notifications', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
      const [notifications] = await db.promise().query(`
          SELECT 
              dr.user_id, 
              dr.message,
              ud.userName
          FROM 
              donor_requests dr
              join
              premium_donors pd on dr.donor_id = pd.premium_donor_id 
          JOIN 
              user_details ud ON pd.user_id = ud.id
              
          WHERE 
              dr.donor_id = ?`, [userId]);

      res.json(notifications); // Send notifications as JSON response

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
};

module.exports = DonorNotification;
