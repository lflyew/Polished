const Appointment = require('../models/Appointment');
const User = require('../models/User');

const router = require('express').Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        const servData = await Service.findAll();
        // im faking image link NOW
        var services = servData.map((serv) => serv.get({ plain: true}));
        services.map((serv) => {
            serv.image_link = "https://picsum.photos/200";
        });
        if (!services) res.status(404).json({"messange":"there is no services"});
        else {
            res.render('home', {services: services});
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

router.get('/manager', (req, res) => {
    res.render('manager');
})

module.exports = router;