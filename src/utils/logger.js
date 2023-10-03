const winston = require('winston');
require('dotenv').config();

const DailyRotateFile = require('winston-daily-rotate-file');

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  winston.format.json(),
  winston.format.colorize({ all: true }),
);

// to create daily log file
const transport = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MMM-Do',
  dirname: 'logs/daily',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '1d',
  json: true,

});

// transport.on('rotate', (oldFIleName, newFileName) => {
//   // call function like upload to s3 or on cloud

// });

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),

  // for daily log
  transport,

];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,

  // all the exception message in exception handling file - after deployment it is good to use
  // exceptionHandlers:[
  //   new winston.transports.File({
  //     filename:'logs/exception.log'
  //   })
  // ],

  exitOnError: false,

});

module.exports = logger;
