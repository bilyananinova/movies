let express = require('express');
let handlebars = require('express-handlebars');

let config = require('./config/config');
let router = require('./routes');

let app = express();

//handlebars
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

//moddlewares
app.use('/static', express.static('public'));
app.use(router);

app.listen(config.PORT, () => console.log( `Server runs on port ${config.PORT}...`));