const router = require('express').Router();
const apptRoutes = require('./appointment-routes');

router.use('/appointments', apptRoutes);

module.exports = router;
