const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    image_url: {
        type: String
    },
    blog_content: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;