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
    displayProducts();
    prompt();
});

function displayProducts() {
    connection.query("SELECT id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

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
                for (var i = 0; i < results.length - 1; i++) {
                    if (results[i].id == res.id) {
                        chosenItem = results[i];
                        //console.log('chosenItem inside if', chosenItem);
                    }
                }
                //console.log('looping, on: ', i);
                //console.log('res', res);

                console.log('chosenItem', chosenItem)

                if (res.id == chosenItem.id && parseInt(res.quantity) <= chosenItem['stock_quantity']) {
                    // console.log("input ID", res.id)
                    // console.log('results', results)


                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: chosenItem['stock_quantity'] - parseInt(res.quantity)
                    }, {
                        id: res.id
                    }], function (error) {
                        if (error) throw error;
                        displayProducts();
                        prompt();

                    });
                } else {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
            });
    });
}