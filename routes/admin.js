const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Enquiry = require('../models/Enquiry');
const multer = require("multer");
const Project = require('../models/Project');
const Subscriptions = require('../models/Subscriptions');
const cloudinary = require("cloudinary").v2;
// const bodyParser = require("body-parser");
const fs = require("fs");

var storage = multer.diskStorage({

    destination: "./public/images",
    filename: function(req, file, cb) {
        let url = file.originalname.replace(/\ /g, "");
        // let url = file.originalname;
        cb(null, Date.now() + '-' + url);
    }
})

cloudinary.config({
    cloud_name: "rushirrj",
    api_key: "847177992113957",
    api_secret: "FdNGOwSBtpuVmXQRdvj3qS0dkDw",
});

async function uploadToCloudinary(locaFilePath, filename) {

    // locaFilePath: path of image which was just
    // uploaded to "uploads" folder

    var mainFolderName = "public/images/";
    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    var filePathOnCloudinary = mainFolderName + filename;

    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {

            // Image has been successfully uploaded on
            // cloudinary So we dont need local image 
            // file anymore
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {
            console.log(error);
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { message: "Fail" };
        });
}

// const uploadMultiple = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
const upload = multer({ storage: storage });


router.post('/single_img', upload.single('file'), (req, res) => {
    try {

        // console.log(req.body.cow);
        console.log(req.file);
        return res.status(201).send(req.file)

    } catch (err) {
        console.log(err.message);
    }
})

router.post('/multiple_img', upload.array('files', 12), async(req, res) => {
    try {
        console.log(req.files);

        var imageUrlList = [];

        for (var i = 0; i < req.files.length; i++) {
            var locaFilePath = req.files[i].path;

            // Upload the local image to Cloudinary
            // and get image url as response
            var result = await uploadToCloudinary(locaFilePath, req.files[i].filename);
            imageUrlList.push(result.url);
        }

        console.log(imageUrlList);



        return res.status(201).send(imageUrlList);
    } catch (err) {
        console.log(err.message);
    }
})




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
        });
    } catch (err) {
        console.log(err.message);
    }
})

router.get('/products', async(req, res) => {

    try {
        let products = await Project.find({});
        res.status(201).json({
            success: true,
            data: products
        })

    } catch (err) {
        console.log(err);
    }
})

//get single product
router.get('/product/from/:id', async(req, res) => {
    const { id } = req.params;
    try {
        let product = await Project.findOne({ _id: id });

        return res.status(201).json({
            success: true,
            data: product
        });

    } catch (err) {
        console.log(err.message);
    }
})

//Create Project 
router.post('/product', async(req, res) => {

    try {

        let Product = await Project.create(req.body);
        res
            .status(201)
            .json({
                status: true,
                data: Product
            });

    } catch (err) {
        console.log(err.message);
    }
});

//delete product by id
router.delete('/product/:id', async(req, res) => {
    const { id } = req.params;
    try {
        let DeletedProduct = await Project.findByIdAndDelete({ _id: id });

        res.status(201).json({
            status: true,
            data: DeletedProduct
        });

    } catch (err) {
        console.log(err.message);
    }
})

//edit product by id
router.put('/product/update/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const filter = { _id: id };
        let updatedProject = await Project.findOneAndUpdate(filter, req.body);
        console.log(updatedProject);
        res.status(201).json({
            success: true,
            updatedProject: updatedProject
        })

    } catch (err) {
        console.log(err.message);
    }
})



//Blog Apis Start
router.get('/blogs', async(req, res) => {

    try {
        let blogs = await Blog.find({});
        res.status(201).json({
            success: true,
            data: blogs
        })

    } catch (err) {
        console.log(err);
    }
})

//get single blog
router.get('/blog/from/:id', async(req, res) => {
    const { id } = req.params;
    try {
        let blog = await Blog.findOne({ _id: id });

        return res.status(201).json({
            success: true,
            data: blog
        });

    } catch (err) {
        console.log(err.message);
    }
})

//Create Blog 
router.post('/blog', async(req, res) => {

    try {

        let blog = await Blog.create(req.body);
        res
            .status(201)
            .json({
                status: true,
                data: blog
            });

    } catch (err) {
        console.log(err.message);
    }
});

//delete blog by id
router.delete('/blog/:id', async(req, res) => {
    const { id } = req.params;
    try {
        let DeletedBlog = await Blog.findByIdAndDelete({ _id: id });

        res.status(201).json({
            status: true,
            data: DeletedBlog
        });

    } catch (err) {
        console.log(err.message);
    }
})

//edit blog by id
router.put('/blog/update/:id', async(req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const filter = { _id: id };
        let updatedBlog = await Blog.findOneAndUpdate(filter, req.body);
        res.status(201).json({
            success: true,
            updatedBlog: updatedBlog
        })

    } catch (err) {
        console.log(err.message);
    }
})


//get all subscriptions
router.get('/subscriptions', async(req, res) => {
    try {
        const subscriptions = await Subscriptions.find({});

        return res.status(201).json({
            success: true,
            data: subscriptions
        })

    } catch (err) {
        console.log(err.message);
    }
})





// router.post('/blog/create', upload.single('file'), async(req, res) => {
//     const { title, author, blog_content, tags, comments } = req.body;
//     // coments and tags are arrays


//     try {
//         const image_url = `http://localhost:5000/user/${req.file.filename}`;
//         let blog = await Blog.create({
//             title: title,
//             author: author,
//             blog_content: blog_content,
//             tags: tags,
//             image_url: image_url,
//             comments: comments
//         });
//         return res.status(201).json({
//             success: blog
//         })
//     } catch (err) {
//         console.log(err.message);
//     }
// })


module.exports = router;