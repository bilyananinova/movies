let express = require('express');
let bodyParser = require('body-parser');

let getProducts = require('./services/getProducts');
let create = require('./services/createProduct');
let update = require('./services/updateProduct');
let deleteMovie = require('./services/deleteProduct');
let register = require('./services/registerUser');
let login = require('./services/loginUser');

let router = express.Router();

let { COOKIE_NAME } = require('./config/config');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/all-movies', async (req, res) => {
    let movies = await getProducts.getAll();

    if (req.query.search != undefined) {
        movies = await getProducts.getAllSearch(req.query.search);
    }

    res.render('catalog', { movies });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    await create(req.body);
    res.redirect('/all-movies');
});

router.get('/details/:id', async (req, res) => {
    let movie = await getProducts.getById(req.params.id);
    res.render('details', { movie });
});

router.get('/edit/:id', async (req, res) => {
    let movie = await getProducts.getById(req.params.id);
    res.render('edit', { movie });
});

router.post('/edit/:id', async (req, res) => {
    await update(req.params.id, req.body);
    res.redirect(`/details/${req.params.id}`);
});

router.get('/delete/:id', async (req, res) => {
    await deleteMovie(req.params.id);
    res.redirect(`/all-movies`);
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        let token = await register(req.body);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/all-movies');
    } catch (err) {
        return res.render('register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        let token = await login(req.body);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/all-movies');
    } catch (err) {
        return res.render('login');
    }

});

router.get('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;