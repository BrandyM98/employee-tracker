//not using a server because this is all command line not front end
//split query
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
        return this.connection.promise().query('SELECT * FROM employee')
    }
    addDepartment (name) {
        return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', name)
    }
    addRole(name) {
        return this.connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?)', name)
    }
    addEmployee(name) {
        return this.connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', name)
    }
}

module.exports = new DB(connection)