let express = require('express');
let router = express.Router();

//middlewares
let guest = require('../middlewares/isGuest');
let authenticate = require('../middlewares/isAuthenticate');

//services
let register = require('../services/registerUser');
let login = require('../services/loginUser');

//configurations
let { COOKIE_NAME } = require('../config/config');


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

module.exports = router;
