// Endpoint to start the ride
app.post('/start-ride/:rideId', authenticateToken, async (req, res) => {
    const rideId = req.params.rideId;
    const riderId = req.user.userId; // Extract riderId directly from decoded JWT token in req.user
    const { location, startTime } = req.body;

    try {
        // Check if the ride belongs to the authenticated rider
        const [ride] = await db.promise().query(`
            SELECT rr.*, sr.donor_id, rr.destination
            FROM ride_requests rr
            INNER JOIN started_rides sr ON rr.id = sr.ride_id
            WHERE rr.id = ? AND rr.rider_id = ?
        `, [rideId, riderId]);

        if (ride.length === 0) {
            return res.status(404).json({ success: false, message: 'Ride not found or unauthorized to start the ride' });
        }

        // Insert record into started_rides table with location and start time
        await db.promise().query(`
            INSERT INTO started_rides (donor_id, ride_id, location, start_time, status) VALUES (?, ?, ?, ?, 'started')
        `, [ride[0].donor_id, rideId, location, startTime]);

        // Update the ride status to indicate that it has started in ride_requests table
        await db.promise().query(`
            UPDATE ride_requests SET status = 'started' WHERE id = ?
        `, [rideId]);

        res.status(200).json({ success: true, message: 'Ride started successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
