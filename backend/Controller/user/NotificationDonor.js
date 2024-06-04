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
              dr.recipient_name
          FROM 
              donor_requests dr
              JOIN
              premium_donors pd ON dr.donor_id = pd.premium_donor_id 
          JOIN 
              user_details ud ON pd.user_id = ud.id
              
          WHERE 
              dr.donor_id = ?`, [userId]);

      res.json(notifications);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/donation/status', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }

    const userId = req.user.userId;

    try {
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

        if (status === 'approved') {
            const message = 'Your blood donation is accepted!';
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

  app.get('/urgentrequest', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }

    const userId = req.user.userId;

    try {
        const [urgentRequest] = await db.promise().query(`
            SELECT 
                ur.message,
                ur.location,
                ur.Recipent_name
            FROM 
                urgent_requests ur
                JOIN
                premium_donors pd ON ur.donor_id = pd.premium_donor_id 
            JOIN 
                user_details ud ON pd.user_id = ud.id
                
            WHERE 
                ur.donor_id = ?`, [userId]);
            

        if (urgentRequest.length === 0) {
            return res.status(404).json({ message: 'Urgent request not found' });
        }

        const { message, location, Recipent_name } = urgentRequest[0];
        
        // Send urgent request details to WebSocket client
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'urgentRequest', recipient: Recipent_name, message, location }));
        });

        res.status(200).json({ message: 'Urgent request sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/confirmed-appointments', authenticateToken, async (req, res) => {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
    }
  
    const userId = req.user.userId;
  
    try {
      const [appointments] = await db.promise().query(`
          SELECT 
              cr.slot_time
          FROM 
              confirmedappointments cr
              JOIN user_details ud ON cr.user_id = ud.id
          WHERE 
              cr.user_id = ?`, [userId]);
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No confirmed appointments found' });
      }
  
      const { slot_time } = appointments[0];
  
      res.status(200).json({ slot_time });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
};

module.exports = DonorNotification;
