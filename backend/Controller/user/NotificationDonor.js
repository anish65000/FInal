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
              JOIN
              premium_donors pd ON dr.donor_id = pd.premium_donor_id 
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

  // Endpoint to get the status of a donation by ID
  app.get('/donation/status', authenticateToken, async (req, res) => {
    // Ensure req.user is defined after authentication middleware
    if (!req.user || !req.user.userId) {
        console.log("User ID missing in token:", req.user); // Log req.user for debugging
        return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }

    const userId = req.user.userId;

    try {
        // Fetch the status of the donation along with the username
        const [donationDetails] = await db.promise().query(`
            SELECT 
                bd.status, 
                ud.userName 
            FROM 
                blood_donations bd
                JOIN user_details ud ON bd.user_id = ud.id 
            WHERE 
                ud.id = ?`, [userId]);

        if (donationDetails.length === 0) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        const { status, userName } = donationDetails[0];

        // If status changed to "approved", send notification to donor via WebSocket
        if (status === 'approved') {
            const message = 'Your blood donation is accepted!';
            // Send notification message to WebSocket client (donor)
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({ recipient: userName, message }));
            });
        }

        res.status(200).json({ status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

};

module.exports = DonorNotification;
