let User = require('../models/User');
let bcrypt = require('bcrypt');

let { SALT_ROUNDS } = require('../config/config');

async function register(data) {

    let { username, password, repass } = data;

    if (!username || !password || !repass) {
        throw new Error('All fields are required!');
    }

    if (password !== repass) {
        throw new Error('Passwords don\'t match!');
    }

    let existName = await User.find({ username: username });

    if (existName.length > 0) {
        throw new Error('This username already exist!');
    }

    let hash = await bcrypt.hash(password, SALT_ROUNDS);

    let user = new User({ username, password: hash });

    return user.save();
}

module.exports = register;