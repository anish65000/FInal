const RiderrequestedController = (app, db, authenticateToken) => {
    // POST request for a rider to request a ride
    app.post('/requestride', authenticateToken, async (req, res) => {
        const { riderId, destination, requestId } = req.body;
        const { staffId } = req.user;

        try {
            // Validate required fields
            if (!riderId || !destination || !requestId) {
                return res.status(400).json({ success: false, message: 'Rider ID, destination, and request ID are required' });
            }

            // Check if there's an existing ride request for the given request ID
            const [existingRideRequest] = await db.promise().query(`
                SELECT * FROM ride_requests WHERE request_id = ?
            `, [requestId]);

            if (existingRideRequest.length > 0) {
                return res.status(409).json({ success: false, message: 'There is already a ride request associated with the provided request ID' });
            }

            // Retrieve donor details associated with the urgent request
            const [donorDetails] = await db.promise().query(`
                SELECT pd.*, ud.userName, ud.userPhone, ud.userAddress, pd.latitude, pd.longitude, ur.Recipent_name
                FROM urgent_requests ur 
                JOIN user_details ud ON ur.donor_id = ud.id
                JOIN premium_donors pd ON ud.id = pd.premium_donor_id
                WHERE ur.id = ?
            `, [requestId]);

            if (donorDetails.length === 0) {
                return res.status(404).json({ success: false, message: 'Donor details not found for the given request ID' });
            }

            // Insert the new ride request
            const result = await db.promise().query(`
                INSERT INTO ride_requests (rider_id, request_id, destination, donor_id, donor_details, latitude, longitude, userName, userPhone, staff_id, recipient_name)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                riderId,
                requestId,
                destination,
                donorDetails[0].premium_donor_id,
                JSON.stringify(donorDetails),
                donorDetails[0].latitude,
                donorDetails[0].longitude,
                donorDetails[0].userName,
                donorDetails[0].userPhone,
                staffId,
                donorDetails[0].Recipent_name
            ]);

            // Check if the insertion was successful
            if (result[0].affectedRows === 1) {
                return res.status(200).json({ success: true, message: 'Ride request created successfully', donorDetails });
            } else {
                return res.status(500).json({ success: false, message: 'Failed to create ride request' });
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
}

module.exports = RiderrequestedController;
