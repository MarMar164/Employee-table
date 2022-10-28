// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2/promise');
// TODO: Create an array of questions for user input

let connection;

initialize()

async function initialize() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "rout", database: 'db_EmployeeInfo' })
}

start();

function start() {
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
                connection.end();
            }
        })
    
}


// const [rows] = await connection.execute(`SELECT * FROM employees where firstname = ?`,[responseObject.first_name] );
// console.table(rows);


async function viewAllEmployees() {
    try {
        const [rows] = await connection.execute(`SELECT * FROM employee`);
        console.table(rows);
    } catch (error) {
        console.log(error)
    }
    start();
}

function addEmployees() {
    console.log("employee adding")

    let query = 
    "SELECT role.id, role.title, role.salary FROM role "

    connection.query(query, function (error, res) {
        if (error) throw error;

        const roleResults = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`

        }));
        console.table(res)
        promptInsert(roleResults);
    });
}

function promptInsert(roleResults) {

    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleResults
            },
        ])
        .then(function (ans) {
            console.log(ans);

            let query = `INSERT INTO employee SET ?`

            connection.query(query,
                {
                    first_name: ans.first_name,
                    last_name: ans.last_name,
                    role_id: ans.role_id,
                    manager_id: ans.manager_id,
                },
                function (error, res) {
                    if (error) throw error;

                    console.table(res)
                    console.log(res.insertedRows + "you did it!\n")
                    start();
                })
        })
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