const router = require('express').Router();
const apptRoutes = require('./appointment-routes');
const userRoutes = require('./user-routes');
const servRoutes = require('./service-routes');
<<<<<<< HEAD
=======
const bookingRoutes = require('./booking-routes');
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99

router.use('/appointments', apptRoutes);
router.use('/users', userRoutes);
router.use('/services', servRoutes);
<<<<<<< HEAD
=======
router.use('/bookings', bookingRoutes);
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99

module.exports = router;
