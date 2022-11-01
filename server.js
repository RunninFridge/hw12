//listing dependencies
const mysql = require('mysql');
const inquirer = required('inquirer');
const ConsoleTable = require('console.table');
const util = require('util');

//Creating connetion
const connect = mysql.createConnection({
    host: 'localhost',
    port: 9001,
    user: 'root',
    password: '',
    database:'',
});

