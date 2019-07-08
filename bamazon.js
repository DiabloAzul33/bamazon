var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   user: "root",
   password: "root",
   host: "localhost",
   port: 3306,
   database: "bamazonDB"
});
