var mysql = require("mysql");
var inquirer = require("inquirer");
var key = require("./password.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: key.portKey,
    user: key.userKey,
    password: key.passwordKey,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    function displayProducts() {
        connection.query("SELECT id, product_name, price FROM products", function (err, res) {
            if (err) throw err;
            console.log(res);
        });
    }
    displayProducts();
    prompt();
});

function prompt() {
    connection.query("SELECT * FROM products", function (err, results) {

        if (err) throw err;
        inquirer
            .prompt([{
                    name: "id",
                    type: "input",
                    message: "please enter the ID (between 2 and 11) of the product you would like to buy"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "how may units would you like to buy?"
                }
            ])
            .then(function (res) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                  if (results[i].id === res.id) {
                    chosenItem = results[i];
                  }
                }
                if (res.id === results[i].id && parseInt(res.quantity) <= results[i].stock_quantity) {
                    connection.query("UPDATE products WHERE ?", {
                        stock_quantity: stock_quantity - parseInt(res.quantity)
                    }, function (error) {
                        if (error) throw err;
                        displayProducts();
                    });
                } else {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
            });
    });
}