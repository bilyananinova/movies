let Movie = require('../models/Movie');

function create(id, data) {

    if(!data.name || !data.description || !data.img) {
        throw new Error('All fields are require!');
    }
    
    if (!data.img.startsWith('http') || !data.img.startsWith('https')) {
        throw new Error('Image must be URL!');
    }

    let movie = new Movie({ creatorId: id, ...data });
    return movie.save();
}

module.exports = create;