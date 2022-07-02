const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Blog = require('../models/Blog');
const Enquiry = require('../models/Enquiry');

router.get('/ping', (req, res) => {
    return res.status(201).json({ success: "Pong" });
});

router.get('/enquiries', async(req, res) => {
    try {
        let enquiriesArray = await Enquiry.find({});
        res.status(200).json({
            success: enquiriesArray
        });
    } catch (err) {
        console.log(err.message);
    }
})

router.delete('/enquiry/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        let enquiry = await Enquiry.findByIdAndDelete({ _id: id });
        // const response = await enquiry.destroy({
        //     where: {
        //         _id: id
        //     }
        // });

        res.status(200).json({
            success: enquiry
        })
    } catch (err) {
        console.log(err.message);
    }
})


router.post('/blog/create', upload.single('file'), async(req, res) => {
    const { title, author, blog_content, tags, comments } = req.body;
    // coments and tags are arrays


    try {
        const image_url = `http://localhost:5000/user/${req.file.filename}`;
        let blog = await Blog.create({
            title: title,
            author: author,
            blog_content: blog_content,
            tags: tags,
            image_url: image_url,
            comments: comments
        });
        return res.status(201).json({
            success: blog
        })
    } catch (err) {
        console.log(err.message);
    }
})


module.exports = router;