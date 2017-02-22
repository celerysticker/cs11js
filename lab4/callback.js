// Read employees and bonuses from JSON files, and apply bonuses
// asynchronously using callbacks

(function () {
    "use strict";
    var fs = require("fs");
    var functions = require("./functions");

    fs.readFile("employees.json", function(err, data) {
        if (err) {
            console.log("error occured: " + err);
            return;
        }
        var employees = JSON.parse(data);

        fs.readFile("bonuses.json", function(err, data) {
            if (err) {
                console.log("error occured: " + err);
                return;
            }
            var bonuses = JSON.parse(data);
            var bonusedEmployees = functions.getBonusedEmployees(employees, bonuses);

            fs.writeFile("bonusedEmployees.json", 
                JSON.stringify(bonusedEmployees),
                function(err, data) {
                    if (err) {
                        console.log("error occured: " + err);
                        return;
                    }
                    var log = functions.makeLog(bonusedEmployees);
                    fs.writeFile("log.txt", log, function(err, data) {
                        if (err) {
                            console.log("error occured: " + err);
                            return;
                        }
                        console.log("bonuses were successfully applied!");
                    })
                });
        });
    });

})();