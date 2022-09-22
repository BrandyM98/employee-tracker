//not using a server because this is all command line not front end
//split query
const connection = require('./connection')

//set up constructor
class DB {
constructor (connection){
    this.connection=connection
}
//methods
viewDepartments () {
    return this.connection.promise().query('SELECT * FROM department')
}
viewRoles () {
    return this.connection.promise().query('SELECT * FROM role')
}
viewEmployees () {
    return this.connection.promise().query('SELECT * FROM employee')
}
addDepartment () {
    return this.connection.promise().query('SELECT * FROM department')
}
}

module.exports = new DB(connection)