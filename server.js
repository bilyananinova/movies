let express = require('express');
let cookieParser = require('cookie-parser');

let app = express();

let config = require('./config/config');
let router = require('./routes');

require('./config/mongoose')(app);
require('./config/express-hbs')(app);

app.use('/static', express.static('public'));
app.use(cookieParser())
app.use(router);

app.listen(config.PORT, () => console.log( `Server runs on port ${config.PORT}...`));