require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connectToMongo = require('./db');
const user = require('./routes/user');

//connect to database
connectToMongo();

//middlewares
app.use(cors());
app.use(express.json());

//specifying routes
app.use('/user', user);

app.listen(PORT, () => {
    console.log("Listening on Port " + PORT)
});