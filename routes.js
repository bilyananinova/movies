let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');

let productServices = require('./services/getProducts');
let { Movie } = require('./services/createProduct');

let router = express.Router();
let moviesList = productServices.getAll();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/all-movies', (req, res) => {
    if(req.query.search != undefined) {
        moviesList = productServices.getAllSearch(req.query.search);
    }

    res.render('catalog', { moviesList });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    let movie = new Movie(req.body.movieName, req.body.movieDescription, req.body.movieImg);

    moviesList.push(movie);

    fs.writeFileSync(__dirname + '\\movies.json', JSON.stringify(moviesList), (err) => {
        if (err) {
            console.error(err.message);
            return
        }
    });

    res.redirect('/all-movies');

});

router.get('/details/:id', (req, res) => {
    let movie = productServices.getById(req.params.id);

    res.render('details', { movie });
})

module.exports = router;