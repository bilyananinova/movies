
let config = {
   'development': {
        PORT: 5000,
        SALT_ROUNDS: 10,
        SECRET: 'mySecret',
        COOKIE_NAME: 'USER_SESSION',
        DB_CONNECTION: 'mongodb://localhost:27017/movies'
    },
    'production': {
        PORT: process.env.PORT || 80,
        SALT_ROUNDS: 10,
        SECRET: 'mySecret',
        COOKIE_NAME: 'USER_SESSION',
        DB_CONNECTION: 'mongodb+srv://admin:adminpassword@cluster0.mrpru.mongodb.net/moviesDb?retryWrites=true&w=majority'
    }
}
module.exports = config[process.env.NODE_ENV.trim()]