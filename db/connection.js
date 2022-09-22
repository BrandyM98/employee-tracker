//connect to db
const mysql = require('mysql2')

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  connection.connect(function(err){
    if(err) throw err 
  });

  module.exports=connection