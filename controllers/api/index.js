const router = require('express').Router();
const approutes = require('./appointments');
const bookingroutes = require('./bookings')

router.use('/appointments', approutes)
router.use('/bookings', bookingroutes)


module.exports = router;
