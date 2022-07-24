require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connection = require('./db');
const user = require('./routes/user');
const admin = require('./routes/admin');
const mongoose = require('mongoose');

const corsOptions = {
        origin: '*',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }
    //connect to database

connection();



//middlewares
app.use(cors(corsOptions));
// app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));
app.use(express.json());
app.use('/public/images', express.static(__dirname + '/public/images/'));

//specifying routes
app.use('/user', user);
app.use('/admin', admin);






app.listen(PORT, () => {
    console.log("Listening on Port " + PORT)
});