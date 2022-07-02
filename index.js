require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connection = require('./db');
const user = require('./routes/user');
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
const corsOptions = {
        origin: '*',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }
    //connect to database
let gfs, gridfsBucket;
connection();

const conn = mongoose.connection;
conn.once("open", function() {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos"
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

//middlewares
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

//specifying routes
app.use('/user', user);
app.use('/admin', admin);


// media routes
app.get("/user/:filename", async(req, res) => {

    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // console.log(file);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.send(error.message);
    }
});

app.delete("/user/:filename", async(req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});




app.listen(PORT, () => {
    console.log("Listening on Port " + PORT)
});