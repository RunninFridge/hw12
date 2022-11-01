//Listing dependencies
const mysql = require('mysql');
const inquirer = required('inquirer');
const ConsoleTable = require('console.table');
const util = require('util');
const chalk = require('chalk'); //Found on google to assist with prompts
const { createConnection } = require('net');

//Creating connection woth properties
let connection = mysql.createConnection({
    host: 'localhost',
    port: 9001,
    user: 'root',
    password: '',
    database:'employee_db',
});
connection.connect(err => {
    if (err) throw err;
    prompt();
});

function prompt() {
    inquirer
    .prompt({
        type: 'list',
        name: 'options',
        message: 'Please select one of the following options',
        choices: [
            'View all Employees',
            'Add Employee',
            'View all Roles',
            'Update Employee Role',
            'Add Role',
            'View All Departmetns',
            'Add Departments'
        ]
    });
    switch (answer.options) {
        case 'View all Employees':
            viewEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'View all Roles':
            viewEmployeeRole();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Add Role':
            addEmployeeRole();
            break;
        case 'View All Departments':
            viewDepartments();
            break;
        case 'Add Departments':
            addDepartments;
            break;
    };
}
