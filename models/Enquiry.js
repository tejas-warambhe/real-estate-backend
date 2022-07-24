const mongoose = require('mongoose');
const { Schema } = mongoose;


const EnquirySchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    property_name: {
        type: String,
        // required: true,
    },
    scheduled_time: {
        type: String,
        // required: true
    },
    type_of_enquiry: {
        type: String,
    },
    additional_info: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }


});

const Enquiry = mongoose.model('enquiry', EnquirySchema);

module.exports = Enquiry;