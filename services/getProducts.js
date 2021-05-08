let moviesList = require('../movies.json');

function getAll() {
    return moviesList
}

function getById(id) {
    let movie = moviesList.find(m => m.id == id);
    return movie;
}

module.exports = {
    getAll,
    getById
}