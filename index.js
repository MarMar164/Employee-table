// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2/promise');
// TODO: Create an array of questions for user input

let connection;

initialize()

async function initialize(){
     connection = await mysql.createConnection({host:'localhost', user: 'root', password:"rout", database: 'db_EmployeeInfo'})
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

        if (response.managerChoices === "View All Employees") {
            viewAllEmployees();
        }
        else if (response.managerChoices === "Add Employees") {
            addEmployees()
        }
        else if (response.managerChoices === "Update Employee Role") {
            updateEmployeeRole()
        }
        else if (response.managerChoices === "View All Roles") {
            viewAllRoles()
        }
        else if (response.managerChoices === "Add Role") {
            addRole()
        }
        else if (response.managerChoices === "View All Departments") {
            viewAllDepartments()
        }
        else if (response.managerChoices === "Add Department") {
            addDepartment()
        }
        else {
            Quit()
        }
    })

    // const [rows] = await connection.execute(`SELECT * FROM employees where firstname = ?`,[responseObject.first_name] );
    // console.table(rows);


    async function viewAllEmployees() {
        try {
        const [rows] = await connection.execute(`SELECT * FROM employee`);
   console.table(rows);
        } catch (error) {
            console.log(error)
        }
   
}
function addEmployees() {

}
function updateEmployeeRole() {

}
async function viewAllRoles() {
    try {
        const [rows] = await connection.execute(`SELECT * FROM role`);
   console.table(rows);
        } catch (error) {
            console.log(error)
        }
}
function addRole() {

}
async function viewAllDepartments() {
    try {
        const [rows] = await connection.execute(`SELECT * FROM department`);
   console.table(rows);
        } catch (error) {
            console.log(error)
        }
}
function addDepartment() {

}
function Quit() {

}

        // let readMeTemplate = `# ${response.readMeName}