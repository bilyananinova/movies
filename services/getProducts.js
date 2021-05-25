let Movie = require('../models/Movie');
let ObjectId = require('mongoose').Types.ObjectId;

async function getAll() {
    let movies = await Movie.find()
        .sort({ likes: -1 })
        .lean();
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

async function isLiked(id, user) {
    let like = false;
    let movie = await Movie.findOne({
        _id: id,
        likes: { _id: user }
    }).lean();

    if (movie) {
        like = true;
    }
    return like;
}

async function getMyMovies(userId) {
    let movies = await Movie.find({ creatorId: userId }).lean();
    return movies;
}

async function getLikedMovies(userId) {
    let movies = await Movie.find({
        likes: {
            _id: userId
        }
    }).lean();
    return movies;
}

module.exports = {
    getAll,
    getById,
    getAllSearch,
    isLiked,
    getMyMovies,
    getLikedMovies
}