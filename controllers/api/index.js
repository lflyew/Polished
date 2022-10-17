const router = require('express').Router();
<<<<<<< HEAD
const servRoutes = require('./service-routes');

router.use('/services', servRoutes);
=======
const apptRoutes = require('./appointment-routes');
const userRoutes = require('./user-routes');
const servRoutes = require('./service-routes');
const bookingRoutes = require('./booking-routes');

router.use('/appointments', apptRoutes);
router.use('/users', userRoutes);
router.use('/services', servRoutes);
router.use('/bookings', bookingRoutes);
>>>>>>> main

module.exports = router;
