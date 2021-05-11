let handlebars = require('express-handlebars');

function setUp (app) {
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
}

module.exports = setUp;