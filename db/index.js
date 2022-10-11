const { response } = require('express')
const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM department')
    }
    viewRoles() {
        return this.connection.promise().query('SELECT * FROM role')
    }
    viewEmployees() {
        return this.connection.promise().query('SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT (manager.first_name,manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id')
    }
    addDepartment(name) {
        return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', name)
    }
    addRole(title,salary,dept) {
        return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [title,salary,dept])
    }

     addEmployee(first, last, role, manager) {
        return this.connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [first, last, role, manager])
    }
}

module.exports = new DB(connection)

