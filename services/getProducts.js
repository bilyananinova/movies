let Movie = require('../models/Movie');

async function getAll() {
    let movies = await Movie.find().lean();
    return movies;
}

async function getById(id) {
    let movie = await Movie.findById(id).lean();
    return movie;
}

async function getAllSearch(query) {
    let movies = await Movie.find({ "name": { "$regex": query, "$options": "i" } }).lean();
    return movies;
}

module.exports = {
    getAll,
    getById,
    getAllSearch
}