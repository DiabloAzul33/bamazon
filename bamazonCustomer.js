var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   user: "root",
   password: "root",
   host: "localhost",
   port: 3306,
   database: "bamazonDB"
});

function viewAll(){
    connection.query("SELECT * FROM products", function(err,data){
        if (err) throw err;
        console.table(data);
    })
 }

 viewAll();
 askUser();

 function askUser(){

     inquirer.prompt([
         {
             message: "What item id would you like to purchase?",
             name: "id"
            },
            {
                message: "How many of the item would you like to purchase?",
                name: "quantity"
            }
        ]).then(function(answers){
            console.log(answers);
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",  
                [ answers.quantity, answers.id ],
             function(err){
                if (err) throw err;
                
                console.log(`Thank you for purchasing!`);
            })
        });
    }