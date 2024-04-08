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
        const { blood_group, total_unit, current_stock,  blood_status } = req.body;
    
        if (!blood_group || !total_unit || !current_stock ||  !blood_status) {
          return res.status(400).send({ message: "All fields are required." });
        }
    
        const sqlInsert = "INSERT INTO blood_inventory (blood_group, total_unit, current_stock,  blood_status ) VALUES (?, ?, ?, ?)";
    
        db.query(sqlInsert, [blood_group, total_unit, current_stock, blood_status], (err, result) => {
          if (err) {
            console.error('Error in inserting blood stock:', err);
            res.status(500).send("Internal Server Error");
          } else {
            console.log('Blood stock inserted successfully');
            res.send(result);
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


    

  };
  
  module.exports = BloodStockController;
  