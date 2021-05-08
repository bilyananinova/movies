let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {layout: false});
});

router.get('/all-movies', (req, res) => {
    res.render('catalog', {layout: false});
});

module.exports = router;