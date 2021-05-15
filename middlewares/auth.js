let jwt = require('jsonwebtoken');
let { COOKIE_NAME, SECRET } = require('../config/config');

module.exports = function () {
    return async (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        if (token) {
            let decoded = await jwt.verify(token, SECRET);
            req.user = decoded;
            res.locals.user = decoded;
            res.locals.auth = true;
        }

        next();
    }
}
