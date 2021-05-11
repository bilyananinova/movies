let express = require('express');
let bodyParser = require('body-parser');

let getProducts = require('./services/getProducts');
let create = require('./services/createProduct');

let router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/all-movies', async (req, res) => {
    // if (req.query.search != undefined) {
    //     moviesList = productServices.getAllSearch(req.query.search);
    // }
   
    let movies = await getProducts.getAll();
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

router.get('*', (req, res) => {
    res.status(404).render('404');
})

module.exports = router;