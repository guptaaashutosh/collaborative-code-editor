const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: './.config/.env',
});

const winstonMiddleWare = require('./utils/winstonMiddleWare');

const indexRoute = require('./components/index.route');

// winston log middleware should be used before routes
app.use(winstonMiddleWare);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', indexRoute);

// express-error handling
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
