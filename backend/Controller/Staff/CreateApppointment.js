const authenticateToken = require('../authenticateToken'); 
module.exports = function  BookAppointmentController(app, db) {
// Endpoint to handle adding available slots
   app.post('/stf/availableslots', authenticateToken, async (req, res) => {
    try {
      // Ensure req.user is defined after authentication middleware
      if (!req.user || !req.user.userId) {
        console.log("STF ID missing in token:", req.user); // Log req.user for debugging
        return res.status(401).json({ message: "Unauthorized: Missing STF ID in token" });
      }
      const stf_id = req.user.userId;
      const { slot_times } = req.body;

      // Ensure that slot_times is defined and is an array
      if (!Array.isArray(slot_times)) {
        return res.status(400).json({ error: 'Invalid or missing slot_times array in the request body.' });
      }
  
      // Query the stf_details table to get the staff type
      const [row] = await db.promise().query('SELECT stfStaffType FROM stf_details WHERE id = ?', [stf_id]);
  
      if (!row || !row.length) {
        return res.status(404).json({ error: 'STF ID not found in stf_details table.' });
      }
  
      const stf_staff_type = row[0].stfStaffType;
  
      // Ensure that stf_staff_type is "doctor"
      if (stf_staff_type !== 'Doctor') {
        return res.status(400).json({ error: 'Invalid STF Staff Type. Only "doctor" is allowed.' });
      }
  
      // Insert the time slots for donation
      const values = slot_times.map(slot_time => [stf_id, stf_staff_type, slot_time]);
      await db.promise().query('INSERT INTO time_slots (stf_id, stf_staff_type, slot_time) VALUES ?', [values]);
  
      // Log success message to the console
      console.log('Time slots added successfully.');
  
      // Send success response with custom message
      res.json({ success: true, message: 'Time added successfully' });
  
      // Notify clients about new time slots
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  app.get('/get-confirmed-appointments', async (req, res) => {
    try {
      // Retrieve all confirmed appointment details
      const [confirmedAppointments] = await db.promise().query(
        'SELECT * FROM confirmedappointments'
      );
  
      if (confirmedAppointments && confirmedAppointments.length > 0) {
        // Respond with the confirmed appointment details
        res.json({ appointments: confirmedAppointments, confirmed: true });
      } else {
        // Respond with a not found message if no appointments are confirmed
        res.status(404).json({ message: "No confirmed appointments found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  




  
  
app.get('/get-appointment/:appointmentId', async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    // Retrieve appointment details based on the appointmentId
    const [appointmentDetails] = await db.promise().query(
      'SELECT * FROM appointments WHERE APPOINTMENT_ID = ?',
      [appointmentId]
    );

    if (appointmentDetails && appointmentDetails.length > 0) {
      // Respond with the appointment details
      res.json({ appointment: appointmentDetails[0] });
    } else {
      // Respond with a not found message if the appointment is not found
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/get-appointments', async (req, res) => {
  try {
    // Retrieve all appointment details
    const [appointments] = await db.promise().query(
      'SELECT * FROM appointments'
    );

    if (appointments && appointments.length > 0) {
      // Respond with the list of all appointments
      res.json({ appointments });
    } else {
      // Respond with a not found message if there are no appointments
      res.status(404).json({ message: "No appointments found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




app.get('/get-confirmed-appointment/:appointmentId', async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;

    // Retrieve confirmed appointment details based on the appointmentId
    const [confirmedAppointmentDetails] = await db.promise().query(
      'SELECT * FROM confirmedappointments WHERE confirmed_appointment_id = ?',
      [appointmentId]
    );

    if (confirmedAppointmentDetails && confirmedAppointmentDetails.length > 0) {
      // Respond with the confirmed appointment details
      res.json({ appointment: confirmedAppointmentDetails[0], confirmed: true });
    } else {
      // Respond with a not found message if the appointment is not confirmed
      res.status(404).json({ message: "Appointment not confirmed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







app.get('/blooddonationfeedback/:stf_id', async (req, res) => {
  try {
      const { stf_id } = req.params;

      // Retrieve feedback for the given staff member from the database
      const [feedbackRows] = await db.promise().query(
          'SELECT * FROM blood_donation_feedback WHERE stf_id = ?',
          [stf_id]
      );

      if (feedbackRows.length > 0) {
          res.json(feedbackRows); // Send the feedback as a JSON response
      } else {
          res.status(404).json({ message: "No feedback found for the given staff member" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});






  
  
}



