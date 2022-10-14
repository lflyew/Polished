const router = require('express').Router();
const apptRoutes = require('./appointment-routes');
const userRoutes = require('./user-routes');

router.use('/appointments', apptRoutes);
router.use('/users', userRoutes);

module.exports = router;
