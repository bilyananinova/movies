let express = require('express');
let handlebars = require('express-handlebars');
let config = require('./config/config');


let app = express();

//handlebars
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

//static
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(config.PORT, () => console.log( `Server runs on port ${config.PORT}...`))