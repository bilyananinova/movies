let express = require('express');
let cookieParser = require('cookie-parser');
let favicon = require('serve-favicon');
let path = require('path');

let app = express();

let config = require('./config/config');
let router = require('./routes');
let auth = require('./middlewares/auth');

require('./config/mongoose')(app);
require('./config/express-hbs')(app);

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(auth());
app.use(router);

app.listen(config.PORT, () => console.log( `Server runs on port ${config.PORT}...`));