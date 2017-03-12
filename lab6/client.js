var net = require("net");
var readline = require("readline");

function ChatClient(port) {
  this.io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // this.client is a socket connecting the client with the server
  this.client = /* TODO: Connect to the server on its port */;
  this.clientId = null;

  this.attachIOListeners();
  this.attachChatListeners();
};

ChatClient.prototype.attachIOListeners = function() {
  this.io.on("line", /* TODO: Handle user input */);

  this.io.on("SIGINT", function() {
    console.log("Closing client...");

    // TODO: Close client connection and I/O listener
    // Hint: Make sure to set things to null!
  }.bind(this));
};

ChatClient.prototype.attachChatListeners = function() {
  // TODO: Handle JSON data when the client socket emits the "data" event

  this.client.on("end", function() {
    if(this.client) {
      // TODO: Handle a client exiting
      // If the client exists, that means the server closed the connection, so
      // we have to make sure we remove the client!
    }
  }.bind(this));

  this.client.on("error", function(e) {
    // TODO: Handle errors
    // Hint: This happens only when something is wrong with the I/O or the
    // client, so close their connections.
  }.bind(this));
};

var client = new ChatClient(4242);
