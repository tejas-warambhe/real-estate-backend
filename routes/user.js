const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const upload = require('../middlewares/upload');



router.get('/ping', (req, res) => {
    res.status(201).json({ success: "Pong" });
})

router.post("/upload", upload.single("file"), async(req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:5000/user/${req.file.filename}`;
    return res.send(imgUrl);
});





router.post('/enquiry', async(req, res) => {
    const { name, phone, email, propert_name } = req.body;
    try {

        let enquiry = await Enquiry.create({
            name: name,
            phone: phone,
            email: email,
            property_details: propert_name
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