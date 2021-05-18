let Movie = require('../models/Movie');
let mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);

function update(id, data) {

    if (!data.name || !data.description || !data.img) {
        throw new Error('All fields are require!');
    }

    if (!data.img.startsWith('http') || !data.img.startsWith('https')) {
        throw new Error('Image must be URL!');
    }

    let movie = Movie.findByIdAndUpdate({ _id: id }, data).lean();
    return movie;
}

module.exports = update;