const startRideController = (app, db, authenticateToken) => {
  // Endpoint to start the ride
  app.post('/start-ride/:donorId', authenticateToken, async (req, res) => {
    const donorId = req.params.donorId;
    const riderId = req.user.userId;
    const { location, startTime } = req.body;
    console.log(donorId);

    try {
      // Check if the ride already exists and is not ended
      const [existingRides] = await db.promise().query(`
        SELECT ride_id, status 
        FROM started_rides 
        WHERE donor_id = ?
      `, [donorId]);

      // Check if there is an existing 'started' ride
      const existingStartedRide = existingRides.find(ride => ride.status === 'started');
      if (existingStartedRide) {
        return res.status(400).json({ success: false, message: 'Ride already in progress' });
      }

      // Check if the ride belongs to the authenticated rider
      const [ride] = await db.promise().query(`
        SELECT ride_id 
        FROM ride_requests 
        WHERE donor_id = ? AND rider_id = ?
      `, [donorId, riderId]);

      if (ride.length === 0) {
        return res.status(404).json({ success: false, message: 'Ride not found or unauthorized to start the ride' });
      }

      // Insert record into started_rides table with location and start time
      await db.promise().query(`
        INSERT INTO started_rides (donor_id, ride_id, location, start_time, status) 
        VALUES (?, ?, ?, ?, 'started')
      `, [donorId, ride[0].ride_id, location, startTime]);

      // Update the ride status to indicate that it has started in ride_requests table
      await db.promise().query(`
        UPDATE ride_requests 
        SET status = 'started' 
        WHERE ride_id = ?
      `, [ride[0].ride_id]);

      res.status(200).json({ success: true, message: 'Ride started successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  // Endpoint to end the ride
  app.post('/end-ride/:donorId', authenticateToken, async (req, res) => {
    const donorId = req.params.donorId;
    const riderId = req.user.userId;
    const { location, endTime } = req.body;
    console.log(donorId);

    try {
      // Check if the ride is in progress and belongs to the authenticated rider
      const [ride] = await db.promise().query(`
        SELECT sr.ride_id 
        FROM started_rides sr 
        INNER JOIN ride_requests rr ON sr.ride_id = rr.ride_id
        WHERE sr.donor_id = ? AND rr.rider_id = ? AND sr.status = 'started'
      `, [donorId, riderId]);

      if (ride.length === 0) {
        return res.status(404).json({ success: false, message: 'Ride not found or unauthorized to end the ride' });
      }

      // Update record in started_rides table with location and end time
      await db.promise().query(`
        UPDATE started_rides 
        SET location = ?, end_time = ?, status = 'ended' 
        WHERE ride_id = ?
      `, [location, endTime, ride[0].ride_id]);

      // Update the ride status to indicate that it has ended in ride_requests table
      await db.promise().query(`
        UPDATE ride_requests 
        SET status = 'ended' 
        WHERE ride_id = ?
      `, [ride[0].ride_id]);

      res.status(200).json({ success: true, message: 'Ride ended successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/ride-status/:donorId', authenticateToken, async (req, res) => {
    const donorId = req.params.donorId;

    try {
      const [rides] = await db.promise().query(`
        SELECT status
        FROM ride_requests
        WHERE donor_id = ?
      `, [donorId]);

      if (rides.length === 0) {
        return res.status(404).json({ success: false, message: 'Ride not found' });
      }

      res.status(200).json({ success: true, status: rides[0].status });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

};

module.exports = startRideController;
