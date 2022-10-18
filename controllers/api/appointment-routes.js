const router = require('express').Router();
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
<<<<<<< HEAD
=======
const Booking = require('../../models/Booking');
const { Op } = require("sequelize");
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99

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

<<<<<<< HEAD
=======
router.post("/available", async(req, res) => {
    try {
        const apptData = await Appointment.findAll({
            raw: true,
            where: {
                date: req.body.date,
                time_slot: {
                    [Op.gt]: parseInt(req.body.time_slot)-parseInt(req.body.time_frame),
                    [Op.lt]: parseInt(req.body.time_slot)+parseInt(req.body.time_frame)
                }
            },
            include: {
                model: Booking,
                where: {
                    user_id: req.body.user_id,
                }
            }
        });
        if (apptData.length !== 0) res.status(400).json({"Message": "Unvailable"});
        else res.status(200).json({"Message": "Available"})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async(req, res) => {
    try {
        var userId = req.body.user_id;
        if (!userId) userId = req.session.user_id
        const apptData = await Appointment.create({
                date: req.body.date,
                time_slot: req.body.time_slot,
                user_id: userId
        });
        const appt = apptData.get({plain: true});
        if (appt) res.status(200).json({"appointment_id": appt.id});
        else res.status(400).json("Fail on Server.")
    } catch (err) {
        res.status(500).json(err);
    }
});

>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
module.exports = router;