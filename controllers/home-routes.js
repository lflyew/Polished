const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/appointment', (req, res) => {
    res.render('appointment');
});

router.get('/manager', (req, res) => {
    res.render('manager');
});

module.exports = router;