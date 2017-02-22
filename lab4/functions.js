// Utility functions

// Give a bonus to all employees and return list of recipients
var getBonusedEmployees = function(employees, bonuses) {
    var bonusedEmployees = [];
    for (var key in employees) {
        if (employees.hasOwnProperty(key)) {
            var emp = employees[key];
            if (bonuses[emp.id] === true) {
                emp.salary += 1000 * emp.yearsWorking;
                bonusedEmployees.push(emp);
            }
        }
    }
    return bonusedEmployees;

};

// Generate log information for bonused employees
var makeLog = function(bonusedEmployees) {
    var log = ""
    for (var key in bonusedEmployees) {
        if (bonusedEmployees.hasOwnProperty(key)) {
            var emp = bonusedEmployees[key];
            log += emp.name.first + " " + emp.name.last;
            log += "\t\t" + emp.salary;
            log += "\n";
        }
    }

    return log;
};

module.exports = {
    getBonusedEmployees: getBonusedEmployees,
    makeLog: makeLog
}
