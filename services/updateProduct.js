let Movie = require('../models/Movie');
let mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);

function update(id, data) {
    let movie = Movie.findByIdAndUpdate({ _id: id }, data).lean();
    return movie;
}

module.exports = update;