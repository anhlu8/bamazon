CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bike", "Sports", 525.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Nike Hat", "Accessories", 29.95, 59);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Liri Echo", "Electronics", 45.00, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Chopsticks", "Kitchen", 10.19, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Earrings", "Accessories", 26.95, 37);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Burt's Bees Mask", "Personal Care", 30.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Women's Coat ", "Fashion", 149.99, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Luggage", "Travel", 120, 29);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Coach Purse", "Handbags", 125.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Aldo Shoes", "Shoes", 145.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Book", "Book", 50, 4);

DELETE FROM products where id = 1;

SELECT * FROM products;