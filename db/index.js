//not using a server because this is all command line not front end
//split query
const { response } = require('express')
const connection = require('./connection')

//set up constructor
class DB {
    constructor(connection) {
        this.connection = connection
    }
    //methods
    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM department')
    }
    viewRoles() {
        return this.connection.promise().query('SELECT * FROM role')
    }
    viewEmployees() {
        // return this.connection.promise().query('SELECT * FROM employee')
        //need to bring in department and salary
        return this.connection.promise().query('SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT (manager.first_name,manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id')
    }
    addDepartment(name) {
        // return this.connection.promise().query('INSERT INTO department (name) SET (?)', name)
        return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', name)
        //trying to get input to be added to table and table to show in terminal
        
        // console.log(response.newDepartment + " department was successfully added!");
        // viewAllDepartments();
    }
    addRole(name) {
        return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?), CONCAT (response.newEmployee, response.newEmployeeSalary, response.newEmployeeId')
    }
    addEmployee(name) {
        return this.connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', name)
    }
    //add query for update employee role //use SET
}

module.exports = new DB(connection)

