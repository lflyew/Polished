const router = require('express').Router();
const Appointment = require('../../models/Appointment')

// new appointment

router.post('/', (req, res) => {
  const appData = Appointment.create(req.body);

  return res.json(appData);});


// update appointment
router.put('/', async (req, res) => {
  const appData = await Appointment.update(
    {
      id: req.body.id,
      date: req.body.date,
      time_slot: req.body.time_slot,
      user_id: req.body.user_id,
    },
    {
      where: {
        id: req.body.id,
      },
    }
    
  );
  return res.json(appData);});


// delete appointment
router.delete('/', async (req, res) => {
  const appData = await Appointment.destroy({
    where: {
      user_id: req.body.user_id,
    },
  });

  return res.json(appData);});

module.exports = router;