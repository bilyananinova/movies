let mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    img: {
        type: String,
        required: [true, 'Image is required!'],
        validate: /^http?/
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        author: String,
        date: {
            type: Date,
            default: Date.now
        },
        content: String
    }]

});

module.exports = mongoose.model('Movie', movieSchema);