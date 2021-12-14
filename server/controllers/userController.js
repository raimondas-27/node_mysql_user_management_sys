const mysql = require("mysql");


const pool = mysql.createPool({
   connectionLimit: 100,
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASS,
   database: process.env.DATABASE_NAME,
})

exports.view = (req, res) => {
   pool.getConnection((err, connection) => {
      if (err) {
         throw err;
      }
      console.log("connected", +connection.threadId);
      connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
         //when done with the connection, release it
         connection.release();
         if (!err) {
            res.render("home", {
               rows
            });
         } else {
            console.log("error with a page", err);
         }
         console.log("the data from user table : \n", rows);
      });
   });
}

//find user by search
exports.find = (req, res) => {
   pool.getConnection((err, connection) => {
      if (err) {
         throw err;
      }
      console.log("connected", +connection.threadId);

      let searchTerm = req.body.search;
      console.log(searchTerm)

      connection.query('SELECT * FROM user WHERE first_name LIKE ? or last_name LIKE  ?', ["%" + searchTerm + "%", "%" + searchTerm + "%"],
          (err, rows) => {
             //when done with the connection, release it
             connection.release();
             if (!err) {
                res.render("home", {
                   rows
                });
             } else {
                console.log("error with a page", err);
             }
             console.log("the data from user table : \n", rows);
          });
   });
}

exports.form = (req, res) => {
   res.render('add-user');
}

//add new user

exports.create = (req, res) => {
   const {first_name, last_name, email, phone, comments} = req.body;
   let searchTerm = req.body.search;

   pool.getConnection((err, connection) => {
      if (err) {
         throw err;
      }
      console.log("connected", +connection.threadId);
      connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
         if (!err) {
            res.render('add-user', {alert: 'User added successfully.'});
         } else {
            console.log(err);
         }
         console.log('The data from user table: \n', rows);
      });
   });
}

//edit user
exports.edit = (req, res) => {
      pool.getConnection((err, connection) => {
      if (err) {
         throw err;
      }
      console.log("connected", +connection.threadId);
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
         //when done with the connection, release it
         connection.release();
         if (!err) {
            res.render("edit-user", {rows});
         } else {
            console.log("error with a page", err);
         }
         console.log("the data from user table : \n", rows);
      });
   });
}

//update user
exports.update = (req, res) => {
   const {first_name, last_name, email, phone, comments} = req.body;

      pool.getConnection((err, connection) => {
      if (err) {
         throw err;
      }
      console.log("connected", +connection.threadId);
      connection.query('update user set first_name = ?, last_name = ? where id = ?', [first_name, last_name, req.params.id], (err, rows) => {
         //when done with the connection, release it
         connection.release();
         if (!err) {
            res.render("edit-user", {rows});
         } else {
            console.log("error with a page", err);
         }
         console.log("the data from user table : \n", rows);
      });
   });
}




//connect to db


