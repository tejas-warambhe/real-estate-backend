const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
// const upload = require('../middlewares/upload');



router.get('/ping', (req, res) => {
    res.status(201).json({ success: "Pong" });
})

// router.post("/upload", upload.single("file"), async(req, res) => {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:5000/user/${req.file.filename}`;
//     return res.send(imgUrl);
// });





router.post('/enquiry', async(req, res) => {
    // const { name, phone, email, property_name, scheduled_time, additional_info, type_of_enquiry } = req.body;
    try {
        console.log(req.body);
        let enquiry = await Enquiry.create(req.body);
        console.log(enquiry);
        //send enquiry on email using nodemailer

        res.status(201).send({
            success: enquiry
        });

    } catch (err) {
        console.log(err.message);
    }
})



module.exports = router;