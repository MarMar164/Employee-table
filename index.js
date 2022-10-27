// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2/promise');
// TODO: Create an array of questions for user input

initialize()

async function initialize(){
    connection = await mysql.createConnection({host:'localhost', user: 'root', database: ''})

}


inquirer
    .prompt([

        {
            type: 'list',
            message: 'What would you like to do',
            name: 'managerChoices',
            choices: ["View All Employees",
                "Add Employees",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"]
        },

    ])

    .then((response) => {
        console.log(response)

        if (response = "View All Employees") {
            viewAllEmployees();
        }
        else if (response = "Add Employees") {
            addEmployees()
        }
        else if (response = "Update Employee Role") {
            updateEmployeeRole()
        }
        else if (response = "View All Roles") {
            viewAllRoles()
        }
        else if (response = "Add Role") {
            addRole()
        }
        else if (response = "View All Departments") {
            viewAllDepartments()
        }
        else if (response = "Add Department") {
            addDepartment()
        }
        else {
            Quit()
        }
    })

    async function viewAllEmployees() {
   const [rows] = await connection.execute(`SELECT * FROM employees`);
   console.table(rows);

// console.table(employee)
}
function addEmployees() {

}
function updateEmployeeRole() {

}
function viewAllRoles() {
// console.table(roles)
}
function addRole() {

}
function viewAllDepartments() {

}
function addDepartment() {

}
function Quit() {

}

        // let readMeTemplate = `# ${response.readMeName}