const http = require('http');
// const socketIo = require('socket.io');
const app = require('./src/app');

require('dotenv').config();

// it .env.example by default
// path for .env file should be provide if it is in any folder
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: './.config/.env',
});

const connnection = require('./config');

const logger = require('./src/utils/logger');

// const databaseConnection = require('./.config/dbConn');
const message = require('./src/constants/message');
// const socketConnection = require('./src/utils/socket');
const SocketClass = require('./src/utils/socket');

const server = http.createServer(app);

SocketClass.connectSocket(server);

// databaseConnection();
server.listen(connnection.port, () => {
  logger.info(`${message.SERVER_START_MESSEGE} ${connnection.port}`);
  console.info(`${message.SERVER_START_MESSEGE} ${connnection.port}`);
});

// module.exports = clientSocket;
