// Read employees and bonuses from JSON files, and apply bonuses
// asynchronously using promises

(function () {
    "use strict";
    var functions = require("./functions");
    var Promise = require("bluebird");
    var fs = Promise.promisifyAll(require("fs"));

    var data_emp = fs.readFileAsync("employees.json");
    var data_bonus = fs.readFileAsync("bonuses.json");
    
    Promise.all([data_emp, data_bonus]).spread(
        function(data_emp, data_bonus){
            var employees = JSON.parse(data_emp);
            var bonuses = JSON.parse(data_bonus);
            return functions.getBonusedEmployees(employees, bonuses);
        }).then(function(bonusedEmployees) {
            fs.writeFileAsync("bonusedEmployees.json", JSON.stringify(bonusedEmployees));
            var log = functions.makeLog(bonusedEmployees);
            fs.writeFileAsync("log.txt", log);
        }).then(function() {
            console.log("bonuses were successfully applied!");
        }).catch(function(err) {
            console.log("error occured: " + err);
        });

})();