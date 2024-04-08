const authenticateToken = require('../authenticateToken');

const RiderRideController = (app, db) => {
    // Endpoint to get ride requests
    app.get('/requested-rides', authenticateToken, async (req, res) => {
        const riderId = req.user.userId; // Extract riderId directly from decoded JWT token in req.user

        // Ensure riderId is present in the decoded token
        if (!riderId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Missing rider ID in token' });
        }

        try {
            // Fetch requested ride details from the database based on riderId
            const [requestedRides] = await db.promise().query(`
                SELECT * FROM ride_requests WHERE rider_id = ?
            `, [riderId]);

            res.status(200).json({ success: true, requestedRides });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
   
   


}

module.exports = RiderRideController;
