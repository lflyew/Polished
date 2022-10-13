const router = require('express').Router();

router.get('/', (req, res) => {

    const services = [
        {
            "name": "Manicure",
            "description": "To do manicure"
        },
        {
            "name": "Pedicure",
            "description": "To do pedicure"
        }
    ]
    res.render('home', services);
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/appointment', (req, res) => {
    res.render('appointment');
});

module.exports = router;