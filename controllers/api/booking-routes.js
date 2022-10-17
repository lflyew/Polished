const router = require('express').Router();
const User = require('../../models/User');
const Appointment = require('../../models/Appointment');
const Booking = require('../../models/Booking');

router.post('/', async (req, res) => {
    try {
        const booking = await Booking.bulkCreate(req.body.data);
        if (booking) res.status(200).json();
        else res.status(400).json("Fail on Server.")
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;