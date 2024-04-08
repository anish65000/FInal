const authenticateToken = require('../authenticateToken');
const WebSocket = require('ws');

const RiderNotification = (app, db, wss) => {
  // Function to broadcast new request notifications to WebSocket clients
  const broadcastNewRequest = (data) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  app.get('/rider-notifications', authenticateToken, async (req, res) => {
    const riderId = req.user.riderId;

    try {
      const [notifications] = await db.promise().query(`
          SELECT 
              rr.rider_id, 
              rr.destination,
              rr.request_time
          FROM 
              ride_requests rr
          WHERE 
              rr.rider_id = ?`, [riderId]);

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      notifications.forEach(notification => {
        res.write(JSON.stringify({ riderId: notification.rider_id, destination: notification.destination, requestTime: notification.request_time }));
      });

      // Inside your route handler, when a new request comes in, broadcast it to WebSocket clients
      notifications.forEach(notification => {
        const data = { type: 'new-request', data: { riderId: notification.rider_id, destination: notification.destination, requestTime: notification.request_time } };
        broadcastNewRequest(data);
      });

      req.on('close', () => {
        // Handle client closing connection if needed
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


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
};

module.exports = RiderNotification;
