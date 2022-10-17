const router = require('express').Router();
const Bookings = require('../../models/Appointment_service')

// new Bookings

router.post('/:user_id', (req, res) => {
  const appData = Bookings.create(req.body);

  return res.json(appData);});


// update Bookings
router.put('/:user_id', async (req, res) => {
  const appData = await Bookings.update(
    {
      id: req.body.id,
      appointment_id: req.body.appointment_id,
      service_id: req.body.service_id,
      user_id: req.body.user_id,
    },
    {
      where: {
        id: req.body.id,
      }});
  return res.json(appData);});


// delete Bookings
router.delete('/:user_id', async (req, res) => {
  const appData = await Bookings.destroy({
    where: {
      user_id: req.body.user_id,
    },
  });

  return res.json(appData);});

module.exports = router;