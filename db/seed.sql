USE employee_db;

INSERT INTO department (name)
VALUES
('Marketing'),
('Accounting'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Supervisor', 9950.00, 1),
('Data Intern', 8976.00, 2),
('Controller', 7687.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sara', 'Johnson', 1, NULL),
('John', 'Peterson', 2, NULL),
('Lex', 'Arlington', 3, 1);
