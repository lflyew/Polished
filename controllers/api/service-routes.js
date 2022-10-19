const router = require('express').Router();
const Service = require('../../models/Service');
const { withAuth, isCustomer, isManager }  = require('../../utils/route-helpers');

router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll({ raw: true });
        res.status(200).json({
            services: services
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
