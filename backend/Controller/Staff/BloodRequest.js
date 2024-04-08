const authenticateToken = require('../authenticateToken');

const BloodRequestController = (app, db) => {
  // Apply authentication middleware to the blood donation request route
  app.post("/login/stf/request", authenticateToken, async (req, res) => {
    const { bloodGroup, unit, patientName, patientAddress, patientContact } = req.body;

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
        console.log("req.user.userId:", req.user.userId);
        const [userDetails] = await connection.execute('SELECT userRole FROM user_details WHERE Id = ?', [req.user.userId]);

        if (userDetails.length > 0 && userDetails[0].userRole === 'Recipient') {
          const [bloodInventory] = await connection.execute('SELECT * FROM blood_inventory WHERE blood_group = ?', [bloodGroup]);

          if (bloodInventory.length > 0 && unit <= bloodInventory[0].current_stock) {
            await connection.execute('UPDATE blood_inventory SET current_stock = current_stock - ? WHERE blood_group = ?', [unit, bloodGroup]);

            console.log("Inserting into blood_request table with values:", [bloodGroup, unit, patientName, patientAddress, patientContact, req.user.userId]);
            // Ensure all parameters are defined before executing the query
            const params = [bloodGroup, unit, patientName, patientAddress, patientContact, req.user.userId];
            if (params.some(param => param === undefined)) {
              return res.status(400).send({ message: "Invalid request. Missing required fields." });
            }

            await connection.execute('INSERT INTO blood_request (blood_group, unit, patient_name, patient_address, patient_contact, user_id) VALUES (?, ?, ?, ?, ?, ?)', params);
            await connection.commit();

            if (!res.headersSent) {
              res.send({ message: "REQUEST ACCEPTED. COLLECT IT FROM THE BLOOD BANK" });
            }
          } else {
            if (!res.headersSent) {
              res.send({ message: "INSUFFICIENT STOCKS!" });
            }
          }
        } else {
          if (!res.headersSent) {
            res.status(403).send({ message: "Permission denied. User is not a recipient." });
          }
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
