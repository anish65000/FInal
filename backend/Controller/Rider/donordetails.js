const RiderController = (app, db) => {
    
app.get('/urgentrequests', async (req, res) => {
    try {
        // Fetch urgent requests with user details (userName and userPhone)
        const [urgentRequests] = await db.promise().query('SELECT ur.*, ud.userName, ud.userPhone FROM urgent_requests ur INNER JOIN premium_donors pd ON ur.donor_id = pd.premium_donor_id JOIN user_details ud ON pd.user_id = ud.id ');

        // Sending the fetched urgent requests in the response
        res.status(200).json({ success: true, urgentRequests });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/urgentrequests/:id', async (req, res) => {
    try {
        const requestId = req.params.id;

        // Fetch urgent request with useyyyyyyyyyyyyr details (userName and userPhone) by ID
        const [urgentRequest] = await db.promise().query('SELECT ur.*, ud.userName, ud.userPhone FROM urgent_requests ur INNER JOIN user_details ud ON ur.user_id = ud.id WHERE ur.id = ?', [requestId]);

        if (urgentRequest.length === 0) {
            // If no urgent request found with the given ID
            return res.status(404).json({ success: false, message: 'Urgent request not found' });
        }

        // Sending the fetched urgent request in the response
        res.status(200).json({ success: true, urgentRequest: urgentRequest[0] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/ride-details/:donor_id',  async (req, res) => {
    const { donor_id } = req.params;

    try {
        // Fetch ride details from the database based on donor_id
        const [rideDetails] = await db.promise().query(`
            SELECT latitude, longitude, userName
            FROM ride_requests
            WHERE donor_id= ?
        `, [donor_id]);

        if (rideDetails.length === 0) {
            return res.status(404).json({ success: false, message: 'Ride details not found' });
        }

        res.status(200).json({ success: true, rideDetails: rideDetails[0] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



app.get('/donordetails', async (req, res) => {
    try {
        // Fetch urgent requests with user details (userName and userPhone)
        const [urgentRequests] = await db.promise().query('SELECT pd.* FROM urgent_requests ur INNER JOIN premium_donors pd ON ur.donor_id = pd.premium_donor_id JOIN user_details ud ON pd.user_id = ud.id ');

        // Sending the fetched urgent requests in the response
        res.status(200).json({ success: true, urgentRequests });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.get('/donordetails/:requestId', async (req, res) => {
    const requestId = req.params.requestId;

    try {
        // Fetch premium donor details associated with the given request ID
        const [donorDetails] = await db.promise().query(`
            SELECT pd.*, ud.userName,ur.user_id, ud.userPhone, ud.userAddress, pd.latitude, pd.longitude
            FROM urgent_requests ur JOIN user_details ud ON ur.donor_id = ud.id
            JOIN premium_donors pd ON ud.id = pd.premium_donor_id
            WHERE ur.id = ?
        `, [requestId]);

        // Check if donor details were found
        if (donorDetails.length === 0) {
            return res.status(404).json({ success: false, message: 'Donor details not found for the given request ID' });
        }

        // Sending the fetched donor details in the response
        res.status(200).json({ success: true, donorDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});









}

module.exports = RiderController
