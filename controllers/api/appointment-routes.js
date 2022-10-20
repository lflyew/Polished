const router = require('express').Router();
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const { withAuth, isCustomer, isManager }  = require('../../utils/route-helpers');
const { getFormattedTimeslot }  = require('../../utils/view-helpers');
const toSendMessage = require('../../utils/twillio.js')
const { Op } = require('sequelize');

router.get('/', withAuth, isManager, async (req, res) => {
    try {
        const appointmentData = await Appointment.findAll({ include: User });
        var appointments = appointmentData.map((appt) => appt.get({ plain: true }));
        res.status(200).json({
            appointments: appointments,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/available", withAuth, async(req, res) => {
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

router.post("/", withAuth, async(req, res) => {
    try {
        var userId = req.body.user_id;
        if (userId == -1) userId = req.session.user_id;
        const apptData = await Appointment.create({
                date: req.body.date,
                time_slot: req.body.time_slot,
                user_id: userId
        });
        const appt = apptData.get({plain: true});
        console.log(appt);
        if (appt) {
            const user = await User.findOne({
                raw: true,
                where: {
                    id: appt.user_id
                }
            });
            toSendMessage("+1"+user.phone, "Polished Nails:\nDear " + user.first_name + ",\nYour Appointment Confirmed.\n" + appt.date + " at " + getFormattedTimeslot(appt.time_slot) + "\nThank you!");
            res.status(200).json({"appointment_id": appt.id});
        } else res.status(400).json("Fail on Server.")
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;