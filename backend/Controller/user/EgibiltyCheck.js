const checkCompatibility = (req, res, db) => {
  const { recipientType, recipientAge } = req.body;
  let compatible = false;
  let donorType; // Declare donorType

  // Blood type compatibility
  const bloodTypeCompatibility = {
    'O-': ['O-'],
    'O': ['O+', 'O-'],
    'B-': ['B-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'AB+': ['AB-', 'AB+', 'A-', 'A+', 'O+', 'O-', 'B+', 'B-']
  };

  console.log('Request Body:', req.body);

  if (bloodTypeCompatibility[recipientType]) {
    donorType = bloodTypeCompatibility[recipientType][0]; // Assuming the first item in the array
    console.log('Assigned donorType:', donorType);
    compatible = true;
  } else {
    console.log('Invalid recipientType:', recipientType);
  }

  // Age-based eligibility
  if (compatible && (recipientAge < 18 || recipientAge > 65)) {
    compatible = false; // Age is not within the eligible range
    console.log('Age not within the eligible range:', recipientAge);
  }

  if (compatible) {
    const query = 'SELECT blood_group, donor_name FROM donor_inventory WHERE blood_group = ?';
    db.query(query, [donorType], (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      console.log('Database Query Results:', results);

      if (results.length === 0) {
        res.json({ error: "Donor not found in inventory" });
      } else {
        const donors = results.map(result => result.donor_name);
        res.json({ compatible, donorType, donors });
      }
    });
  } else {
    res.json({ compatible });
  }
};

module.exports = (app, db) => {
  app.post('/staff/checkCompatibility', (req, res) => checkCompatibility(req, res, db));
};