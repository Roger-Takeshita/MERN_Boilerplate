const express = require('express');
const logger = require('morgan');

require('./config/database');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', require('./routes/users'));

app.get('/*', (req, res) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

module.exports = app;
