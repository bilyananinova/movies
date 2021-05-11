let mongoose = require('mongoose');

function setUp() {
    mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });
    let db = mongoose.connection;
    db.on('error', () => {
        console.error(error)
    });
    db.once('open', () => {
        console.log('DB connected');
    });
};


module.exports = setUp;