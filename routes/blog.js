const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Blog = require('../models/Blog');

router.get('/ping', (req, res) => {
    return res.status(201).json({ success: "Pong" });
});

router.post('/create', upload.single('file'), async(req, res) => {
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