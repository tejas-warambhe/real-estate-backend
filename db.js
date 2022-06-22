const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("MongoDB connected succesfully");
    });
}

module.exports = connectToMongo;