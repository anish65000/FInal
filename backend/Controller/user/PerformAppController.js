const handleAppointmentController = (app, db) => {

  const authenticateToken = require('../authenticateToken'); 
  
  app.get('/availableslots', async (req, res) => {
    try {
        const currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Format date for SQL

        // Use the single connection to execute the query
        db.query(
            'SELECT id, stf_id, stf_staff_type, DATE_FORMAT(slot_time, "%Y-%m-%d %H:%i:%s") AS slot_time FROM time_slots', // Adjusted SQL query to format slot_time
            [currentTime],
            (err, slots) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                // Remove 'T' and 'Z' from slot_time field in the response
                slots.forEach(slot => {
                    slot.slot_time = slot.slot_time.replace(/T|Z/g, ' ');
                });

                res.json(slots);
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
app.post('/book-appointment', authenticateToken, async (req, res) => {
    try {
        const { stf_id, user_name, slot_time } = req.body;
        const userId = req.user.userId; // Accessing user ID from authenticated token

        // Check if the staff member is a doctor
        const [staffType] = await db.promise().query(
            'SELECT stf_staff_type FROM time_slots WHERE stf_id = ?',
            [stf_id]
        );

        if (staffType && staffType.length > 0 && staffType[0].stf_staff_type === 'Doctor') {
            // Check appointment availability
            const [existingAppointment] = await db.promise().query(
                'SELECT APPOINTMENT_ID FROM appointments WHERE stf_id = ? AND slot_time = ?',
                [stf_id, slot_time]
            );

            if (existingAppointment && existingAppointment.length > 0 && existingAppointment[0].APPOINTMENT_ID) {
                res.json({ message: "Sorry, the slot is not available." });
            } else {
                // Insert the appointment details with USER_ID and USER_NAME
                await db.promise().query(
                    'INSERT INTO appointments (stf_id, user_id, user_name, slot_time) VALUES (?, ?, ?, ?)',
                    [stf_id, userId, user_name, slot_time]
                );

                res.json({ message: 'Appointment booked successfully!' });
            }
        } else {
            res.status(403).json({ message: "Staff member is not a doctor" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

  
app.post('/blooddonationfeedback', async (req, res) => {
    try {
        const { stf_id, feedback } = req.body;

        // Retrieve user_id from history based on stf_id
        const [userHistory] = await db.promise().query(
            'SELECT user_id FROM history WHERE stf_id = ?',
            [stf_id]
        );

        if (userHistory.length > 0) {
            const userId = userHistory[0].user_id;

            // Insert feedback into the database
            await db.promise().query(
                'INSERT INTO blood_donation_feedback (stf_id, user_id, feedback) VALUES (?, ?, ?)',
                [stf_id, userId, feedback]
            );

            res.json({ message: "Feedback submitted successfully" });
        } else {
            res.status(404).json({ message: "No appointment found for the given staff member" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/appointments', authenticateToken, async (req, res) => {
    try {
        const patientId = req.user.userId;

        // Retrieve appointments for the given patient from confirmedappointments table
        const [appointments] = await db.promise().query(
            'SELECT stf_details.stfName AS doctor_name,confirmedappointments.confirmed_appointment_id as blood_appointment_id, confirmedappointments.slot_time AS time ' +
            'FROM confirmedappointments ' +
            'JOIN stf_details ON confirmedappointments.stf_id = stf_details.id ' +
            'WHERE confirmedappointments.user_id = ?',
            [patientId]
        );

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


    
    
  
  }
  
  module.exports = handleAppointmentController;
  