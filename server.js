//Listing dependencies
const mysql = require('mysql');
const inquirer = required('inquirer');
const ConsoleTable = require('console.table');
const util = require('util');
const chalk = require('chalk'); //Found on google to assist with prompts
const { createConnection } = require('net');
const { connect } = require('http2');

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
//Prompts at the begining
function displayPrompts() {
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
            addDepartment();
            break;
    };
}
//Had to get help on views updates and add
//To view all employees/roles/departmentds
const viewEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    displayPrompts();
}
const viewEmployeeRole = () => {
    const query = 'SELECT * FROM title';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    displayPrompts();
}
const viewDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    displayPrompts();
}

//Adding new employee
const addEmployee = () => {
    connection.query('SELECT * FROM title', (err,titles) => {
        if(err) throw err;
        titles = titles.map((title) => {
            return {
                name: title.title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Please enter first name of the new Employee'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Please enter last name of the new Employee'
                },
                {
                    type: 'input',
                    name: 'role',
                    message: 'Please enter the role of the new Employee'
                },
                {
                    type: 'list',
                    name: 'managerID',
                    message: 'Please select the manager ID'
                },
            ])
            .then((data) => {
                connection.query('INSERT INTO employee SET',
                {
                    first_name: data.firstName, 
                    last_name: data.lastName,
                    role_id: data.role, 
                    manager_id: data.managerID
                },
                 (err) => {
                    if (err) throw err;
                });
            displayPrompts();
            });
        });
    };

//Adding new role
const addEmployeeRole = () => {
    connection.query('SELECT * FROM department', (err, departments) => {
        if(err) throw err;
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'Please enter name of the new role',
                },
                {
                    type: 'input',
                    name: 'newSalary',
                    message: 'Please endter salary for the new role',
                },
                {
                    type: 'list',
                    name: 'departmentID',
                    message: 'Please select department of the new role',
                    choices: departments,
                },
            ])
            .then((data) => {
                connection.query('INSERT INTO role SET',
                {
                    title: data.newRole,
                    salary: data.newSalary,
                    department_id: data.departmentID,
                }, function (err){
                    if (err) throw err;
                });
            displayPrompts();
            });
        });
    };

//Adding new department
const addDepartment = () => {
    connection.query('SELECT * FROM department', (err, departments) => {
        if(err) throw err;
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: 'Please enter name of the new Department',
                },
            ])
            .then((data) => {
                connection.query('INSERT INTO department SET',
                {
                    name: data.newDepartment,
                }, function (err){
                    if (err) throw err;
                });
            displayPrompts();
            });
        });
    };

//Updating employee role
const updateEmployeeRole = () => {
    connection.query('SELECT * FROM employee', (err, employees) => {
        if(err) throw err;
        employees = employees.map((employee) => {
            return {
                name: `${employee.first_name}, ${employee.last_name}`,
                value: employee.id,
            };
        });
        connection.query('SELECT * FROM role', (err, roles) => {
            if(err) throw err;
            roles = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                };
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeSelection',
                    message: 'Select an employee to update',
                    choices: employees,
                },
                {
                    type: 'list',
                    name: 'roleSelection',
                    message: 'Select a role to update',
                    choices: roles,
                },
            ]).then((data) => {
                connection.query('UPDATE employee SET ? WHERE ?',
                [
                    {
                    id: data.employeeSelection,
                    },
                    {
                    role_id: data.roleSelection,
                    }
                ], function(err){
                    if(err) throw err;
                });
            displayPrompts();
            });
        });
    });
};