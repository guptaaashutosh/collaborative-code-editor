const http = require('http');
const app = require('./src/app');

require('dotenv').config();

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: './.config/.env',
});

const connnection = require('./config');

const logger = require('./src/utils/logger');

const message = require('./src/constants/message');
const SocketClass = require('./src/utils/socket');

const server = http.createServer(app);

SocketClass.connectSocket(server);

server.listen(connnection.port, () => {
  logger.info(`${message.SERVER_START_MESSEGE} ${connnection.port}`);
  console.info(`${message.SERVER_START_MESSEGE} ${connnection.port}`);
});
