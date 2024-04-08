const BloodBankAllRidersController = (app, db) => {

  app.get("/bloodbank-rider/:id", async (req, res) => {
    try {
      const riderId = req.params.id;

      // Query database to get rider details
      const [rows] = await db.promise().query('SELECT * FROM bloodbank_riders WHERE id = ?', [riderId]);
      const riderDetails = rows[0];

      if (!riderDetails) {
        return res.status(404).send({ message: "Rider not found" });
      }

      // Remove sensitive information such as password before sending response
      delete riderDetails.password;

      res.status(200).send({ success: true, rider: riderDetails });
    } catch (error) {
      console.error("Error retrieving rider details:", error);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  });

  // Route to get all rider details
  app.get("/bloodbank-riders", async (req, res) => {
    try {
      // Query database to get all rider details
      const [rows] = await db.promise().query('SELECT * FROM bloodbank_riders');
      const allRiders = rows;

      res.status(200).send({ success: true, riders: allRiders });
    } catch (error) {
      console.error("Error retrieving all riders:", error);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  });

}

module.exports = BloodBankAllRidersController;
  