let Movie = require('../models/Movie');

async function like(id, user) {
    let movie = await Movie.updateOne({ _id: id }, { '$push': { likes: user } });
    return movie
}

module.exports = like;