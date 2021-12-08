const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// parsing middleware
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());


//static files
app.use(express.static("public"));

//template engine

app.engine("hbs", exphbs({extname : ".hbs"}));

app.set("view engine", "hbs");


//connection pool

const pool = mysql.createPool({
   connectionLimit : 100,
   host : process.env.DATABASE_HOST,
   user : process.env.DATABASE_USER,
   password: process.env.DATABASE_PASS,
   database: process.env.DATABASE_NAME,
})

//connect to db

pool.getConnection((err, connection) => {
   if (err) {
      throw err;
   }
   console.log("connected", + connection.threadId);
 })

const routes = require("./server/routes/user");
app.use("/", routes);

//navigation




app.listen(PORT, () => {
   console.log(`server listening on port ${PORT}`)});