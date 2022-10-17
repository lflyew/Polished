const router = require('express').Router();
const approutes = require('./appointments');
const bookingroutes = require('./bookings')

router.use('/appointments', bookingroutes)


module.exports = router;
