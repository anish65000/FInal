const authenticateToken = require('../../authenticateToken'); 

module.exports = function ManageAppointmentController(app, db) {
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
  
    app.post('/confirm-booking', authenticateToken, async (req, res) => {
        try {
            const {  userId, slot_time } = req.body;

            // Ensure req.user is defined after authentication middleware
            if (!req.user || !req.user.userId) {
                console.log("STF ID missing in token:", req.user); // Log req.user for debugging
                return res.status(401).json({ message: "Unauthorized: Missing STF ID in token" });
            }

            const stf_id = req.user.userId;

            // Check if the logged-in STF ID matches the STF ID in the request
            if (stf_id !== stf_id) {
                return res.status(403).json({ message: "Unauthorized: Mismatched STF ID" });
            }

            // Check if the staff member is a doctor
            const [staffType] = await db.promise().query(
                'SELECT stf_staff_type FROM time_slots WHERE stf_id = ?',
                [stf_id]
            );

            // Check if staffType is not empty and stf_staff_type is "Doctor"
            if (staffType.length > 0 && staffType[0].stf_staff_type === 'Doctor') {
                // Retrieve appointment details for the specified doctor, user, date, and slot_time
                const [appointmentDetails] = await db.promise().query(
          'SELECT appointments.stf_id , appointments.user_id, user_details.userName, user_details.userAge, user_details.userPhone, appointments.slot_time ' +
          'FROM appointments ' +
          'INNER JOIN user_details ON appointments.user_id = user_details.id ' +
          'WHERE appointments.stf_id  = ? AND appointments.slot_time = ? AND appointments.user_id = ?',
          [stf_id, slot_time, userId]
                );

                // Check if the appointment details are found
                if (appointmentDetails.length > 0) {
                    // Check if the appointment already exists in the 'confirmedappointments' table
                    const [existingConfirmedAppointment] = await db.promise().query(
                        'SELECT confirmed_appointment_id FROM confirmedappointments WHERE stf_id = ? AND user_id = ? AND slot_time = ?',
                        [appointmentDetails[0].stf_id, appointmentDetails[0].user_id, appointmentDetails[0].slot_time]
                    );

                    if (existingConfirmedAppointment.length > 0) {
                        // Respond with a message indicating that the appointment is already confirmed
                        return res.json({ message: "Appointment already confirmed" });
                    } else {
                        // Insert the appointment details into the 'confirmedappointments' table
                        await db.promise().query(
                            'INSERT INTO confirmedappointments (stf_id, user_id, user_name, user_age, user_phone, slot_time) VALUES (?, ?, ?, ?, ?, ?)',
                            [appointmentDetails[0].stf_id, appointmentDetails[0].user_id, appointmentDetails[0].userName, appointmentDetails[0].userAge, appointmentDetails[0].userPhone, appointmentDetails[0].slot_time]
                        );

                        // Respond with a success message
                        res.json({ message: "Appointment Confirmed" });
                    }
                } else {
                    // Respond with a not found message if the appointment details are not found
                    res.status(404).json({ message: "Appointment not found" });
                }
            } else {
                // Respond with a forbidden status if the staff member is not a doctor
                res.status(403).json({ message: "Staff member is not a doctor" });
            }
        } catch (err) {
            // Log any errors and respond with a server error message
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
    // Endpoint to handle blood donation
    app.post('/blooddonated', authenticateToken, async (req, res) => {
        try {
            const { userId, slot_time, blood_group, unit } = req.body;

            // Ensure req.user is defined after authentication middleware
            if (!req.user || !req.user.userId) {
                console.log("STF ID missing in token:", req.user); // Log req.user for debugging
                return res.status(401).json({ message: "Unauthorized: Missing STF ID in token" });
            }

            const stf_id = req.user.userId;

            // Query the database to get the staff type of the user
            const [staffTypeRows] = await db.promise().query(
                'SELECT stfStaffType FROM stf_details WHERE id = ?',
                [stf_id]
            );

            if (staffTypeRows.length === 0) {
                return res.status(404).json({ message: "Staff not found" });
            }

            const stfStaffType = staffTypeRows[0].stfStaffType;

            if (stfStaffType === 'Doctor') {
                // Retrieve appointment details from confirmedappointments
                const [appointmentDetails] = await db.promise().query(
                    'SELECT stf_id, user_id, user_name, user_age, user_phone, slot_time ' +
                    'FROM confirmedappointments ' +
                    'WHERE stf_id = ? AND user_id = ? AND slot_time >= ? AND slot_time < DATE_ADD(?, INTERVAL 1 SECOND)',
                    [stf_id, userId, slot_time, slot_time]
                );

                if (appointmentDetails.length > 0) {
                    // Begin transaction
                    await db.promise().beginTransaction();

                    try {
                        // Insert into history
                        await db.promise().query(
                            'INSERT INTO history (stf_id, user_id, user_name, user_age, user_phone, slot_time, blood_group, unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            [appointmentDetails[0].stf_id, appointmentDetails[0].user_id, appointmentDetails[0].user_name, appointmentDetails[0].user_age, appointmentDetails[0].user_phone, appointmentDetails[0].slot_time, blood_group, unit]
                        );

                        // Commit transaction
                        await db.promise().commit();

                        res.json({ message: "Person has donated blood" });
                    } catch (error) {
                        // Rollback transaction on error
                        await db.promise().rollback();
                        throw error; // Rethrow the error for global error handling
                    }
                } else {
                    res.status(404).json({ message: "Appointment not found in confirmedappointments" });
                }
            } else {
                res.status(403).json({ message: "Staff member is not a doctor" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
