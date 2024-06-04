
const authenticateToken = require('../../authenticateToken');
const WebSocket = require('ws');

const RiderNotification = (app, db,wss) => {
   // Create WebSocket server

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

  app.get('/rider-notifications', authenticateToken, async (req, res) => {
    const riderId = req.user.userId;
    try {
      const [notifications] = await db.promise().query(
        `
        SELECT
        recipient_name,
          destination
        FROM ride_requests 
        WHERE rider_id = ?
        `,
        [riderId]
      );

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      notifications.forEach((notification) => {
        res.write(
          JSON.stringify({
            recipient_name: notification.recipient_name,
            destination: notification.destination,
          })
        );
      });

      notifications.forEach((notification) => {
        const data = {
          type: 'new-request',
          data: {
            recipient_name: notification.recipient_name,
            destination: notification.destination,
          },
        };
        wss.clients.forEach(client => {
          client.send(JSON.stringify(data)); // Broadcast new request notification to all connected clients
        });
      });

      res.end(); // End the response
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
};

module.exports = RiderNotification;