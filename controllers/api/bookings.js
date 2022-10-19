const router = require('express').Router();
const Bookings = require('../../models/Appointment_service')

router.get('/:user_id', async (req, res) => {
const bookingsData = await Bookings.findAll(
    {where: {
    user_id: req.params.user_id
    }})
    return res.json(bookingsData)});

// new Bookings
router.post('/:user_id', (req, res) => {
    const appData = Bookings.create(req.body);
    return res.json(appData);});

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