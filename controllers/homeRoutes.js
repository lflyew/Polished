const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/appointment', (req, res) => {
    res.render('appointment',{
        appointments:[
            {
                "date": "2022-10-14T00:00:00",
                "time_slot": 1,
                "user_id": 2
            },
            {
                "date": "2022-10-20T00:00:00",
                "time_slot": 5,
                "user_id": 2
            },
            {
                "date": "2022-10-25T00:00:00",
                "time_slot": 1,
                "user_id": 3
            },
            {
                "date": "2022-10-20T00:00:00",
                "time_slot": 4,
                "user_id": 5
            }
        ]

    });
});

module.exports = router;