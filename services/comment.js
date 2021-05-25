let Movie = require('../models/Movie');
let moment = require('moment');

async function comment(data, id) {
    let comment = await Movie.updateOne(
        { _id: id },
        {
            '$push': {
                comments: {
                    author: data.author,
                    content: data.content
                }
            }
        }
    )

    let movie = await Movie.find({_id: id}).lean();

    return movie;
}

module.exports = comment;