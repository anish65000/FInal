const DashboardController = (app, connection) => {
  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  app.get('/api/countDonors', async (req, res) => {
    try {
      // Query to count donors
      const sql = "SELECT COUNT(*) AS donorCount FROM user_details WHERE userRole = 'Donor'";
      const result = await query(sql, []);
      const donorCount = result[0].donorCount;

      // Send the donor count as JSON response
      res.json({ count: donorCount });
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/countRecipients', async (req, res) => {
    try {
      // Query to count recipients
      const sql = "SELECT COUNT(*) AS recipientCount FROM user_details WHERE userRole = 'Recipient'";
      const result = await query(sql, []);
      const recipientCount = result[0].recipientCount;

      // Send the recipient count as JSON response
      res.json({ count: recipientCount });
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Define API endpoint to count staff members
  app.get('/api/countStaff', async (req, res) => {
    try {
      // Query to count staff members
      const sql = "SELECT COUNT(*) AS staffCount FROM stf_details WHERE stfStaffType = 'Staff'";
      const result = await query(sql, []);
      const staffCount = result[0].staffCount;

      // Send the staff count as JSON response
      res.json({ count: staffCount });
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/countdoctor', async (req, res) => {
    try {
      // Query to count staff members
      const sql = "SELECT COUNT(*) AS doctorCount FROM stf_details WHERE stfStaffType = 'Doctor'";
      const result = await query(sql, []);
      const staffCount = result[0].staffCount;

      // Send the staff count as JSON response
      res.json({ count: staffCount });
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/countrider', async (req, res) => {
    try {
      // Query to count riders
      const sql = "SELECT COUNT(*) AS riderCount FROM bloodbank_riders";
      const result = await query(sql, []);
      const riderCount = result[0].riderCount; 
  
      // Send the rider count as JSON response
      res.json({ count: riderCount });
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
};

module.exports = DashboardController;