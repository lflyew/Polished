const router = require('express').Router();
const User = require('../../models/User');

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
            else res.status(404).json("Not Found");
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
    }
});

module.exports = router;