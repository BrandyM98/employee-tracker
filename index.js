const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { viewEmployees, viewRoles } = require('./db');
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
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role',
                // 'View employees by manager',
                // 'View employees by department',
                // 'Update employee managers',
                // 'Delete a department',
                // 'Delete a role',
                // 'Delete an employee',
                // 'Exit',
            ],
        }
    ]).then((response) => {
        //what is chosen will send to another function
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
            // case 'Update employee managers':
            //     updateEmployeeManagers()
            //     break;
            // case 'View employees by manager':
            //     viewEmployeesByManager()
            //     break;
            // case 'View employees by department':
            //     viewEmployeesByDepartment()
            //     break;
            // case 'Delete a department':
            //     deleteADepartment()
            //     break;
            // case 'Delete a role':
            //     deleteARole()
            //     break;
            // case 'Delete an employee':
            //     deleteAnEmployee()
            //     break;
            case 'Exit':
                connection.end()
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
        var departmentName = response.newDepartment
        // console.log(department, "add Department")
        db.addDepartment(departmentName)
        .then(([department]) => {
            // console.log(department, "add Department")
                // console.table(department)
                console.log(`Added ${departmentName} to the database`)
                init()
            })
    })
}

// Add a role function & prompt
function addARole() {
    db.viewDepartments().then(([departments]) => {
        departments = departments.map(dept=>({value:dept.id,name:dept.name}))
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
        ]).then(function ({newEmployee,newEmployeeSalary,newEmployeeDepartment}) {
            db.addRole(newEmployee, newEmployeeSalary,newEmployeeDepartment)
                .then(([role]) => {
                     //console.log(`Added ${newEmployee} to the database`)
                    console.log(`Added ${newEmployee, newEmployeeSalary,newEmployeeDepartment } to the database`)
                    init()
                })
        })
    })
}


// Add an employee function & prompt
function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter new employee name.',
            name: 'newEmployee',
        }
    ]).then(function (response) {
        var employeeName = response.newEmployee
        db.addEmployee(response.employeeName)
            .then(([employee]) => {
                console.table(employee)
                init()
            })
    })
}

//update an employee role function
function updateAnEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee has a new role?',
            name: 'employee',
            choices: viewEmployees,
        },
        {
            type: 'list',
            message: 'What is this employees new role?',
            name: 'employeeNewRole',
            choices: viewRoles,
        },

    ]).then(function (response) {}
    )
    }


//exit function


init();






//these are for bonus!

// 'Update employee managers':
// 'View employees by manager':
// 'View employees by department':
// 'Delete a department':
// 'Delete a role':
// 'Delete an employee':
// 'Exit':

