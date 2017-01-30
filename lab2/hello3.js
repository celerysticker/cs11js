// Reads all greetings in greetings.txt, creates a server, and sends greeting 
// (with name, if given) to server
(function() {
    "use strict";
    var fs = require("fs");
    var http = require("http");
    var url = require("url");

    // read greetings.txt asynchronously
    fs.readFile("greetings.txt", function(err, buffer) {
        if (err === null) {
            var greetings = buffer.toString().split('\n');

            // create a server listening on port 8080
            http.createServer(function(req, res) {
                // get random greeting index
                var index = Math.floor(Math.random() * greetings.length);
                
                // parse url 
                var query = url.parse(req.url, true).query;

                res.writeHead(200);
                // if no name, print random greeting
                if (query.name === undefined) {
                    res.end(greetings[index]);
                }
                // else, greet by name
                else {
                    res.end(greetings[index] + ", " + query.name);
                }
            }).listen(8080);
        }
        else {
            console.log("File does not exist: greetings.txt");
        }
    })
})();