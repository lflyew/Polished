const router = require('express').Router();
const User = require('../../models/User');
<<<<<<< HEAD

router.get('/', async (req, res) => {
    const phone = req.query.phone;
    if (phone) {
        console.log("here");
        try {
            const customer = await User.findOne({
                raw: true,
                where: {
                    phone: phone,
                    role: "customer"
                }
            });

            if (customer) res.status(200).json(customer);
            else res.status(400).json("Not Found");
        } catch (err) {
            res.status(400).json(err);
        }
    }
    const role = req.query.role;
    if (role) {
        try {
            const technicians = await User.findAll({
                raw: true,
                where: {
                    role: role
                }
            });

            if (technicians) res.status(200).json(technicians);
            else res.status(400).json("Not Found");
        } catch (err) {
            res.status(400).json(err);
        }
=======
const Booking = require('../../models/Booking');
const Appointment = require('../../models/Appointment');
const { where } = require('sequelize');

router.get('/', async (req, res) => {
    var whereFinder = {};
    if (req.query.phone) whereFinder.phone = req.query.phone;
    if (req.query.role) whereFinder.role = req.query.role;
    try {
        var userData = await User.findAll({
            where: whereFinder,
            include: {
                model: Appointment,
                include: [{
                    model: Booking,
                }]
            }
        });
        var users = userData.map(user => user.get({plain: true}));
        if (users) res.status(200).json(users);
        else res.status(400).json("Not Found");
    } catch (err) {
        res.status(400).json(err);
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
    }
});

module.exports = router;