let User = require('../models/User');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let { SALT_ROUNDS, SECRET } = require('../config/config');

async function register(data) {

    let { username, password, repass } = data;

    if (!username || !password || !repass) {
        throw new Error('All fields are required!');
    }

    if (password.length < 5) {
        throw new Error('Password must be at least 5 characters long!');
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must be at least 1 capital letter');
    }
    
    if (password !== repass) {
        throw new Error('Passwords don\'t match!');
    }

    let existName = await User.find({ username });

    if (existName.length > 0) {
        throw new Error('This username already exist!');
    }

    let hash = await bcrypt.hash(password, SALT_ROUNDS);

    let user = new User({ username, password: hash });
    user.save();

    let token = await jwt.sign({ id: user._id, username }, SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = register;