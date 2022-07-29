const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:tejas@cluster0.gwpiq.mongodb.net/?retryWrites=true&w=majority';

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("MongoDB connected succesfully");
    });
}

module.exports = connectToMongo;