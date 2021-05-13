let Movie = require('../models/Movie');

async function deleteMovie(id) {
    let movie = await Movie.findByIdAndDelete(id);
    return movie;
}

module.exports = deleteMovie;