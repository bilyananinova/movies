let User = require('../models/User');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let { SECRET } = require('../config/config');

async function login(data) {
    let { username, password } = data;

    if (!username || !password) {
        throw new Error('All fields are require!');
    }

    let user = await User.findOne({ username});

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    let hash = user.password;

    let match = await bcrypt.compare(password, hash);

    if (match == false) {
        throw new Error('Wrong username or password!');
    }

    let token = await jwt.sign({ id: user._id, username }, SECRET);
    return token;
}

module.exports = login;