let moviesList = require('../movies.json');
let Movie = require('../models/Movie');

async function getAll() {
    let movies = await Movie.find().lean();
    return movies;
}

async function getById(id) {
    let movie = await Movie.findById(id).lean();
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