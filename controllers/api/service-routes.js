const router = require('express').Router();
const Service = require('../../models/Service');

router.get('/', async (req, res) => {
    try {
<<<<<<< HEAD
        const servData = await Service.findAll({raw: true});
        if (!servData) res.status(404).json({"messange":"there is no services"});
        else {
            res.status(200).json({"services": servData});
        }
    } catch(err) {
        res.status(400).json(err);
    }
})
module.exports = router;
=======
        const services = await Service.findAll({ raw: true });
        res.status(200).json({
            services: services
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
>>>>>>> main
