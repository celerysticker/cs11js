// Asks the user for a name, reads all greetings in greetings.txt, and prints
// a random greeting five times followed by the name
(function() {
    "use strict";
    var fs = require("fs");
    var readline = require("readline");

    // read greetings.txt synchronously
    var buffer = fs.readFileSync("greetings.txt");
    var greetings = buffer.toString().split('\n');

    // create interface for I/O
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // prompt user for name asynchronously
    rl.question("What is your name? ", function(name) {
        // print random greeting five times
        for (var i = 0; i < 5; i++) {
            var index = Math.floor(Math.random() * greetings.length);
            console.log(greetings[index] + ", " + name);
        }
        // and then close I/O interface
        rl.close();
    });
})();