DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(256) NOT NULL,
    department_name VARCHAR(256) NOT NULL,
    price FLOAT (12, 2) NOT NULL,
    stock_quantity INT DEFAULT 100 NOT NULL
);

INSERT INTO products (product_name, department_name, price)
VALUES ("JBL TB45 Bluetooth Overear Headphones", "Electronics", 45.35), ("IPhone SE", "Electronics", 145.99), ("Folgers Instant Coffee", "Food & Beverage", 5.95), ("All-in-one Computer Desk w/ Cord Manager", "Furniture", 125.00), ("Nike Hip Pack", "Clothing & Accesories", 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (`Thriller by Michael Jackson LP on 12" Vinyl`, "Music", 75.99, 0), ("Iphone X", "Electronics", 799.99, 20), ("Nissin Instant Ramen", "Food & Beverage", 0.99, 1000), ("Now! That's What I Call Music Volume 69", "Music", 4.99, 1574), ("La-Z Boy Recliner", "Furniture", 349.85, 53);