const campController = (app, db) => {
    app.post("/reg-camp", async (req, res) => {
        try {
            const { name, date, address, district, organizer, bank_id, contact, startTime, endTime } = req.body;

            const insertCamp = "INSERT INTO Camps (name, date, address, district, bank_id, organizer, contact, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            // Use db.promise().query() for the promise-based API
            const [campId] = await db.promise().query(insertCamp, [name, date, address, district, bank_id, organizer, contact, startTime, endTime]);

          

            // Send a detailed response with inserted camp details
            const insertedCampDetails = {
                campId: campId.insertId,
                name,
                date,
                address,
                district,
                bank_id,
                organizer,
                contact,
                startTime,
                endTime
            };

            res.status(200).json({ message: 'Camp registered successfully', campDetails: insertedCampDetails });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
app.get("/allCamps",  async (req, res) => {
    try {
      const selectAllCamps = "SELECT * FROM Camps";
      const [rows] = await db.promise().query(selectAllCamps);
  
      // Modify each camp's details to include more information if needed
      const campsWithDetails = rows.map(camp => ({
        campId: camp.camp_id,
        name: camp.name,
        date: camp.date,
        address: camp.address,
        district: camp.district,
        bank_id: camp.bank_id,
        organizer: camp.organizer,
        contact: camp.contact,
        startTime: camp.startTime,
        endTime: camp.startTime,
        // Add more details as needed
      }));
  
      res.status(200).json(campsWithDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put("/camps/:id", async (req, res) => {
    try {
      const { id } = req.params; // Extracting the camp ID from request parameters
      const { name, date, address, district, organizer, contact, startTime, endTime } = req.body;
  
      const updateCamp = "UPDATE Camps SET name=?, date=?, address=?, district=?, organizer=?, contact=?, starttime=?, endtime=? WHERE camp_id=?";
      
      // Log the SQL query and values for debugging
      console.log('SQL Query:', updateCamp);
      console.log('Values:', [name, date, address, district, organizer, contact, startTime, endTime, id]);
  
      // Use db.promise().query() for the promise-based API
      await db.promise().query(updateCamp, [name, date, address, district, organizer, contact, startTime, endTime, id]);
  
      res.status(200).json({ message: 'Camp updated successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });

  
 // ... (existing code)

app.delete('/camps/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCamp = 'DELETE FROM Camps WHERE camp_id = ?';
    await db.promise().query(deleteCamp, [id]);
    res.status(200).json({ message: 'Camp deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// ... (existing code)


// ...
const { check, validationResult } = require('express-validator');

app.post("/findCamps", [
  check('bloodGroup').notEmpty().withMessage('Blood group is required'),
  check('district').notEmpty().withMessage('District is required'),
], async (req, res) => {
  try {
    const { bloodGroup, district } = req.body;

    // Validate the request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build the SQL query to find camps based on blood group and district
    const findCampsQuery = `
    SELECT
      camp_id AS campId,
      name,
      date,
      address,
      district,
      organizer,
      contact,
      startTime,
      endTime
    FROM
      Camps
    WHERE
      district = ? AND camp_id IN (
        SELECT camp_id
        FROM camp_donations
        WHERE LOWER(blood_group) = LOWER(?)
      );
    `;

    console.log('District:', district);
    console.log('Blood Group:', bloodGroup);

    const [rows] = await db.promise().query(findCampsQuery, [district, bloodGroup]);
    console.log('Query Result:', rows);

    // Modify each camp's details to include more information if needed
    const campsMatchingCriteria = rows.map(camp => ({
      campId: camp.campId,
      name: camp.name,
      date: camp.date,
      address: camp.address,
      district: camp.district,
      organizer: camp.organizer,
      contact: camp.contact,
      startTime: camp.startTime,
      endTime: camp.endTime,
    }));

    res.status(200).json(campsMatchingCriteria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




  app.post("/camp/collect", async (req, res) => {
    try {
      const { camp_id, donorName, bloodGroup, donationDate, donationTime, bloodUnit } = req.body;
  
      // Ensure that camp_id is provided in the request body
      if (!camp_id) {
        return res.status(400).json({ error: 'camp_id is required in the request body' });
      }
  
      // Check if the camp exists
      const campExistsQuery = "SELECT * FROM camps WHERE camp_id = ?";
      const [campExists] = await db.promise().query(campExistsQuery, [camp_id]);
  
      if (campExists.length === 0) {
        return res.status(404).json({ error: 'Camp does not exist' });
      }
  
      const insertDonation = "INSERT INTO camp_donations (camp_id, donor_name, blood_group, donation_date, donation_time, blood_unit) VALUES (?, ?, ?, ?, ?, ?)";
      await db.promise().query(insertDonation, [camp_id, donorName, bloodGroup, donationDate, donationTime, bloodUnit]);
  
      res.status(200).json({ message: 'Blood donation collected successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get("/camps/:campId", async (req, res) => {
    try {
      const { campId } = req.params;
  
      const selectCampQuery = "SELECT * FROM Camps WHERE camp_id = ?";
      const [rows] = await db.promise().query(selectCampQuery, [campId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Camp not found' });
      }
  
      const camp = rows[0];
  
      // Modify the camp's details to include more information if needed
      const campWithDetails = {
        campId: camp.camp_id,
        name: camp.name,
        date: camp.date,
        address: camp.address,
        district: camp.district,
        bank_id: camp.bank_id,
        organizer: camp.organizer,
        contact: camp.contact,
        startTime: camp.startTime,
        endTime: camp.endTime,
        // Add more details as needed
      };
  
      res.status(200).json(campWithDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

 
  
  

  
}


module.exports = campController;
