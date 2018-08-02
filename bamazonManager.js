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

function options() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "menu",
                type: "list",
                message: "Please choose from one of these options",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }])
            .then(function (res) {
                if (res.menu === "View Products for Sale") {
                    viewProducts();
                } else if (res.menu === "View Low Inventory") {
                    viewInventory();
                } else if (res.menu === "Add to Inventory") {
                    addToInventory();
                } else {
                    addNewProduct();
                }
            });
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        options();
    });
}

function viewInventory() {
    connection.query("SELECT * FROM products where ?", {
        stock_quantity: 5
    }, function (err, res) {
        if (err) throw err;
        console.log(res);
        options();
    });
}

function addToInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "id",
                    type: "input",
                    message: "Which item do you want to update (Please enter item ID)?",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the quantity for that item"
                }
            ])
            .then(function (res) {
                var chosenItem;
                for (var i = 0; i < results.length - 1; i++) {
                    if (results[i].id == res.id) {
                        chosenItem = results[i];
                        connection.query("UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: chosenItem['stock_quantity'] + parseInt(res.quantity)
                            },
                            {
                                id: res.id
                            }
                        ], function (error, res) {
                            if (error) throw error;
                            options();
                        });
                    }
                }
            });
    });
}

function addNewProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.
        prompt([{
                    name: "product",
                    type: "input",
                    message: "Please enter the product name."
                },
                {
                    name: "department",
                    type: "input",
                    message: "Please enter the department name."
                },
                {
                    name: "price",
                    type: "input",
                    message: "Please enter the price."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the quantity."
                }
            ])
            .then(function (res) {
                connection.query("INSERT INTO products SET ?", {
                    product_name: res.product,
                    department_name: res.department,
                    price: res.price,
                    stock_quantity: res.quantity
                }, function (err, res) {
                    if (err) throw err;
                    options();
                });
            });
    });
}

options();