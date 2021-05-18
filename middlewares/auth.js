let jwt = require('jsonwebtoken');
let { COOKIE_NAME, SECRET } = require('../config/config');

module.exports = function () {
    return async (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        if (token) {
            jwt.verify(token, SECRET, function (err, decoded) {
                if(err) {
                    return res.redirect('/');
                }
                req.user = decoded;
                res.locals.user = decoded;
                res.locals.auth = true;
            });
        }

        next();
    }
}
