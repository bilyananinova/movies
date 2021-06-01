let express = require('express');
let router = express.Router();
let moment = require('moment');

//middlewares
let authenticate = require('../middlewares/isAuthenticate');

//services
let getProducts = require('../services/getProducts');
let create = require('../services/createProduct.js');
let update = require('../services/updateProduct');
let deleteMovie = require('../services/deleteProduct');
let like = require('../services/like');
let comment = require('../services/comment');

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

    try {
        let movie = await getProducts.getById(req.params.id);
        let creator = req.user.id == movie.creatorId;
        let isLiked = await getProducts.isLiked(req.params.id, res.locals.user.id);
        let comments = movie.comments.map(c => ({ ...c, date: moment(c.date).format("MMM Do YY") }));

        res.render('details', { creator, movie, isLiked, comments });
    } catch (error) {
        res.render('details', { error: error.message });
    }

});

router.get('/edit/:id', authenticate, async (req, res) => {

    try {
        let movie = await getProducts.getById(req.params.id);
        res.render('edit', { movie });
    } catch (error) {
        res.render('edit', { error: error.message, movie: req.body });
    }

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

    try {
        await deleteMovie(req.params.id);
        res.redirect(`/all-movies`);
    } catch (error) {
        res.render('details', { error: error.message, movie: req.body });
    }

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
    } catch (error) {
        res.render('details', { error: error.message })
    }
    
});

router.get('/my-page', async (req, res) => {
    let movies = await getProducts.getMyMovies(res.locals.user.id);
    let likedMovies = await getProducts.getLikedMovies(res.locals.user.id);
    res.render('my-page', { movies, likedMovies });
});


module.exports = router;