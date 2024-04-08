app.post('/api/nearbyBloodBanks', async (req, res) => {
    try {
      const { latitude, longitude, bloodType } = req.body;
      const maxDistance = 5; // Maximum distance in kilometers (adjust as needed)
  
      // SQL query to select nearby blood banks
      const query = `
        SELECT 
          id, name, category, phone, email, district, address, latitude, longitude, blood_group, available_units, blood_status
        FROM 
          blood_bank
        WHERE 
          blood_group = ? AND
          latitude BETWEEN ? AND ? AND
          longitude BETWEEN ? AND ?
      `;
  
      // Define latitude and longitude ranges for the query
      const latRange = [latitude - 0.1, latitude + 0.1];
      const lonRange = [longitude - 0.1, longitude + 0.1];
  
      // Execute the query
      const [results] = await db.execute(query, [
        bloodType,
        latRange[0],
        latRange[1],
        lonRange[0],
        lonRange[1],
      ]);
  
      // Calculate and add distance to each blood bank, and filter based on maxDistance
      const bloodBanksWithDistance = results.map((bank) => ({
        ...bank,
        distance: haversine(latitude, longitude, bank.latitude, bank.longitude),
      })).filter((bank) => bank.distance <= maxDistance);
  
      // Send the filtered results as JSON response
      res.json(bloodBanksWithDistance);
    } catch (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });