const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { viewEmployees, viewRoles } = require('./db');
require('console.table');
const db = require('./db');

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
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit',
            ],
        }
    ]).then((response) => {
        switch (response.options) {
            case 'View all departments':
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
            case 'Add a role':
                addARole()
                break;
            case 'Add an employee':
                addAnEmployee()
                break;
            case 'Update employee role':
                updateEmployeeRole()
                break;
            case 'Exit':
                process.exit();
        }
    })
}

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
        var departmentName = response.newDepartment
        db.addDepartment(departmentName)
            .then(([department]) => {
                console.log(`Added ${departmentName} to the database`)
                init()
            })
    })
}

// Add a role function & prompt
function addARole() {
    db.viewDepartments().then(([departments]) => {
        departments = departments.map(dept => ({ value: dept.id, name: dept.name }))
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter new role for employee.',
                name: 'newEmployee',
            },
            {
                type: 'input',
                message: 'Please enter the salary amount.',
                name: 'newEmployeeSalary',
            },
            {
                type: 'list',
                message: 'Which department does this employee belong to.',
                name: 'newEmployeeDepartment',
                choices: departments
            }
        ]).then(function ({ newEmployee, newEmployeeSalary, newEmployeeDepartment }) {
            db.addRole(newEmployee, newEmployeeSalary, newEmployeeDepartment)
                .then(([role]) => {
                    console.log(`Added ${newEmployee, newEmployeeSalary, newEmployeeDepartment} to the database`)
                    init()
                })
        })
    })
}


// Add an employee function & prompt
function addAnEmployee() {
    db.viewEmployees().then(([employee]) => {
        employee = employee.map(employ => ({ value: employee.id, name: employee.name }))
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter new employee first name.',
                name: 'newEmployeeFirst',
            },
            {
                type: 'input',
                message: 'Please enter new employee last name.',
                name: 'newEmployeeLast',
            },
            {
                type: 'input',
                message: 'Please enter the new employee\'s role id.',
                name: 'newEmployeeRole',
            },
            {
                type: 'input',
                message: 'Please enter the new employee\'s manager id.',
                name: 'newEmployeeManagerId',
            },
        ]).then(function ({ newEmployeeFirst, newEmployeeLast, newEmployeeRole, newEmployeeManagerId }) {
            db.addEmployee(newEmployeeFirst, newEmployeeLast, newEmployeeRole, newEmployeeManagerId)
                .then(([employee]) => {
                    console.log(`Added ${newEmployeeFirst, newEmployeeLast, newEmployeeRole, newEmployeeManagerId} to the database`)
                    init()
                })
        })
    })
}

//exit function
function end() {
    console.log('Bye!');
    process.end
}

init();