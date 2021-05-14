let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);