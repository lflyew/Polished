const router = require('express').Router();
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const appointmentData = await Appointment.findAll({ include: User });
        var appointments = appointmentData.map((appt) => appt.get({ plain: true }));
        res.status(200).json({
            appointments: appointments,
            // user_id: req.session.user_id,
            // logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;