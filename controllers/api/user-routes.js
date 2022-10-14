const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    const phone = req.query.phone;
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
});

module.exports = router;