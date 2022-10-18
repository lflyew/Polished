const Appointment = require('../models/Appointment');
const User = require('../models/User');

const router = require('express').Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        const servData = await Service.findAll();
        var services = servData.map((serv) => serv.get({ plain: true}));
        if (!services) res.status(404).json({"messange": "there is no services"});
        else {
            res.render('home', {
                services: services,
                user_role: req.session.user_role,
                logged_in: req.session.logged_in,
            });
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/appointment', (req, res) => {
    res.render('appointment');
});

router.get('/manager', (req, res) => {
    res.render('manager');
})

module.exports = router;