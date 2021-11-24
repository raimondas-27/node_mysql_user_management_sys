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

   connection.query('SELECT * FROM user WHERE first_name LIKE ?',["%" + searchTerm + "%"], (err, rows) => {
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

//connect to db


