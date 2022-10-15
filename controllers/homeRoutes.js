const router = require('express').Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        const servData = await Service.findAll({raw: true});
        // im faking image link NOW
        const services = servData.map((serv) => serv.image_link = "https://picsum.photos/200");
        console.log(servData);
        if (!servData) res.status(404).json({"messange":"there is no services"});
        else {
            console.log(servData);
            res.render('home', {services: servData});
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/appointment', (req, res) => {
    res.render('appointment');
});

module.exports = router;