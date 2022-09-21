const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
require('console.table');
const db = require('./db');

//inquirer prompt

function init () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'question?',
            name: 'options',
            choices: [

            ],
        }
    ]).then((response) => {
        switch (response.options) {
            case 'View departments':
                viewAllDepartments()
                break;
        }
    })
}

//view all departments function
function viewAllDepartments (){
    db.viewDepartments()
    .then(([departments])=> {
        console.table(departments) 
        init ()
    })
}
