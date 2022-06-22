const mongoose = require('mongoose');
const { Schema } = mongoose;


const EnquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    property_details: {
        type: String,
        required: true,
    },
    price_range: {
        type: Number,
        required: true,
    },

    other_info: {
        type: String
    }
});

const Enquiry = mongoose.model('enquiry', EnquirySchema);

module.exports = Enquiry;