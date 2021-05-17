let Movie = require('../models/Movie');

function create(id, data) {
    let movie = new Movie({creatorId: id, ...data });
    return movie.save();
}

module.exports = create;