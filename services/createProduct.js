let Movie = require('../models/Movie');

function create(data) {
    let movie = new Movie({...data });
    return movie.save();
}

module.exports = create;