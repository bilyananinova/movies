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
    creatorId: String
});

module.exports = mongoose.model('Movie', movieSchema);