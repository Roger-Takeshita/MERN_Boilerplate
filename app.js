const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./config/database');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

app.use('/api/users', require('./routes/users'));

app.get('/*', (req, res) => {
    res.send({ error: "Path doesn't exist" });
});

module.exports = app;
