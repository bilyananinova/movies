let mongoose = require('mongoose');
let config = require('../config/config');
console.log(config.DB_CONNECTION);

function setUp() {
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    let db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error)
    });
    db.once('open', () => {
        console.log('DB connected');
    });
};


module.exports = setUp;