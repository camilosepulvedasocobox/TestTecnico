const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// routes
app.use('/api/activities', require('./routes/activities'));
app.use('/api/todos', require('./routes/todos'));
// app.use('/api/uploads/', express.static(__dirname + '../backend'));

module.exports = app;