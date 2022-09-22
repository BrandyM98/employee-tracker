const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
require('console.table');
const db = require('./db');

//inquirer prompt

function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to view?',
            name: 'options',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add an employee',
                'Update employee role',
                'Update employee managers',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit',
            ],
        }
    ]).then((response) => {
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
                exit()
                break;
        }
    })
}

//view all departments function
function viewAllDepartments() {
    db.viewDepartments()
        .then(([departments]) => {
            console.table(departments)
            init()
        })
}
