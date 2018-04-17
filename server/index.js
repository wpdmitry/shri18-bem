const path = require('path');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const slashes = require('connect-slashes');
const device = require('express-device');
const compression = require('compression');

const config = require('./config');
const staticFolder = path.resolve(__dirname, '..', config.staticFolder);

const Render = require('./render');
const render = Render.render;

const port = process.env.PORT || config.defaultPort;
const isDev = process.env.NODE_ENV === 'development';

require('debug-http')();

// для теста
function setHeaders(res) {
    res.setHeader('Cache-Control', 'no-cache');
}

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(compression())
    .use(favicon(path.join(staticFolder, 'img/favicon.ico')))
    .use(serveStatic(staticFolder, {setHeaders: setHeaders}))
    .use(device.capture());

isDev || app.use(slashes());

app.get('/', function(req, res) {
    const platform = req.device.type;

    render(req, res, {
        title: 'Zen',
        meta: {
            description: 'Yandex Zen',
        },
        device: platform,
    })
});

isDev && require('./rebuild')(app);

app.get('*', function(req, res) {
    res.status(404);
    res.send('Error');
});

if (isDev) {
    app.get('/error/', function() {
        throw new Error('Uncaught exception from /error');
    });

    app.use(require('errorhandler')());
}

app.listen(port, function() {
    console.log('server is listening on', this.address().port);
});
