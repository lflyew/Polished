
const router = require('express').Router();
const User = require('../../models/User');
const Appointment = require('../../models/Appointment');
const Booking = require('../../models/Booking');
const { withAuth, isCustomer, isManager }  = require('../../utils/route-helpers');

router.post('/', withAuth, async (req, res) => {
    try {
        const booking = await Booking.bulkCreate(req.body.data);
        if (booking) res.status(200).json();
        else res.status(400).json("Fail on Server.")
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
router.get('/:user_id', async (req, res) => {
const bookingsData = await Bookings.findAll(
    {where: {
    user_id: req.params.user_id
    }})
    return res.json(bookingsData)});

// update Bookings
router.put('/:user_id/:id', async (req, res) => {
const appData = await Bookings.update(
    {
    id: req.body.id,
    appointment_id: req.body.appointment_id,
    service_id: req.body.service_id,
    user_id: req.body.user_id,
    },{
    where: {
    user_id: req.params.user_id,
    id: req.params.id
    }});
    return res.json(appData);});


    // delete Bookings
router.delete('/:user_id/:id', async (req, res) => {
const appData = await Bookings.destroy({
    where: {
    user_id: req.params.user_id,
    id: req.params.id,
    }});

return res.json(appData);});

module.exports = router;