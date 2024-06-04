// module export
const BloodStockController = (app, db) => {
    // Get all blood stocks
    app.get("/login/stf/inv", (req, res) => {
      const sqlSelect = "SELECT * FROM blood_inventory;";
  
      db.query(sqlSelect, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        }
      });
    });
  
  // Update blood stock units and new field
app.put("/login/stf/inv/update/:id", (req, res) => {
  const id = req.params.id;
  const { blood_group, total_unit, current_stock, blood_status } = req.body;
  const sqlUpdate = "UPDATE blood_inventory SET blood_group=?, total_unit=?, current_stock=?, blood_status=? WHERE id=?";

  db.query(sqlUpdate, [blood_group, total_unit, current_stock, blood_status, id], (err, result) => {
    if (err) {
      console.log("**ERROR IN UPDATING BLOOD STOCK**" + err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

  
    // Insert new blood stock
    app.post("/login/stf/inv/insert", (req, res) => {
      try {
        const { blood_group, total_unit, current_stock, blood_status } = req.body;
    
        // Check if blood group already exists
        const sqlSelect = "SELECT * FROM blood_inventory WHERE blood_group = ?";
        db.query(sqlSelect, [blood_group], (err, result) => {
          if (err) {
            console.error('Error in selecting blood stock:', err);
            return res.status(500).send("Internal Server Error");
          }
    
          // If blood group already exists, update total_unit and current_stock
          if (result.length > 0) {
            const existingTotalUnit = result[0].total_unit;
            const existingCurrentStock = result[0].current_stock;
            
            const updatedTotalUnit = parseInt(existingTotalUnit) + parseInt(total_unit);
            const updatedCurrentStock = parseInt(existingCurrentStock) + parseInt(current_stock);
    
            const sqlUpdate = "UPDATE blood_inventory SET total_unit = ?, current_stock = ?, blood_status = ? WHERE blood_group = ?";
            db.query(sqlUpdate, [updatedTotalUnit, updatedCurrentStock, blood_status, blood_group], (err, result) => {
              if (err) {
                console.error('Error in updating blood stock:', err);
                return res.status(500).send("Internal Server Error");
              }
              console.log('Blood stock updated successfully');
              res.send(result);
            });
          } else {
            // If blood group does not exist, insert a new record
            const sqlInsert = "INSERT INTO blood_inventory (blood_group, total_unit, current_stock, blood_status) VALUES (?, ?, ?, ?)";
            db.query(sqlInsert, [blood_group, total_unit, current_stock, blood_status], (err, result) => {
              if (err) {
                console.error('Error in inserting blood stock:', err);
                return res.status(500).send("Internal Server Error");
              }
              console.log('Blood stock inserted successfully');
              res.send(result);
            });
          }
        });
      } catch (error) {
        console.error("Error during blood stock insertion:", error);
        res.status(400).send({ message: "ERROR IN BLOOD STOCK INSERTION!" });
      }
    });
    
    
    // Delete blood stock
    app.delete("/login/stf/inv/delete/:id", (req, res) => {
      const id = req.params.id;
      const sqlDelete = "DELETE FROM blood_inventory WHERE id = ?;";

  
      db.query(sqlDelete, [id], (err, result) => {
        if (err) {
          console.log("**ERROR IN DELETING BLOOD STOCK**" + err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        }
      });
    });

    // GET blood stock details by ID
app.get("/login/stf/inv/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelectById = "SELECT * FROM blood_inventory WHERE id = ?";

  db.query(sqlSelectById, [id], (err, result) => {
    if (err) {
      console.error('Error fetching blood stock by ID:', err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length === 0) {
        res.status(404).send("Blood stock not found");
      } else {
        res.send(result[0]);
      }
    }
  });
});
  };
  module.exports = BloodStockController;
  