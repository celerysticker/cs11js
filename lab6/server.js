var net = require("net");

function ChatServer(port) {
  this.port = port;
  this.totalClients = 0;
  this.clients = {};
  this.server = net.createServer();

  this.attachListeners();

  this.server.listen(port, function() {
    console.log("Server listening on port " + String(port));
  }.bind(this));

}

// Broadcast the same message to each connected client.
ChatServer.prototype.broadcast = function(data) {
  for (var key in this.clients) {
    this.clients[key].write(JSON.stringify(data) + "\n");
  }
};

// This function is called whenever a new client connection is made.
ChatServer.prototype.onConnection = function(socket) {
  // Increment IDs
  this.totalClients++;
  var id = this.totalClients;

  // Log which client connected and send OK to client
  console.log("Client #" + String(id) + " connected!");
  var welcome = {
    "type": "OK",
    "id": id
  };
  socket.write(JSON.stringify(welcome) + "\n");

  // Use broadcast function to send a join JSON message
  var announce = {
    "type": "JOIN",
    "clientId": id
  };
  this.broadcast(announce);

  // Broadcast msg message when "data" event comes from client
  socket.on("data", function(msg) {
    console.log("RECV(" + id + "): " + msg);
    var data = {
      "type": "MSG",
      "clientId": id,
      "message": msg.toString()
    };
    this.broadcast(data);
  }.bind(this));

  // Handle client closing when "close" event comes from client
  socket.on("close", function(is_error) {
    delete this.clients[id];
    console.log("Client #" + id + " closed its connection.");
    var leave = {
      "type": "LEAVE",
      "clientId": id
    };
    this.broadcast(leave);
  }.bind(this));

  // Add client to clients map
  this.clients[id] = socket;

};

// Attach listeners for "connection" and "error" events.
ChatServer.prototype.attachListeners = function() {
  // Handle connection and error events
  this.server.on("connection", this.onConnection.bind(this));
};

var server = new ChatServer(4242);
