const DonorInventoryController = (app, db) => {
  // Get all donor stocks
  app.get("/login/stf/ds", (req, res) => {
    const sqlSelect = "SELECT * FROM donor_inventory;";

    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    });
  });

  // Update donor stocks units and new field
  const util = require('util');
  const queryAsync = util.promisify(db.query).bind(db);
  
  app.put("/login/stf/ds/update", async (req, res) => {
      try {
          const { donor_id, age, address, blood_group, email, donor_name,gender, phone } = req.body;
          const sqlUpdate = "UPDATE donor_inventory SET donor_name=?, blood_group=?, email=?, age=?, address=?, gender=? , phone=? WHERE id = ?;";
          
          // Execute the update statement
          const updateResult = await queryAsync(sqlUpdate, [donor_name, blood_group, email, age, address, phone,gender, donor_id]);
  
          // Check if the update was successful
          if (updateResult.affectedRows > 0) {
              // Fetch the updated record
              const sqlSelect = "SELECT * FROM donor_inventory WHERE id = ?;";
              const selectResult = await queryAsync(sqlSelect, [donor_id]);
  
              // Send the updated record as JSON response
              res.json({ success: true, message: "Blood stock updated successfully", data: selectResult[0] });
          } else {
              res.json({ success: false, message: "No records were updated." });
          }
      } catch (err) {
          console.log("**ERROR IN UPDATING BLOOD STOCK**" + err);
          res.status(500).send("Internal Server Error");
      }
  });
  

  // Insert new donor stocks
  app.post("/login/stf/ds/insert", (req, res) => {
    try {
      const { blood_group, age, email,address, donor_name, phone, gender } = req.body;
  
      if (!blood_group || !email || !age || !address || !donor_name || !phone || !gender) {
        return res.status(400).send({ message: "All fields are required." });
      }
  
      const sqlInsert = "INSERT INTO donor_inventory (blood_group, age,email, address, donor_name, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?);";
  
      db.query(sqlInsert, [blood_group, age,email,  address, donor_name, phone, gender], (err, result) => {
        if (err) {
          console.error('Error in inserting blood stock:', err);
          res.status(500).send("Internal Server Error");
        } else {
          const donorId = result.insertId;
          console.log('Blood stock inserted successfully with ID:', donorId);
  
          // Include the donor ID and success message in the response
          res.json({ message: 'Blood stock inserted successfully', donorId });
        }
      });
    } catch (error) {
      console.error("Error during blood stock insertion:", error);
      res.status(400).send({ message: "ERROR IN BLOOD STOCK INSERTION!" });
    }
  });
  

  
  // Delete donor stocks
  app.delete("/login/stf/ds/delete/:id", (req, res) => {
    const donor_id = req.params.id;
    const sqlDelete = "DELETE FROM donor_inventory WHERE id = ?;";

    db.query(sqlDelete, [donor_id], (err, result) => {
      if (err) {
        console.log("**ERROR IN DELETING BLOOD STOCK**" + err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    });
  });

    // Test blood endpoint
// Test blood endpoint
app.post("/login/stf/ds/test-blood/:id", (req, res) => {
  const { donorId, generalHealth, disqualifyingMedications, recentTravel, recentTattoos, recentSexualActivity, drugUse } = req.body;
  const donor_id = req.params.id;

  const sqlTest = "SELECT * FROM donor_inventory WHERE id = ?;";
  db.query(sqlTest, [donor_id], (err, results) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if donor exists
      if (results.length === 0) {
          console.log('Donor not found');
          return res.status(404).json({ error: 'Donor not found' });
      }

      const donor = results[0];

      // Update donor's health conditions and blood test result in the database
      const updateQuery = `
          UPDATE donor_inventory
          SET
              general_health = ?,
              disqualifying_medications = ?,
              recent_travel = ?,
              recent_tattoos = ?,
              recent_sexual_activity = ?,
              drug_use = ?,
              blood_test_result = ?
          WHERE id = ?;
      `;

      const bloodTestResult = calculateBloodTestResult(generalHealth, disqualifyingMedications, recentTravel, recentTattoos, recentSexualActivity, drugUse);

      db.query(updateQuery, [generalHealth, disqualifyingMedications, recentTravel, recentTattoos, recentSexualActivity, drugUse, bloodTestResult, donor_id], (updateErr, updateResult) => {
          if (updateErr) {
              console.error('Error updating donor health conditions:', updateErr);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          console.log(`Blood test result: ${bloodTestResult} for donor ${donor_id}`);

          return res.json({ result: bloodTestResult, message: `Blood is ${bloodTestResult}`, donorId: donor_id, donor: donor });
      });
  });
});

// Function to calculate blood test result based on health conditions
function calculateBloodTestResult(generalHealth, disqualifyingMedications, recentTravel, recentTattoos, recentSexualActivity, drugUse) {
  const conditionsMatch =
      generalHealth === 'good' &&
      disqualifyingMedications === 'no' &&
      recentTravel === 'no' &&
      recentTattoos === 'no' &&
      recentSexualActivity === 'no' &&
      drugUse === 'no';

  return conditionsMatch ? 'safe' : 'unsafe';
}


  
};
module.exports = DonorInventoryController;



