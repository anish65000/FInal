const CampBloodDonationController = (app, db) => {
    
 
    

    app.get("/camp/donations", (req, res) => {
      const sqlSelect = "SELECT * FROM camp_donations;";
  
      db.query(sqlSelect, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        }
      });
    });
  
 
   
    
   // Update blood donation in a camp
   app.put("/camp/donations/:donationId", async (req, res) => {
    try {
      const { donationId } = req.params;
      const { donorName, bloodGroup,  donationTime, bloodUnit } = req.body;
  
      const updateDonation = "UPDATE camp_donations SET donor_name=?, blood_group=?,  donation_time=?, blood_unit=? WHERE id=?";
      await db.promise().query(updateDonation, [donorName, bloodGroup, donationTime, bloodUnit, donationId]);
  
      res.status(200).json({ message: 'Blood donation updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
    // Delete blood donation in a camp
    app.delete("/camp/donations/:donationId", async (req, res) => {
      try {
        const { donationId } = req.params;
    
        // Check if the blood donation exists before attempting to delete
        const checkDonationQuery = "SELECT * FROM camp_donations WHERE id=?";
        const [existingDonation] = await db.promise().query(checkDonationQuery, [donationId]);
    
        if (existingDonation.length === 0) {
          return res.status(404).json({ error: 'Blood donation not found' });
        }
    
        // Proceed with deletion if the blood donation exists
        const deleteDonation = "DELETE FROM camp_donations WHERE id=?";
        await db.promise().query(deleteDonation, [donationId]);
    
        res.status(200).json({ message: 'Blood donation deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  }    
  module.exports = CampBloodDonationController;
  