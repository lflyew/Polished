const router = require('express').Router();
const servRoutes = require('./service-routes');

router.use('/services', servRoutes);

module.exports = router;
