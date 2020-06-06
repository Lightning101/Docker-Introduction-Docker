'use strict'
require('./config/mongoDBconfigs');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const heroRoutes = require('./routes/hero/index');


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '2000mb'
}));

// Handle cros
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/hero', heroRoutes.hero);

const port = 3000
app.listen(3000, () => console.log(`Hero Server up and running http://localhost:${port}`))

// To be used when combined
// app.use(bodyParser.urlencoded({ 'extended': 'true' }));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/', express.static(path.join(__dirname, 'dist')));