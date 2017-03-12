var net = require("net");

function ChatServer(port) {
  this.port = port;
  this.totalClients = 0;
  this.clients = {};
  this.server = net.createServer();

  this.attachListeners();

  this.server.listen(/* TODO: Complete this function */);

}

// Broadcast the same message to each connected client.
ChatServer.prototype.broadcast = function(message) {
  // TODO: Complete this function
};

// This function is called whenever a new client connection is made.
ChatServer.prototype.onConnection = function(socket) {
  // TODO: Increment IDs

  // TODO: Log which client connected and send OK to client

  // TODO: Use broadcast function to send a join JSON message

  // TODO: Broadcast msg message when "data" event comes from client

  // TODO: Handle client closing when "close" event comes from client

  // TODO: Add client to clients map
};

// Attach listeners for "connection" and "error" events.
ChatServer.prototype.attachListeners = function() {
  // TODO: Handle connection and error events
};

var server = new ChatServer(4242);
