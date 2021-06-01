let express = require('express');
let bodyParser = require('body-parser');

let productController = require('./controllers/productController');
let authController = require('./controllers/authController');

let router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.use('/', productController);
router.use('/', authController);

router.get('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;