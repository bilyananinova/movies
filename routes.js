let express = require('express');
let bodyParser = require('body-parser');

let getProducts = require('./services/getProducts');
let create = require('./services/createProduct');
let update = require('./services/updateProduct');
let deleteMovie = require('./services/deleteProduct');
let register = require('./services/registerUser');
let login = require('./services/loginUser');

let guest = require('./middlewares/isGuest');
let authenticate = require('./middlewares/isAuthenticate');

let { COOKIE_NAME } = require('./config/config');

let router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/all-movies', authenticate, async (req, res) => {
    let movies = await getProducts.getAll();

    if (req.query.search != undefined) {
        movies = await getProducts.getAllSearch(req.query.search);
    }

    res.render('catalog', { movies });
});

router.get('/create', authenticate, (req, res) => {
    res.render('create');
});

router.post('/create', authenticate, async (req, res) => {

    try {
        await create(req.user.id, req.body);
        res.redirect('/all-movies');
    } catch (error) {
        res.render('create', { error: error.message, movie: req.body });
    }
});

router.get('/details/:id', authenticate, async (req, res) => {
    let movie = await getProducts.getById(req.params.id);
    let creator = req.user.id == movie.creatorId;
    res.render('details', { creator, movie });
});

router.get('/edit/:id', authenticate, async (req, res) => {
    let movie = await getProducts.getById(req.params.id);
    res.render('edit', { movie });
});

router.post('/edit/:id', authenticate, async (req, res) => {
    try {
        await update(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', { error: error.message, movie: req.body });
    }
});

router.get('/delete/:id', authenticate, async (req, res) => {
    await deleteMovie(req.params.id);
    res.redirect(`/all-movies`);
});

router.get('/register', guest, (req, res) => {
    res.render('register');
});

router.post('/register', guest, async (req, res) => {

    try {
        let token = await register(req.body);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/all-movies');
    } catch (error) {
        res.render('register', { error: error.message, user: req.body });
    }
});

router.get('/login', guest, (req, res) => {
    res.render('login');
});

router.post('/login', guest, async (req, res) => {
    try {
        let token = await login(req.body);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/all-movies');
    } catch (error) {
        res.render('login', { error: error.message, user: req.body });
    }

});

router.get('/logout', authenticate, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

router.get('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;