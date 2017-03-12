var net = require("net");
var readline = require("readline");

function ChatClient(port) {
  this.io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // this.client is a socket connecting the client with the server
  this.client = net.connect(4242); /* Connect to the server on its port */
  this.clientId = null;

  this.attachIOListeners();
  this.attachChatListeners();
}

ChatClient.prototype.attachIOListeners = function() {
  this.io.on("line", function(line) {
    this.client.write(line);
  }.bind(this));

  this.io.on("SIGINT", function() {
    console.log("Closing client...");

    // Close client connection and I/O listener
    this.io.close();
    this.client.end();
  }.bind(this));
};

ChatClient.prototype.attachChatListeners = function() {
  // TODO: Handle JSON data when the client socket emits the "data" event
  this.client.on("data", function(msg) {
    var msgs = msg.toString().split("\n");
    for (var m in msgs) {
      if (msgs[m].length > 0) {
        var data = JSON.parse(msgs[m]);
        if (data.type === "OK") {
          this.clientId = data.id;
        }

        if (data.type === "JOIN") {
          console.log("Client #" + data.clientId + " has joined.");
        }

        if (data.type === "MSG") {
          if (parseInt(data.clientId) === parseInt(this.clientId)) {
            console.log("ME: " + data.message);
          }
          else {
            console.log("CLIENT #" + data.clientId + ": " + data.message);
          }
        }

        if (data.type === "LEAVE") {
          console.log("Client #" + data.clientId + " has left.");
        }
      }
    }
  }.bind(this));

  this.client.on("end", function() {
    if(this.client) {
      // Handle a client exiting
      // If the client exists, that means the server closed the connection, so
      // we have to make sure we remove the client!
      console.log("Server closed connection.");
      this.io.close();
      this.client.end();
    }
  }.bind(this));

  this.client.on("error", function(e) {
    // Handle errors
    // Hint: This happens only when something is wrong with the I/O or the
    // client, so close their connections.
    console.log("Error: " + e);
    this.io.close();
    this.client.end();
  }.bind(this));
};

var client = new ChatClient(4242);
