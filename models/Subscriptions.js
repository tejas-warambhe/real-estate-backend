const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    email: {
        type: String
    }
})





const Subscriptions = mongoose.model('subscriptions', SubscriptionSchema);

module.exports = Subscriptions;