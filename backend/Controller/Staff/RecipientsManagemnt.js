const RecipientInventoryController = (app, db) => {
    // Get all recipient stocks
    app.get("/login/stf/rs", (req, res) => {
      const sqlSelect = "SELECT * FROM recipient_inventory;";
  
      db.query(sqlSelect, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        }
      });
    });
  
    // Update recipient stocks
    app.put("/login/stf/rs/update", async (req, res) => {
      try {
        const { recipient_id, recipient_name, blood_group, email, age, address, phone } = req.body;
        const sqlUpdate = "UPDATE recipient_inventory SET recipient_name=?, blood_group=?, email=?, age=?, address=?, phone=? WHERE id = ?;";
        
        const updateResult = await queryAsync(sqlUpdate, [recipient_name, blood_group, email, age, address, phone, recipient_id]);
  
        if (updateResult.affectedRows > 0) {
          const sqlSelect = "SELECT * FROM recipient_inventory WHERE id = ?;";
          const selectResult = await queryAsync(sqlSelect, [recipient_id]);
  
          res.json({ success: true, message: "Recipient stock updated successfully", data: selectResult[0] });
        } else {
          res.json({ success: false, message: "No records were updated." });
        }
      } catch (err) {
        console.log("**ERROR IN UPDATING RECIPIENT STOCK**" + err);
        res.status(500).send("Internal Server Error");
      }
    });
  
    // Insert new recipient stocks
    app.post("/login/stf/rs/insert", (req, res) => {
      try {
        const { recipient_name, blood_group, email, age, address, phone } = req.body;
    
        if (!recipient_name || !blood_group || !email || !age || !address || !phone) {
          return res.status(400).send({ message: "All fields are required." });
        }
    
        // Check if the email already exists
        const checkEmailQuery = "SELECT * FROM recipient_inventory WHERE email = ?";
        db.query(checkEmailQuery, [email], (err, result) => {
          if (err) {
            console.error('Error in checking email:', err);
            res.status(500).send("Internal Server Error");
            return;
          }
    
          if (result.length > 0) {
            // Email already exists
            res.status(409).send({ message: "Email already exists." });
            return;
          }
    
          // Email doesn't exist, proceed with insertion
          const sqlInsert = "INSERT INTO recipient_inventory (recipient_name, blood_group, email, age, address, phone) VALUES (?, ?, ?, ?, ?, ?);";
          db.query(sqlInsert, [recipient_name, blood_group, email, age, address, phone], (err, result) => {
            if (err) {
              console.error('Error in inserting recipient stock:', err);
              res.status(500).send("Internal Server Error");
            } else {
              const recipientId = result.insertId;
              console.log('Recipient stock inserted successfully with ID:', recipientId);
              res.json({ message: 'Recipient stock inserted successfully', recipientId });
            }
          });
        });
      } catch (error) {
        console.error("Error during recipient stock insertion:", error);
        res.status(400).send({ message: "ERROR IN RECIPIENT STOCK INSERTION!" });
      }
    });
  
    // Delete recipient stocks
    app.delete("/login/stf/rs/delete/:id", (req, res) => {
      const recipient_id = req.params.id;
      const sqlDelete = "DELETE FROM recipient_inventory WHERE id = ?;";
  
      db.query(sqlDelete, [recipient_id], (err, result) => {
        if (err) {
          console.log("**ERROR IN DELETING RECIPIENT STOCK**" + err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        }
      });
    });
  };

  module.exports = RecipientInventoryController;
  