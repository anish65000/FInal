
app.post('/api/nearbyBloodBanks', async (req, res) => {
  try {
    const { latitude, longitude, bloodType } = req.body;
    const maxDistance = 5; // Maximum distance in kilometers (adjust as needed)

    
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

    // SQL query to select nearby blood banks
    const query = `
      SELECT 
        id, name, category, phone, email, district, address, latitude, longitude, blood_group, available_units, blood_status
      FROM 
        blood_bank
      WHERE 
        blood_group = :bloodType AND
        latitude BETWEEN :minLat AND :maxLat AND
        longitude BETWEEN :minLon AND :maxLon
    `;

    // Define latitude and longitude ranges for the query
    const latRange = [latitude - 0.1, latitude + 0.1];
    const lonRange = [longitude - 0.1, longitude + 0.1];

    // Execute the query using Knex's raw method with named bindings
    const results = await db.raw(query, {
      bloodType,
      minLat: latRange[0],
      maxLat: latRange[1],
      minLon: lonRange[0],
      maxLon: lonRange[1],
    });

    // Calculate and add distance to each blood bank, and filter based on maxDistance
    const bloodBanksWithDistance = results[0].map((bank) => ({
      ...bank,
      distance: haversine(latitude, longitude, bank.latitude, bank.longitude),
    })).filter((bank) => bank.distance <= maxDistance);

    // Send the filtered results as JSON response
    res.json(bloodBanksWithDistance);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
});