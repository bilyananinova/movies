let moviesList = require('../movies.json');

function getAll() {
    return moviesList
}

function getById(id) {
    let movie = moviesList.find(m => m.id == id);
    return movie;
}

function getAllSearch(query) {
    let movies = moviesList.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    return movies;
}

module.exports = {
    getAll,
    getById,
    getAllSearch
}