const expressWinston = require('express-winston');
const logger = require('./logger');

const winstonMiddleWare = expressWinston.logger({
  winstonInstance: logger,
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: ' HTTP {{req.url}} {{res.statusCode}} {{res.responseTime}}ms', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).

  // Custom request formatting function to include request body and headers
  requestWhitelist: [...expressWinston.requestWhitelist, 'body', 'headers'],
  // Include response time in logs
  responseWhitelist: [...expressWinston.responseWhitelist, 'responseTime'],
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

module.exports = winstonMiddleWare;
