const authenticateToken = require('../authenticateToken');
const WebSocket = require('ws'); // Import WebSocket library

module.exports = function ManageDonationController(app, db) {
    const wss = new WebSocket.Server({ port: 8090 }); // Create WebSocket server

    // WebSocket connection event
    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');

        ws.on('close', () => {
            console.log('Client disconnected from WebSocket');
        });
    });

    // Endpoint to get all donations
    app.get('/donations', authenticateToken, async (req, res) => {
        // Ensure req.user is defined after authentication middleware
        if (!req.user || !req.user.userId) {
            console.log("User ID missing in token:", req.user); // Log req.user for debugging
            return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
        }

        try {
            // Fetch donation records
            const [donations] = await db.promise().execute('SELECT * FROM blood_donations');

            res.status(200).json(donations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // Endpoint to approve or decline a donation
    app.patch('/donation/:donationId/status', authenticateToken, async (req, res) => {
        const { donationId } = req.params;
        const { status } = req.body;

        // Ensure req.user is defined after authentication middleware
        if (!req.user || !req.user.userId) {
            console.log("User ID missing in token:", req.user); // Log req.user for debugging
            return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
        }

        try {
            // Check if the user is authorized (staff or admin)
            const [userDetails] = await db.promise().execute('SELECT stfStaffType FROM stf_details WHERE id = ?', [req.user.userId]);

            if (userDetails.length === 0 || (userDetails[0].stfStaffType !== 'Staff' && userDetails[0].stfStaffType !== 'Admin')) {
                return res.status(403).json({ message: "Permission denied: User is not authorized to approve or decline donations." });
            }

            // Update the status of the donation
            const [updateResult] = await db.promise().execute(
                'UPDATE blood_donations SET status = ? WHERE id = ?',
                [status, donationId]
            );

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Donation not found' });
            }

            // If status changed to "approved", send notification to donor via WebSocket
            if (status === 'approved') {
                const donation = await db.promise().query('SELECT donorId FROM blood_donations WHERE id = ?', [donationId]);
                const donorId = donation[0][0].donorId;
                const message = 'Your blood donation is accepted!';
                // Send notification message to WebSocket client (donor)
                wss.clients.forEach((client) => {
                    client.send(JSON.stringify({ recipient: donorId, message }));
                });
            }

            res.status(200).json({ message: 'Donation status updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};
