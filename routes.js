let express = require('express');
let bodyParser = require('body-parser');
let moment = require('moment');

let getProducts = require('./services/getProducts');
let create = require('./services/createProduct.js');
let update = require('./services/updateProduct');
let deleteMovie = require('./services/deleteProduct');
let like = require('./services/like');
let comment = require('./services/comment');
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
    let isLiked = await getProducts.isLiked(req.params.id, res.locals.user.id);
    let comments = movie.comments.map(c => ({ ...c, date: moment(c.date).format("MMM Do YY") }));

    res.render('details', { creator, movie, isLiked, comments });
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

router.get('/like/:id', authenticate, async (req, res) => {
    try {
        await like(req.params.id, res.locals.user.id);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('details', { error: error.message, movie: req.body });
    }
});

router.post('/comments/:id', async (req, res) => {
    try {
        await comment(req.body, req.params.id);
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('details', { err })
    }
});

router.get('/my-page', async (req, res) => {
    let movies = await getProducts.getMyMovies(res.locals.user.id);
    let likedMovies = await getProducts.getLikedMovies(res.locals.user.id);
    res.render('my-page', { movies, likedMovies });
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