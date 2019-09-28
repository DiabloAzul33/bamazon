var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    database: "bamazonDB"
});

function viewAll() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data);
        askUser(data);
    })
}

viewAll();

function askUser(productDatum) {

    inquirer.prompt([
        {
            type: "input",
            message: "What item id would you like to purchase?",
            name: "id",
        },
        {
            type: "input",
            message: "How many of the item would you like to purchase?",
            name: "quantity",
        }
    ]).then(function (answers) {
        var chosenProduct;
        for (var i = 0; i < productDatum.length; i++) {
            if (productDatum[i].item_id == answers.id) {
                chosenProduct = productDatum[i]; 
                // console.log(chosenProduct);
            }
        }
        // console.log(productDatum);
        if (answers.quantity <= chosenProduct.stock_quantity) {

        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
            [answers.quantity, answers.id],

        function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
				console.log('ERROR: Please select a valid Item ID.');
                viewAll();
                askUser();
            return "Insufficent quantity! Please choose an available amount";

            } else {
                // var productsData = data[0];
                
              
                    console.log("Your order for " + chosenProduct.product_name + " costing $ " + parseFloat(chosenProduct.price * answers.quantity).toPrecision(5) + " has been placed. Thank you for your business!");
                    console.log("\n=================================================\n");
    
                    connection.end();
            }
        })
    } else {
        console.log("Insufficent quantity! Please choose an available amount");
    }
});
    }