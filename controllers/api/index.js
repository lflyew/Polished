const router = require('express').Router();
const apptRoutes = require('./appointment-routes');
const userRoutes = require('./user-routes');
const servRoutes = require('./service-routes');

router.use('/appointments', apptRoutes);
router.use('/users', userRoutes);
router.use('/services', servRoutes);

module.exports = router;
