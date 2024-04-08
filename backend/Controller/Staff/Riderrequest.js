const riderRequestController = (app, db, authenticateToken) => {
    // POST request for a rider to request a ride
    app.post('/requestride', authenticateToken, async (req, res) => {
        // Extract relevant information from the request body
        const { riderId, destination, requestId } = req.body; // Assuming requestId is provided in the request body

        // Extract staff ID from the authenticated request
        const { staffId } = req.user; // Assuming staff ID is available in req.user after authentication

        try {
            // Check if there is already a ride request associated with the provided requestId
            const [existingRideRequest] = await db.promise().query(`
                SELECT * FROM ride_requests WHERE request_id = ?
            `, [requestId]);

            // If there is already a ride request, respond with a message indicating so
            if (existingRideRequest.length > 0) {
                return res.status(409).json({ success: false, message: 'There is already a ride request associated with the provided request ID' });
            }

            // Fetch premium donor details associated with the given request ID
            const [donorDetails] = await db.promise().query(`
                SELECT pd.*, ud.userName, ud.userPhone, ud.userAddress, pd.latitude, pd.longitude
                FROM urgent_requests ur 
                JOIN user_details ud ON ur.donor_id = ud.id
                JOIN premium_donors pd ON ud.id = pd.premium_donor_id
                WHERE ur.id = ?
            `, [requestId]);

            // Check if donor details were found
            if (donorDetails.length === 0) {
                return res.status(404).json({ success: false, message: 'Donor details not found for the given request ID' });
            }

            // Get current timestamp for request_time
            const requestTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: 'YYYY-MM-DD HH:MM:SS'

            // Insert the ride request into the database along with donor and user details
            const result = await db.promise().query(`
                INSERT INTO ride_requests (rider_id, request_id, destination, donor_id,donor_details, latitude, longitude, userName, userPhone, staff_id)
                VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?)
            `, [riderId, requestId, destination, donorDetails[0].premium_donor_id,JSON.stringify(donorDetails), donorDetails[0].latitude, donorDetails[0].longitude, donorDetails[0].userName, donorDetails[0].userPhone, staffId]);

            // Check if the ride request was successfully inserted
            if (result[0].affectedRows === 1) {
                // Respond with success message
                res.status(200).json({ success: true, message: 'Ride request created successfully', donorDetails });
            } else {
                // If insertion failed, respond with an error message
                res.status(500).json({ success: false, message: 'Failed to create ride request' });
            }
        } catch (error) {
            // If any error occurs during the process, respond with an error message
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
};

module.exports = riderRequestController;
