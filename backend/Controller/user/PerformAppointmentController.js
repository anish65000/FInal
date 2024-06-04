const handleAppointmentController = (app, db) => {

  const authenticateToken = require('../authenticateToken'); 
  
  // Update the endpoint to handle filtering by staff_name
app.get('/availableslots', async (req, res) => {
    try {
        const { staff_name } = req.query;
        let query = 'SELECT id, stf_id, staff_name, stf_staff_type, DATE_FORMAT(slot_time, "%Y-%m-%d %H:%i:%s") AS slot_time FROM time_slots';
        let queryParams = [];

        if (staff_name) {
            query += ' WHERE staff_name LIKE ?';
            queryParams.push(`%${staff_name}%`);
        }
        

        db.query(query, queryParams, (err, slots) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            

            res.json(slots);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// New endpoint to fetch all distinct staff names
app.get('/staffnames', async (req, res) => {
    try {
        const query = 'SELECT DISTINCT staff_name FROM time_slots';
        db.query(query, (err, staffNames) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.json(staffNames);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/book-appointment', authenticateToken, async (req, res) => {
    try {
        const { stf_id, slot_time } = req.body;
        const userId = req.user.userId;
        const user_name = req.user.userFullName;

        // Check if the staff member is a doctor
        const [staffType] = await db.promise().query(
            'SELECT stf_staff_type FROM time_slots WHERE stf_id = ?',
            [stf_id]
        );

        if (staffType.length > 0 && staffType[0].stf_staff_type === 'Doctor') {
            // Check appointment availability in the appointments table
            const [existingAppointment] = await db.promise().query(
                'SELECT appointment_id FROM appointments WHERE stf_id = ? AND slot_time = ?',
                [stf_id, slot_time]
            );

            if (existingAppointment.length > 0) {
                return res.json({ message: "Sorry, the slot is not available." });
            }

            // Check slot availability in the history table
            const [historyCheck] = await db.promise().query(
                'SELECT * FROM history WHERE slot_time = ?',
                [slot_time]
            );

            if (historyCheck.length > 0) {
                return res.json({ message: "The slot is already filled with another donor." });
            }

            // Check if the user has donated blood in the past 52 days
            const [lastDonation] = await db.promise().query(
                'SELECT donate_date FROM history WHERE user_id = ? AND donated = true ORDER BY donate_date DESC LIMIT 1',
                [userId]
            );

            if (lastDonation.length > 0) {
                const lastDonationDate = new Date(lastDonation[0].donate_date);
                const currentDate = new Date();
                const diffDays = Math.floor((currentDate - lastDonationDate) / (1000 * 60 * 60 * 24));

                if (diffDays <= 52) {
                    return res.status(403).json({ message: "User cannot book a slot within 52 days of their last blood donation" });
                }
            }

            // Insert the appointment details with USER_ID, USER_NAME, and donation_date as slot_time
            await db.promise().query(
                'INSERT INTO appointments (stf_id, user_id, user_name, slot_time, donation_date) VALUES (?, ?, ?, ?, ?)',
                [stf_id, userId, user_name, slot_time, slot_time]
            );

            return res.json({ message: 'Appointment booked successfully!' });
        } else {
            return res.status(403).json({ message: "Staff member is not a doctor" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
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
  