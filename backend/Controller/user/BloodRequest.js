const authenticateToken = require('../authenticateToken');

const BloodRequestController = (app, db) => {
  // Apply authentication middleware to the blood donation request route
  app.post("/login/stf/request", authenticateToken, async (req, res) => {
    const { bloodGroup, unit, patientName, patientAddress, patientContact } = req.body;
  
    // Validate input fields
    if (!bloodGroup || !unit || !patientName || !patientAddress || !patientContact) {
      return res.status(400).send({ message: "Invalid request. Missing required fields." });
    }
  
    try {
      // Ensure req.userId is defined and not null after authentication middleware
      if (!req.user || !req.user.userId || req.user.userId === null) {
        return res.status(401).send({ message: "Unauthorized. Missing or invalid user ID." });
      }
  
      const connection = await db.promise();
      await connection.beginTransaction();
  
      try {
        // Assuming user details are stored in the user_details table
        const [userDetails] = await connection.execute('SELECT userRole FROM user_details WHERE Id = ?', [req.user.userId]);
  
        if (userDetails.length > 0 && userDetails[0].userRole === 'Recipient') {
          // Check if a request with the same patient name and blood group already exists
          const [existingRequest] = await connection.execute('SELECT * FROM blood_request WHERE patient_name = ? AND blood_group = ? AND  patient_address = ? AND patient_contact =?', [patientName, bloodGroup,patientAddress, patientContact,]);
  
          if (existingRequest.length > 0) {
            return res.status(400).send({ message: "A blood request with the same patient name and blood group already exists.", status: "REQUEST_HELD" });
          }
  
          // Continue processing the request
          const [bloodInventory] = await connection.execute('SELECT * FROM blood_inventory WHERE blood_group = ?', [bloodGroup]);
  
          if (bloodInventory.length > 0 && unit <= bloodInventory[0].current_stock) {
            // Deduct units from blood inventory
            await connection.execute('UPDATE blood_inventory SET current_stock = current_stock - ? WHERE blood_group = ?', [unit, bloodGroup]);
  
            // Insert blood request into the database
            await connection.execute('INSERT INTO blood_request (blood_group, unit, patient_name, patient_address, patient_contact, user_id) VALUES (?, ?, ?, ?, ?, ?)', [bloodGroup, unit, patientName, patientAddress, patientContact, req.user.userId]);
            await connection.commit();
  
            return res.send({ message: "REQUEST ACCEPTED. COLLECT IT FROM THE BLOOD BANK", status: "REQUEST_ACCEPTED" });
          } else {
            // Handle insufficient stock
            return res.send({ message: "INSUFFICIENT STOCKS!", status: "INSUFFICIENT_STOCKS" });
          }
        } else {
          // Handle permission denied
          return res.status(403).send({ message: "Permission denied. User is not a recipient.", status: "PERMISSION_DENIED" });
        }
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    } catch (error) {
      console.error("Error processing blood request:", error);
      if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
      }
    }
  });
  

  app.get("/login/stf/request", authenticateToken, async (req, res) => {
    try {
        // Ensure req.userId is defined and not null after authentication middleware
        if (!req.user || !req.user.userId || req.user.userId === null) {
            return res.status(401).send({ message: "Unauthorized. Missing or invalid user ID." });
        }

        const connection = await db.promise();

        try {
            const [bloodRequests] = await connection.execute('SELECT * FROM blood_request WHERE user_id = ?', [req.user.userId]);

            if (bloodRequests.length === 0) {
                return res.status(404).send({ message: "No blood requests found for this user." });
            }

            res.send(bloodRequests);
        } catch (error) {
            throw error;
        }
    } catch (error) {
        console.error("Error fetching blood requests by user ID:", error);
        res.status(500).send("Internal Server Error");
    }
});

};

module.exports = BloodRequestController;
