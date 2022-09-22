const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
require('console.table');
const db = require('./db');

//inquirer prompt

function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to view, add, update, or delete?',
            name: 'options',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                'Add a department',
                'Add an employee',
                'Update employee managers',
                'Update employee role',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit',
            ],
        }
    ]).then((response) => {
        //what is chosen will send to another function
        switch (response.options) {
            case 'View departments':
                viewAllDepartments()
                break;
            case 'View all roles':
                viewAllRoles()
                break;
            case 'View all employees':
                viewAllEmployees()
                break;
            case 'Add a department':
                addADepartment()
                break;
            case 'Add an employee':
                addAnEmployee()
                break;
            case 'Update employee role':
                updateEmployeeRole()
                break;
            case 'Update employee managers':
                updateEmployeeManagers()
                break;
            case 'View employees by manager':
                viewEmployeesByManager()
                break;
            case 'View employees by department':
                viewEmployeesByDepartment()
                break;
            case 'Delete a department':
                deleteADepartment()
                break;
            case 'Delete a role':
                deleteARole()
                break;
            case 'Delete an employee':
                deleteAnEmployee()
                break;
            case 'Exit':
                connetion.end()
                break;
        }
    })
}

//where I will pull from my queries  

//view all departments function
function viewAllDepartments() {
    db.viewDepartments()
        .then(([departments]) => {
            console.table(departments)
            init()
        })
}

//view all roles function
function viewAllRoles() {
    db.viewRoles()
        .then(([roles]) => {
            console.table(roles)
            init()
        })
}

//view all employees function
function viewAllEmployees() {
    db.viewEmployees()
        .then(([employee]) => {
            console.table(employee)
            init()
        })
}

// Add a department function & prompt
function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter new department name.',
            name: 'newDepartment',
        }
    ]).then(function (response) {
        db.addDepartment(response.newDepartment)
            .then(([department]) => {
                console.table(department)
                init()
            })
    })
}





// 'Add an employee':
// 'Update employee role':
// 'Update employee managers':
// 'View employees by manager':
// 'View employees by department':
// 'Delete a department':
// 'Delete a role':
// 'Delete an employee':
// 'Exit':

