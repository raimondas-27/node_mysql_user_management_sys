const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

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

//navigation

app.get("", (req, res) => {
   res.render("home");
})


app.listen(PORT, () => {
   console.log(`server listening on port ${PORT}`)});