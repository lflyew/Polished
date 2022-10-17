const router = require('express').Router();
const approutes = require('./appointments')

router.use('/appointments', approutes)


module.exports = router;
