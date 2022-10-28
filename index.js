// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
// TODO: Create an array of questions for user input


// connects sequelize 
let connection;
initialize()
async function initialize() {
     connection= await mysql.createConnection({ host: 'localhost', user: 'root', password: "rout", database: 'db_EmployeeInfo' })
}

//starts code and lists prompts to starts functions 
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

//allows us to view all employees and continue
async function viewAllEmployees() {

let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
FROM employee
LEFT JOIN role
    On employee.role_id = role.id
LEFT JOIN department
ON department.id = role.department_id
LEFT JOIN employee manager
    ON manager.id = employee.manager_id`

connection.query(query, function(error, res){
if (error) throw error ;

console.table(res)

start();
})   
}

function addEmployees() {
    console.log("employee adding")

    let query =
        'SELECT role.id, role.title, role.salary FROM role'

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
                    console.log("you did it!\n")
                    start();
                })
        })
}

//Updates employees and shows you the result
function updateEmployeeRole() {
    employeeUpdater();
}
function employeeUpdater() {
    console.log("updates baby updates")

    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,'',manager.last_name) AS manager
FROM employee
JOIN role
    ON employee.role_id = role_id
JOIN department
ON department.id = role.department_id
JOIN employee manager
    ON manager.id = employee.manager_id`

    connection.query(query, function (error, res) {
        if (error) throw (error);

        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${first_name}``${last_name}`
        }));

        console.table(res)
        console.log("updated!\n")

        roleArray(employeeChoices);
    });
}

function roleArray(employeeChoices) {

    let query = `SELECT role.id, role.title, role.salary
FROM role`

    let roleChoice;

    connection.query(query, function (error, res) {
        if (error) throw error;

        roleChoice = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }));

        console.table(res);
        console.log("roleArray!\n")

        promptRoleEmployee(employeeChoices, roleChoice)
    })
}

function promptRoleEmployee(employeeChoices, roleChoice) {

    inquirer
        .prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to set with the role?",
                choices: employeeChoices
            },
            {
                type: "list",
                name: "roleId",
                message: "Which role do you want to update?",
                choices: roleChoice
            },
        ])
        .then(function (information) {

            let query = `UPDATE employee SET role_id = ? WHERE id = ? `

            connection.query(query,
                [
                    information.roleId,
                    information.employeeId
                ],
                function (error, res) {
                    if (error) throw error;

                    console.table(res);
                    console.log("you updated")

                    start();
                })
        })
}

//allows us to view all the roles and continue 
async function viewAllRoles() {
   let query =`SELECT role.id, role.title, role.salary
   FROM role`

let roleChoices;

connection.query(query, function(error, res){
if (error) throw error;

roleChoices = res.map(({id, title, salary}) => ({
value: id, title: `${title}`, salary:`${salary}`
}));

console.table(res);

});
}

// allows us to add role
function addRole() {
    let query =
        `SELECT department.id, department.name, role.salary AS budget
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON department.id = role.department_id
    GROUP BY department.id, department.name`

    connection.query(query, function (error, res) {
        if (error) throw error;

        const Addition = res.map(({ id, name }) => ({
            value: id, name: `${id} ${name}`
        }));

        console.table(res);
        console.log("lol its an array")

        promptAddRole(Addition);
    });
}

function promptAddRole(Addition) {

    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What's the Role title?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What's the Role Salary"
            },
            {
                type: "list",
                name: "departmentId",
                message: "What's the Department?",
                choices: Addition
            },
        ])
        .then(function (ans) {

            let query = `INSERT INTO role set ?`

            connection.query(query, {
                title: ans.title,
                salary: ans.salary,
                department_id: ans.department_id
            },
                function (error, res) {
                    if (error) throw error;


                    console.table(res)
                    console.log("Insert DONE")

                    start();
                })
        })
}

//allows the view of all department 
function viewAllDepartments() {
   
let query = `SELECT department.id, department.name, role.salary AS budget
FROM employee
LEFT JOIN role
    ON employee.role_id = role.id
LEFT JOIN department
ON department.id = role.department_id
GROUP BY department.id, department.name
`

connection.query(query, function (error, res){
if (error) throw error;

const departmentOptions = res.map(data => ({
value: data.id, name: data.name
}));
console.table(res)
console.log("departments bro")

start()
})

}

function addDepartment() {



}