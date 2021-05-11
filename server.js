let express = require('express');

let app = express();

let config = require('./config/config');
let router = require('./routes');

require('./config/mongoose')(app);
require('./config/express-hbs')(app);

app.use('/static', express.static('public'));
app.use(router);

app.listen(config.PORT, () => console.log( `Server runs on port ${config.PORT}...`));