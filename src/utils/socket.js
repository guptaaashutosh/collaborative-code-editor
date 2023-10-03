const socketIO = require('socket.io');

class SocketClass {
  constructor() {
    this.io = null;
  }

  // Initialize WebSocket connection
  connectSocket(server) {
    this.io = socketIO(server);

    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // forward message to all in case new user connected
      socket.on('join', (data) => {
        const { codeId } = data;
        // join the room of code id
        socket.join(codeId);
      });

      // });
      // Handle disconnection
      // socket.on('disconnect', () => {
      //   console.log(`User disconnected: ${socket.id}`);
      // });
    });
  }

  // Get the WebSocket instance
  getSocketIO() {
    return this.io;
  }

  // emit message to all the user in the room
  emitMessageInRoom(codeId, eventName, message) {
    this.io.to(codeId).emit(eventName, message);
  }
}

const socketInstance = new SocketClass();

module.exports = socketInstance;
