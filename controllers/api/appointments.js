const router = require('express').Router();
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const { withAuth, isCustomer, isManager }  = require('../../utils/route-helpers');
const { Op } = require('sequelize');

router.get('/', withAuth, isManager, async (req, res) => {
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
        if (appt) res.status(200).json({"appointment_id": appt.id});
        else res.status(400).json("Fail on Server.")
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// delete appointment
router.delete('/', async (req, res) => {
  const appData = await Appointment.destroy({
    where: {
      user_id: req.body.user_id,
    },
  });

  return res.json(appData);});

module.exports = router;