const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

router.get('/ping', (req, res) => {
    res.status(201).json({ success: "Pong" });
})


router.post('/enquiry', async(req, res) => {
    const { name, phone, email, property_details, price_range, other_info } = req.body;
    try {

        let enquiry = await Enquiry.create({
            name: name,
            phone: phone,
            email: email,
            property_details: property_details,
            price_range: price_range,
            other_info: other_info
        });

        //send enquiry on email using nodemailer

        res.status(201).send({
            success: enquiry
        });

    } catch (err) {
        console.log(err.message);
    }
})



module.exports = router;