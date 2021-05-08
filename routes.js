let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/all-movies', (req, res) => {
    res.render('catalog');
});

router.get('/create', (req, res) => {
    res.render('create');
});

module.exports = router;