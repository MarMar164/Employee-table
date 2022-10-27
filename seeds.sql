drop database if EXISTS db_EmployeeInfo;

create database db_EmployeeInfo;

use db_EmployeeInfo;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) ,
  salary DECIMAL,
  department_id INT,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE
);
INSERT INTO department (name) VALUES 
('produce')

INSERT INTO role (title, salary, department_id) VALUES 
('james','leb',11,1.000,1)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Mar', 'woods',1,NULL)